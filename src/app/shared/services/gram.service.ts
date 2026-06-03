import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export interface GramAttachment {
  type: string;
  url: string;
  description?: string;
}

export interface GramPost {
  date: string;
  title: string;
  content: string;
  attachments: GramAttachment[];
}

export interface GramData {
  posts: GramPost[];
}

export type MediaMode = 'all' | 'video' | 'image';

@Injectable({ providedIn: 'root' })
export class GramService {
  readonly visible$ = new Subject<boolean>();
  private closeResolve: (() => void) | null = null;

  constructor(private httpClient: HttpClient) {}

  getPosts(mode: MediaMode): Observable<GramPost[]> {
    return this.httpClient.get<GramData>('/images/gram/gram.json').pipe(
      map((data) => data.posts),
      map((posts) =>
        posts
          .map((post) => ({
            ...post,
            attachments:
              mode === 'all'
                ? post.attachments
                : post.attachments.filter((a) => a.type === mode),
          }))
          .filter((post) => post.attachments.length > 0),
      ),
    );
  }

  show(): Promise<void> {
    document.body.style.overflow = 'hidden';
    this.visible$.next(true);
    return new Promise((resolve) => {
      this.closeResolve = resolve;
    });
  }

  hide() {
    document.body.style.overflow = '';
    this.visible$.next(false);
    this.closeResolve?.();
    this.closeResolve = null;
  }
}
