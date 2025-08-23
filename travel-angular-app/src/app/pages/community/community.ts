import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  title: string;
  content: string;
  images?: string[];
  location?: string;
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}

interface Group {
  _id: string;
  name: string;
  description: string;
  image?: string;
  memberCount: number;
  isJoined: boolean;
  category: string;
}

@Component({
  selector: 'app-community',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './community.html',
  styleUrl: './community.scss'
})
export class Community implements OnInit {
  activeTab = signal<'posts' | 'groups' | 'trending'>('posts');
  posts = signal<Post[]>([]);
  groups = signal<Group[]>([]);
  isLoading = signal(false);
  showShareModal = signal(false);

  sharePostForm: FormGroup;
  searchQuery = signal('');

  // Mock data for demonstration
  mockPosts: Post[] = [
    {
      _id: '1',
      author: {
        _id: 'user1',
        name: 'Sarah Johnson',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786'
      },
      title: 'Amazing sunset in Santorini!',
      content: 'Just witnessed the most breathtaking sunset from Oia. The colors were absolutely magical! 🌅 Highly recommend visiting during golden hour.',
      images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'],
      location: 'Santorini, Greece',
      tags: ['sunset', 'santorini', 'greece', 'travel'],
      likes: 124,
      comments: 18,
      isLiked: false,
      isBookmarked: false,
      createdAt: '2024-01-15T18:30:00Z'
    },
    {
      _id: '2',
      author: {
        _id: 'user2',
        name: 'Mike Chen',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      title: 'Tokyo food adventure',
      content: 'Spent the day exploring Tokyo\'s food scene. From ramen in Shibuya to sushi in Tsukiji - every bite was incredible! 🍜🍣',
      images: ['https://images.unsplash.com/photo-1551218808-94e220e084d2'],
      location: 'Tokyo, Japan',
      tags: ['food', 'tokyo', 'japan', 'ramen', 'sushi'],
      likes: 89,
      comments: 12,
      isLiked: true,
      isBookmarked: true,
      createdAt: '2024-01-14T12:15:00Z'
    }
  ];

  mockGroups: Group[] = [
    {
      _id: '1',
      name: 'Solo Travelers',
      description: 'A community for solo travelers to share experiences and tips',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      memberCount: 1250,
      isJoined: true,
      category: 'Travel Style'
    },
    {
      _id: '2',
      name: 'Budget Backpackers',
      description: 'Tips and tricks for traveling on a budget',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      memberCount: 890,
      isJoined: false,
      category: 'Budget Travel'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.sharePostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      location: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadGroups();
  }

  setActiveTab(tab: 'posts' | 'groups' | 'trending'): void {
    this.activeTab.set(tab);
  }

  loadPosts(): void {
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.posts.set(this.mockPosts);
      this.isLoading.set(false);
    }, 1000);
  }

  loadGroups(): void {
    // Simulate API call
    setTimeout(() => {
      this.groups.set(this.mockGroups);
    }, 500);
  }

  toggleLike(post: Post): void {
    const posts = this.posts();
    const updatedPosts = posts.map(p => {
      if (p._id === post._id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    });
    this.posts.set(updatedPosts);
  }

  toggleBookmark(post: Post): void {
    const posts = this.posts();
    const updatedPosts = posts.map(p => {
      if (p._id === post._id) {
        return { ...p, isBookmarked: !p.isBookmarked };
      }
      return p;
    });
    this.posts.set(updatedPosts);
  }

  joinGroup(group: Group): void {
    const groups = this.groups();
    const updatedGroups = groups.map(g => {
      if (g._id === group._id) {
        return {
          ...g,
          isJoined: !g.isJoined,
          memberCount: g.isJoined ? g.memberCount - 1 : g.memberCount + 1
        };
      }
      return g;
    });
    this.groups.set(updatedGroups);
  }

  openShareModal(): void {
    if (this.authService.isAuthenticated()) {
      this.showShareModal.set(true);
    } else {
      // TODO: Show login prompt
      console.log('Please sign in to share a post');
    }
  }

  closeShareModal(): void {
    this.showShareModal.set(false);
    this.sharePostForm.reset();
  }

  sharePost(): void {
    if (this.sharePostForm.valid) {
      const formData = this.sharePostForm.value;
      const newPost: Post = {
        _id: Date.now().toString(),
        author: {
          _id: this.authService.user()?._id || '',
          name: this.authService.user()?.name || 'Anonymous',
          profileImage: this.authService.user()?.profileImage
        },
        title: formData.title,
        content: formData.content,
        location: formData.location,
        tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : [],
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false,
        createdAt: new Date().toISOString()
      };

      const currentPosts = this.posts();
      this.posts.set([newPost, ...currentPosts]);
      this.closeShareModal();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
