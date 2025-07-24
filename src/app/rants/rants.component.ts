import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Rant, RantService } from '../shared/services/rants.service';
import { LoadingAnimationComponent } from '../shared/ui-components/loading-animaton/loading-animation.component';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'scott-rants',
  imports: [
    LoadingAnimationComponent,
    NgOptimizedImage
  ],
  templateUrl: './rants.component.html',
  standalone: true,
  styleUrl: './rants.component.scss'
})
export class RantsComponent {
  /**
   * Title of component
   */
  static readonly TITLE = 'Rants';

  /**
   * Rants per page.
   */
  static readonly RANTS_PER_PAGE = 20;

  /**
   * A list of visible the rants.
   */
  readonly visibleRants: Signal<Rant[]> = signal([]);

  /**
   * A list of all the rants.
   */
  readonly allRants: Signal<Rant[]> = signal([]);

  /**
   * Current page.
   */
  readonly page: WritableSignal<number> = signal(1);

  /**
   * Constructor.
   */
  constructor(
    rantService: RantService,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle(`${RantsComponent.TITLE} - ${AppComponent.TITLE}`);
    meta.addTag({ 'description': 'View all my rants (blogs) from over the years.' });

    this.allRants = toSignal(rantService.getRants(), { initialValue: [] });

    this.visibleRants = computed(() =>
      this.allRants().slice(0, RantsComponent.RANTS_PER_PAGE * this.page()));
  }

  onViewMore() {
    this.page.set(this.page() + 1);
  }
}
