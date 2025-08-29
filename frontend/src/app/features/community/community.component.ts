import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  images: string[];
  location?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  selectedFilter = 'all';
  newPostContent = '';
  isLoading = false;
  showNewPostModal = false;

  filters = [
    { value: 'all', label: 'All Posts', icon: '📋' },
    { value: 'photos', label: 'Photos', icon: '📸' },
    { value: 'tips', label: 'Travel Tips', icon: '💡' },
    { value: 'questions', label: 'Questions', icon: '❓' },
    { value: 'reviews', label: 'Reviews', icon: '⭐' }
  ];

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.posts = [
        {
          id: '1',
          author: {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: '/assets/avatars/sarah.jpg',
            verified: true
          },
          content: 'Just returned from an amazing week in Bali! The rice terraces in Ubud are absolutely breathtaking. Here are some tips for anyone planning to visit: 1) Visit early morning for the best light, 2) Hire a local guide, 3) Bring comfortable walking shoes. The culture and people are incredible! 🌾✨',
          images: ['/assets/posts/bali-1.jpg', '/assets/posts/bali-2.jpg'],
          location: 'Ubud, Bali',
          timestamp: new Date('2024-01-15T10:30:00'),
          likes: 142,
          comments: 23,
          shares: 8,
          isLiked: false,
          isSaved: false,
          tags: ['bali', 'ubud', 'rice-terraces', 'tips']
        },
        {
          id: '2',
          author: {
            id: 'user2',
            name: 'Mike Chen',
            avatar: '/assets/avatars/mike.jpg',
            verified: false
          },
          content: 'Question for fellow travelers: What\'s the best way to get from Tokyo to Kyoto? I\'ve heard about the JR Pass but wondering if it\'s worth it for just this route. Any recommendations? 🚅',
          images: [],
          location: 'Tokyo, Japan',
          timestamp: new Date('2024-01-14T15:45:00'),
          likes: 28,
          comments: 15,
          shares: 3,
          isLiked: true,
          isSaved: false,
          tags: ['japan', 'tokyo', 'kyoto', 'transportation', 'question']
        },
        {
          id: '3',
          author: {
            id: 'user3',
            name: 'Emma Rodriguez',
            avatar: '/assets/avatars/emma.jpg',
            verified: true
          },
          content: 'Santorini sunset from Oia - no filter needed! This place truly lives up to the hype. Pro tip: book your dinner reservation early, the restaurants with sunset views fill up fast! 🌅',
          images: ['/assets/posts/santorini-sunset.jpg'],
          location: 'Oia, Santorini',
          timestamp: new Date('2024-01-13T20:15:00'),
          likes: 89,
          comments: 12,
          shares: 5,
          isLiked: false,
          isSaved: true,
          tags: ['santorini', 'sunset', 'greece', 'photography']
        }
      ];
      
      this.filteredPosts = [...this.posts];
      this.isLoading = false;
    }, 1000);
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(post => {
        switch (this.selectedFilter) {
          case 'photos':
            return post.images.length > 0;
          case 'tips':
            return post.tags.includes('tips') || post.content.toLowerCase().includes('tip');
          case 'questions':
            return post.tags.includes('question') || post.content.includes('?');
          case 'reviews':
            return post.tags.includes('review') || post.content.toLowerCase().includes('review');
          default:
            return true;
        }
      });
    }
  }

  toggleLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  toggleSave(post: Post): void {
    post.isSaved = !post.isSaved;
  }

  sharePost(post: Post): void {
    // Implement share functionality
    console.log('Sharing post:', post.id);
    post.shares += 1;
  }

  openComments(post: Post): void {
    // Navigate to post detail with comments
    console.log('Opening comments for post:', post.id);
  }

  openNewPostModal(): void {
    this.showNewPostModal = true;
  }

  closeNewPostModal(): void {
    this.showNewPostModal = false;
    this.newPostContent = '';
  }

  submitNewPost(): void {
    if (this.newPostContent.trim()) {
      // Implement post creation
      console.log('Creating new post:', this.newPostContent);
      this.closeNewPostModal();
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  }
}
