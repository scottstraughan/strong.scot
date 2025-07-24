import { Component, computed, input, OnInit, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'scott-image-collection',
  templateUrl: './image-collection.component.html',
  standalone: true,
  styleUrl: './image-collection.component.scss'
})
export class ImageCollectionComponent implements OnInit {
  images = input.required<Graphic[]>();
  current: Signal<Graphic | undefined> = signal(undefined);
  index: WritableSignal<number> = signal(0);

  ngOnInit() {
    this.current = computed(() => {
      return this.images()[this.index()]
    });
  }

  onPrevious() {
    if (this.images().length == 0) {
      return ;
    }

    const index = this.index();

    if (index == 0) {
      this.index.set(this.images().length - 1);
    } else {
      this.index.set(index - 1);
    }
  }

  onNext() {
    if (this.images().length == 0) {
      return ;
    }

    const index = this.index();

    if (index >= this.images().length - 1) {
      this.index.set(0);
    } else {
      this.index.set(index + 1);
    }
  }
}

export enum ProjectGraphicType {
  IMAGE,
  VIDEO
}

export interface Graphic {
  url: string
  title: string
  type: ProjectGraphicType
}