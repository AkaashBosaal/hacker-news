import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HackerNewsService } from '../../services/hacker-news.service';
import { Story } from '../../models/story';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  currentPage = 1;
  pageSize = environment.defaultPageSize;
  totalPages = 5; // This should be set based on the total number of stories available
  searchTerm = '';
  isLoading = false;
  errorMessage = '';

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const observable = this.searchTerm 
      ? this.hackerNewsService.searchStories(this.searchTerm, this.currentPage, this.pageSize)
      : this.hackerNewsService.getNewestStories(this.currentPage, this.pageSize);

    observable.subscribe({
      next: (stories) => {
        this.stories = stories;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load stories. Please try again later.';
        this.isLoading = false;
        console.error('Error loading stories:', err);
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadStories();
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    
    this.currentPage = page;
    this.loadStories();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDomain(url: string): string {
    if (!url) return '';
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return '';
    }
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString();
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
  
    // Adjust start page if we're at the end
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
}