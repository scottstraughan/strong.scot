import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JsonFeedService } from './json-feed.service';

@Injectable({
  providedIn: 'root',
})
export class RantService extends JsonFeedService {
  static BASE_FEED_PATH = '/rants/';

  constructor() {
    super(RantService.BASE_FEED_PATH);
  }

  static normalizeAssetUrl(value: string | undefined): string | undefined {
    if (!value) {
      return undefined;
    }

    if (
      value.startsWith('http') ||
      value.startsWith('//') ||
      value.startsWith('/')
    ) {
      return value;
    }

    return '/' + value;
  }

  getRants(): Observable<Rant[]> {
    return this.all(10000, 0);
  }

  getRantByTag(tag: string): Observable<Rant> {
    return this.getRants().pipe(
      map((rants) => {
        for (const project of rants) {
          if (project.tag == tag) {
            return project;
          }
        }

        throw new Error(`No project with tag "${tag}" was found.`);
      }),
    );
  }

  all(limit: number, offset: number): Observable<Rant[]> {
    return super._all<Rant>(limit, offset).pipe(map((f) => f.items));
  }

  convertFeedItem<T>(feedItem: any): T {
    const tag = feedItem['_tag'] ?? feedItem['tag'] ?? feedItem['id'];

    return <T>{
      id: feedItem['id'],
      tag,
      title: feedItem['title'],
      description: feedItem['_description'],
      url: feedItem['external_url'],
      thumbnail: RantService.normalizeAssetUrl(feedItem['_thumbnail']),
      icon: RantService.normalizeAssetUrl(feedItem['_icon']),
      body: feedItem['_content'] ?? undefined,
      date: new Date(feedItem['_date']),
    };
  }
}

export interface Rant {
  id: string;
  tag: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  icon: string;
  body: string;
  date: Date;
}
