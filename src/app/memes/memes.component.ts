import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MemeImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'scott-memes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memes.component.html',
  styleUrl: './memes.component.scss'
})
export class MemesComponent {
  readonly memes: MemeImage[] = [
    'IMG_1034.jpg',
    'IMG_1038.jpg',
    'IMG_1086.jpg',
    'IMG_1089.jpg',
    'IMG_1093.GIF',
    'IMG_1094.GIF',
    'IMG_1102.jpg',
    'IMG_1110.jpg',
    'IMG_1189.jpg',
    'IMG_1199.jpg',
    'IMG_1208.jpg',
    'IMG_1219.jpg',
    'IMG_1220.GIF',
    'IMG_1221.jpg',
    'IMG_1281.GIF',
    'IMG_1295.jpg',
    'IMG_1297.GIF',
    'IMG_1309.GIF',
    'IMG_1435.jpg',
    'IMG_1441.GIF',
    'IMG_1448.jpg'
  ].map((filename) => ({
    src: `/images/memes/${filename}`,
    alt: filename.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ')
  }));

  readonly columns: MemeImage[][] = this.createColumns(this.memes, 5);

  private createColumns(images: MemeImage[], columnCount: number): MemeImage[][] {
    const columns: MemeImage[][] = Array.from({ length: columnCount }, () => []);
    images.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    return columns;
  }
}
