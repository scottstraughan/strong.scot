import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { GramComponent } from './gram/gram.component';
import { GramService } from './shared/services/gram.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'scott-root',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    GramComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * Title of component
   */
  static readonly TITLE = 'strong.scot';

  /**
   * If we should show a float menu.
   */
  floating: boolean = false;

  /**
   * Whether the gram modal is visible.
   */
  protected readonly router = inject(Router);

  protected readonly showGramModal: Signal<boolean>;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  protected readonly isHomeActive = computed(() => {
    const url = this.currentUrl() ?? '/';
    return url === '/' || url.startsWith('/rants');
  });

  constructor(
    private gramService: GramService
  ) {
    this.showGramModal = toSignal(this.gramService.visible$, {
      initialValue: false,
    });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((event) => {
        const nav = event as NavigationStart;
        if (nav.url.startsWith('/gram')) {
          this.gramService.show();
        }
      });
  }

  @ViewChild('mobileMenuInput')
  protected mobileMenuInput: ElementRef | undefined;

  /**
   * Called when user scrolls.
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    this.floating = window.scrollY >= 100;
  }

  onMenuItemClicked() {
    if (!this.mobileMenuInput) {
      return;
    }

    this.mobileMenuInput.nativeElement.click();
  }

  async onGramClicked() {
    await this.gramService.show();
  }
}
