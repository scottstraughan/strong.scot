import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'scott-root',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
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
}
