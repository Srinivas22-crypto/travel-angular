import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
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

interface Group {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  members: number;
  isJoined: boolean;
}

interface TrendingTopic {
  hashtag: string;
  posts: number;
}

interface CommunityStats {
  activeUsers: string;
  sharedExperiences: string;
  countriesVisited: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  activeTab: 'feed' | 'groups' | 'create' = 'feed';
  posts: Post[] = [];
  groups: Group[] = [];
  trendingTopics: TrendingTopic[] = [];
  communityStats: CommunityStats = {
    activeUsers: '50,000+',
    sharedExperiences: '120,000+',
    countriesVisited: '180+'
  };
  
  // Share story modal
  showShareModal = false;
  newStoryContent = '';
  newStoryLocation = '';
  newStoryTags = '';
  selectedImages: File[] = [];
  
  // Theme
  isDarkMode = false;
  
  isLoading = false;

  ngOnInit(): void {
    this.loadData();
    this.checkTheme();
  }

  checkTheme(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark') || 
                     localStorage.getItem('theme') === 'dark';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  loadData(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.loadPosts();
      this.loadGroups();
      this.loadTrendingTopics();
      this.isLoading = false;
    }, 1000);
  }

  loadPosts(): void {
    this.posts = [
      {
        id: '1',
        author: {
          id: 'user1',
          name: 'Sarah Johnson',
          username: '@sarah',
          avatar: '/assets/avatars/sarah.jpg',
          verified: true
        },
        content: 'Just had the most amazing sunset in Santorini! The blue domes and white buildings create such a magical atmosphere. Already planning my next visit! 🌅',
        images: ['/assets/posts/santorini-1.jpg'],
        location: 'Santorini, Greece',
        timestamp: new Date('2024-01-15T10:30:00'),
        likes: 127,
        comments: 23,
        shares: 8,
        isLiked: false,
        isSaved: false,
        tags: ['santorini', 'sunset', 'greece', 'travel']
      },
      {
        id: '2',
        author: {
          id: 'user2',
          name: 'Mike Chen',
          username: '@mikec',
          avatar: '/assets/avatars/mike.jpg',
          verified: false
        },
        content: 'Tokyo\'s street food scene is absolutely incredible! Spent the whole day exploring Shibuya and trying different foods. The ramen here is on another level 🍜',
        images: [],
        location: 'Tokyo, Japan',
        timestamp: new Date('2024-01-14T15:45:00'),
        likes: 89,
        comments: 15,
        shares: 3,
        isLiked: true,
        isSaved: false,
        tags: ['tokyo', 'japan', 'food', 'ramen']
      }
    ];
  }

  loadGroups(): void {
    this.groups = [
      {
        id: '1',
        name: 'Solo Travelers Unite',
        category: 'Solo Travel',
        description: 'Connect with fellow solo travelers and share experiences',
        image: '/assets/groups/solo-travel.jpg',
        members: 15420,
        isJoined: false
      },
      {
        id: '2',
        name: 'Budget Backpackers',
        category: 'Budget Travel',
        description: 'Tips and tricks for traveling on a budget',
        image: '/assets/groups/budget-travel.jpg',
        members: 8930,
        isJoined: false
      }
    ];
  }

  loadTrendingTopics(): void {
    this.trendingTopics = [
      { hashtag: '#SustainableTravel', posts: 2340 },
      { hashtag: '#HiddenGems', posts: 1890 },
      { hashtag: '#FoodieTravel', posts: 3210 },
      { hashtag: '#AdventureTravel', posts: 2760 },
      { hashtag: '#TravelTips', posts: 4120 }
    ];
  }

  // Tab navigation
  setActiveTab(tab: 'feed' | 'groups' | 'create'): void {
    this.activeTab = tab;
  }

  // Post interactions
  toggleLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  toggleSave(post: Post): void {
    post.isSaved = !post.isSaved;
  }

  sharePost(post: Post): void {
    console.log('Sharing post:', post.id);
    post.shares += 1;
  }

  openComments(post: Post): void {
    console.log('Opening comments for post:', post.id);
  }

  // Group interactions
  toggleJoinGroup(group: Group): void {
    group.isJoined = !group.isJoined;
    group.members += group.isJoined ? 1 : -1;
  }

  // Share story modal
  openShareModal(): void {
    this.showShareModal = true;
  }

  closeShareModal(): void {
    this.showShareModal = false;
    this.newStoryContent = '';
    this.newStoryLocation = '';
    this.newStoryTags = '';
    this.selectedImages = [];
  }

  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImages = Array.from(files);
    }
  }

  submitStory(): void {
    if (this.newStoryContent.trim()) {
      console.log('Creating new story:', {
        content: this.newStoryContent,
        location: this.newStoryLocation,
        tags: this.newStoryTags,
        images: this.selectedImages
      });
      this.closeShareModal();
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
