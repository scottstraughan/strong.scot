import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemesService {
  constructor(private httpClient: HttpClient) {}

  getColumns(columnCount: number = 5): Observable<string[][]> {
    return this.httpClient.get<string[]>('/images/memes/memes.json').pipe(
      map((files) => files.map((meme) => `/images/memes/${meme}`)),
      map((memes) => this.createColumns(memes, columnCount)),
    );
  }

  private createColumns(images: string[], columnCount: number): string[][] {
    const columns: string[][] = Array.from({ length: columnCount }, () => []);
    images.forEach((image, index) => columns[index % columnCount].push(image));
    return columns;
  }
}
