import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export interface GramAttachment {
  type: string;
  url: string;
}

export interface GramPost {
  date: string;
  title: string;
  content: string;
  attached: GramAttachment;
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
        posts.filter((post) => {
          if (mode === 'all') {
            return true;
          } else if (post.attached.type === mode) {
            return true;
          }

          return false;
        }),
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
