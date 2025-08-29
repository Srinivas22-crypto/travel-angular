import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: string;
  type: 'booking' | 'message' | 'update' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div class="notifications-header">
        <h1 class="page-title">Notifications</h1>
        <p class="page-subtitle">Stay updated with your travel activities</p>
      </div>
      
      <div class="notifications-content">
        <div class="notifications-actions">
          <button (click)="markAllAsRead()" class="action-btn">Mark all as read</button>
          <button (click)="clearAll()" class="action-btn secondary">Clear all</button>
        </div>
        
        <div class="notifications-list">
          <div *ngFor="let notification of notifications" 
               class="notification-item" 
               [class.unread]="!notification.isRead"
               (click)="markAsRead(notification)">
            <div class="notification-icon">{{ getTypeIcon(notification.type) }}</div>
            <div class="notification-content">
              <h3 class="notification-title">{{ notification.title }}</h3>
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">{{ getTimeAgo(notification.timestamp) }}</span>
            </div>
          </div>
          
          <div *ngIf="notifications.length === 0" class="empty-state">
            <div class="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    .notifications-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2rem; font-weight: 700; color: #1f2937; }
    .page-subtitle { color: #6b7280; }
    .notifications-actions { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .action-btn { padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; }
    .action-btn:not(.secondary) { background-color: #3b82f6; color: white; }
    .action-btn.secondary { background-color: #f3f4f6; color: #374151; }
    .notification-item { display: flex; gap: 1rem; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer; }
    .notification-item.unread { background-color: #eff6ff; }
    .notification-icon { font-size: 1.5rem; }
    .notification-title { font-weight: 600; margin-bottom: 0.25rem; }
    .notification-message { color: #6b7280; margin-bottom: 0.5rem; }
    .notification-time { font-size: 0.875rem; color: #9ca3af; }
    .empty-state { text-align: center; padding: 3rem; }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
    .dark-theme .page-title { color: #ffffff; }
    .dark-theme .page-subtitle { color: #9ca3af; }
    .dark-theme .notification-item.unread { background-color: #1e3a8a; }
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // Mock data
    this.notifications = [
      {
        id: '1',
        type: 'booking',
        title: 'Flight Booking Confirmed',
        message: 'Your flight to Tokyo has been confirmed for Feb 15, 2024',
        timestamp: new Date('2024-01-10T10:30:00'),
        isRead: false
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Check-in Reminder',
        message: 'Don\'t forget to check in for your flight 24 hours before departure',
        timestamp: new Date('2024-01-09T15:45:00'),
        isRead: true
      }
    ];
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'booking': return '✈️';
      case 'message': return '💬';
      case 'update': return '📢';
      case 'reminder': return '⏰';
      default: return '🔔';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
  }

  clearAll(): void {
    this.notifications = [];
  }
}
