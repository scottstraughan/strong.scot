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
  styleUrl: './memes.component.scss',
})
export class MemesComponent {
  readonly memes: MemeImage[] = [
    '6bae6db4135eab170c3083d5b1291e531845f2067d751418782b2956a38b45ba.gif',
    '01ffdba715149d2d9bcfb9565cc855e535ac5cbc901dea59509fc73ea9aa0418.jpg',
    '89aa09e3a84d3152d649554758fee2a94e35c0d179b26fc0544c92cd040f4f88.jpg',
    '4998439309eeed86838b2be652f78e1f114c5f071aeb5aa5cbbd0a1bc17a57ce.jpg',
    '18c24bd5b6f8c9bc5298cd83d87c46a5e461693bf0f2a805bd4845999df6409e.jpg',
    '7dc40a4d9eb079fe5bb059a55ebd994ebf8623a6876f5f1dcb2ca15d7ec146bc.jpg',
    'a2b8a78a57e14238d131e5138f31d5dcb1b2465d86c737bb2091ab60ed437b50.jpg',
    'e203fff12ad8a13a152d13f326a62e8896e09cb80880b82661fd555531b99b9c.jpg',
    '75ce52d81bd95d38fc884324d93ad91c8ef063c48a215a99bcba615df5ae2788.jpg',
    '8cec83b409869c3b0b0e4d88812dd3ff715d477d4914de40efc8a9d1c6d3cd35.jpg',
    'a0b28fec074cda9783a70b5c2f8fe3a1a7df25b3602aef814658116814dfbd9b.jpg',
    '1d86b5dd98b5666127edd268d10c1790b430295dbe45eaf7d230ca642fd1f460.gif',
    '3e2a6ffdfb9e8a1d32e1e685812f06f7192d2ae06f15b12fbc64e9a9b8d016fe.jpg',
    'e5dab325324760309d233ef7bda74ee3332dc30f16140ddc6a61a0051e24a1c2.gif',
    '4c81556ef8ee7075db953cd4fbef4fda31ee2d787ad26d90f951e3e33f2f0828.jpg',
    '1b539d449164fb6e6a4e31478f457684b1fc78ab2676001b003722fda92f54fa.gif',
    'c9644aabf6459811c38c26b795fb232d07d5bf2226622cc49e6b347a5344a812.gif',
    'c7755233e8bacf3541b1beb7b10f06996c7f7ac929a5b9c38b1ea34b14d80384.jpg',
    'd345cc4024dcaca6a4847c27042a1ad6c3c96c65da3a6d92e02d07ff66fe82eb.gif',
    '9ab5c78d032272ea82dc8bc2322c2ad2d798685a42a84d71219d138f98ff3c9f.jpg',
    '51b9d57976150af0daf95cee79de9093e000b77f7105035fba11c0cfe3c43db8.gif',
    'faf15a649990cbfaa1600474ff506d08f4074b6eb704a1033e7534bf2d8aa61a.gif',
    '7f209e41018a7510987aed383193482b0fc5c3e8028abb0ef00b5bfbf788714a.jpg'
  ].map((filename) => ({
    src: `/images/memes/${filename}`,
    alt: filename.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
  }));

  readonly columns: MemeImage[][] = this.createColumns(this.memes, 5);

  private createColumns(
    images: MemeImage[],
    columnCount: number,
  ): MemeImage[][] {
    const columns: MemeImage[][] = Array.from(
      { length: columnCount },
      () => [],
    );
    images.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    return columns;
  }
}
