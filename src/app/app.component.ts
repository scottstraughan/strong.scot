import { Component, ElementRef, HostListener, Signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { GramComponent } from './gram/gram.component';
import { GramService } from './shared/services/gram.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  styleUrl: './app.component.scss'
})
export class AppComponent  {
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
  protected readonly showGramModal: Signal<boolean>;

  constructor(
    protected router: Router,
    private gramService: GramService,
  ) {
    this.showGramModal = toSignal(this.gramService.visible$, { initialValue: false });
  }

  @ViewChild('mobileMenuInput')
  protected mobileMenuInput: ElementRef | undefined;

  /**
   * Called when user scrolls.
   */
  @HostListener("window:scroll")
  onWindowScroll() {
    this.floating = window.scrollY >= 100;
  }

  onMenuItemClicked() {
    if (!this.mobileMenuInput) {
      return
    }

    this.mobileMenuInput.nativeElement.click();
  }

  async onGramClicked() {
    await this.gramService.show();
  }
}