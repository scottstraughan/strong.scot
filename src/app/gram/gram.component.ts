import { Component, HostListener, signal, Signal, WritableSignal } from '@angular/core';
import { GramPost, GramService, MediaMode } from '../shared/services/gram.service';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'scott-gram',
  imports: [],
  templateUrl: './gram.component.html',
  styleUrl: './gram.component.scss'
})
export class GramComponent {
    protected columns: Signal<GramPost[][]> = signal([]);
    protected posts: WritableSignal<GramPost[]> = signal([]);

    static readonly TITLE = 'Gram';

    protected readonly mediaMode: WritableSignal<MediaMode> =  signal('all');

    constructor(
      private gramService: GramService,
      title: Title,
      meta: Meta,
    ) {
      title.setTitle(`${GramComponent.TITLE} - ${AppComponent.TITLE}`)
      meta.addTag({ 'description': 'A collection of images.' });

      this.columns = toSignal(
        toObservable(this.mediaMode).pipe(
          switchMap(mode => this.gramService.getPosts(mode)),
          tap(posts => this.posts.set(posts)),
          map(posts => this.createColumns(posts, 2)),
        ),
        { initialValue: [] },
      );
  }

    @HostListener('click')
    protected onHostClick(): void {
      this.gramService.hide();
    }

    @HostListener('document:keydown.escape')
    protected onEscapeKey(): void {
      this.gramService.hide();
    }

    private createColumns(posts: GramPost[], columnCount: number): GramPost[][] {
      const columns: GramPost[][] = Array.from({ length: columnCount }, () => []);
      posts.forEach((post, index) => columns[index % columnCount].push(post));
      return columns;
    }


    protected toggleMediaMode(targetMode: MediaMode) {
      if (this.mediaMode() == targetMode) {
        this.mediaMode.set('all');
        return
      }

      this.mediaMode.set(targetMode);
    }
}