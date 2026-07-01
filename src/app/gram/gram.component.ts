import {
  Component,
  computed,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  GramPost,
  GramService,
  MediaMode,
} from '../shared/services/gram.service';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { LoadingAnimationComponent } from "../shared/ui-components/loading-animaton/loading-animation.component";

@Component({
  selector: 'scott-gram',
  imports: [LoadingAnimationComponent],
  templateUrl: './gram.component.html',
  styleUrl: './gram.component.scss',
})
export class GramComponent {
  protected readonly allPosts: WritableSignal<GramPost[]> = signal([]);
  protected readonly displayCount = signal(10);
  protected readonly displayedPosts = computed(() =>
    this.allPosts().slice(0, this.displayCount()),
  );

  @ViewChild('content')
  protected contentEl: ElementRef<HTMLElement> | undefined;

  static readonly TITLE = 'Gram';

  protected readonly mediaMode: WritableSignal<MediaMode> = signal('all');

  constructor(
    private gramService: GramService,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle(`${GramComponent.TITLE} - ${AppComponent.TITLE}`);
    meta.addTag({ description: 'A collection of images.' });

    toObservable(this.mediaMode)
      .pipe(
        switchMap((mode) => this.gramService.getPosts(mode)),
        tap((posts) => {
          this.allPosts.set(posts);
          this.displayCount.set(10);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  @HostListener('click')
  protected onHostClick(): void {
    this.gramService.hide();
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    this.gramService.hide();
  }

  protected onContentScroll(event: Event) {
    const el = event.target as HTMLElement;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
    if (nearBottom && this.displayCount() < this.allPosts().length) {
      this.displayCount.set(
        Math.min(this.displayCount() + 10, this.allPosts().length),
      );
    }
  }

  protected toggleMediaMode(targetMode: MediaMode) {
    if (this.mediaMode() === targetMode) {
      this.mediaMode.set('all');
    } else {
      this.mediaMode.set(targetMode);
    }

    this.contentEl?.nativeElement.scrollTo({ top: 0, behavior: 'instant' });
  }
}
