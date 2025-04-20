import { Routes } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';

export const APP_ROUTES: Routes = [
  { path: '', component: StoryListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];