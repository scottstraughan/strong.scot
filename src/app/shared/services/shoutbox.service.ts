import { Injectable, signal } from '@angular/core';

export interface ShoutboxEntry {
  username: string;
  message: string;
  timestamp: string;
  page: string;
}

@Injectable({ providedIn: 'root' })
export class ShoutboxService {
  /**
   * Feature flag; set to false to hide the shoutbox entirely.
   */
  static readonly ENABLED = false;

  /**
   * Whether the shoutbox panel is visible.
   */
  readonly visible = signal(false);

  /**
   * In-memory entries, newest first.
   */
  readonly entries = signal<ShoutboxEntry[]>([
    {
      username: 'Alex',
      message: 'Love the new site design, really clean!',
      timestamp: '2026-06-28T14:12:00Z',
      page: '/',
    },
    {
      username: 'Sam',
      message: 'Found you through your GitHub, great work on the rants section.',
      timestamp: '2026-06-25T09:45:00Z',
      page: '/rants',
    },
    {
      username: 'Jordan',
      message: 'Just saying hi 👋',
      timestamp: '2026-06-20T18:30:00Z',
      page: '/projects',
    },
  ]);

  show(): void {
    document.body.style.overflow = 'hidden';
    this.visible.set(true);
  }

  hide(): void {
    document.body.style.overflow = '';
    this.visible.set(false);
  }

  addEntry(username: string, message: string, page: string): void {
    this.entries.update((entries) => [
      { username, message, page, timestamp: new Date().toISOString() },
      ...entries,
    ]);
  }
}
