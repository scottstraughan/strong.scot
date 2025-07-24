import { Component, Inject, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Rant, RantService } from '../../shared/services/rants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppComponent } from '../../app.component';
import { Meta, Title } from '@angular/platform-browser';
import { RantsComponent } from '../rants.component';
import { HighlightJS } from 'ngx-highlightjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'scott-view-rant',
  imports: [],
  templateUrl: './view-rant.component.html',
  standalone: true,
  styleUrl: './view-rant.component.scss'
})
export class ViewRantComponent implements OnInit {
  /**
   * The rant.
   */
  readonly rant: Signal<Rant | undefined> = signal(undefined);

  readonly revealThumbnail: WritableSignal<boolean> = signal(false);

  private hljs = inject(HighlightJS);

  /**
   * Constructor.
   */
  constructor(
    private rantService: RantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.rant = toSignal(this.activatedRoute.params
        .pipe(
          switchMap(params =>
            this.rantService.getRantByTag(params['tag'])),
          tap(rant =>
            title.setTitle(`${rant.title} - ${RantsComponent.TITLE} - ${AppComponent.TITLE}`)),
          tap(rant =>
            meta.addTag({ 'description': rant.description })),
          tap(rant =>
            this.createOgMeta(rant)),
          catchError(error => {
            this.router.navigate(['./'], { replaceUrl: true })
              .then();

            return of(error);
          })
        ),
      { initialValue: undefined });
  }

  /**
   * Create some OG meta.
   */
  createOgMeta(
    rant: Rant
  ) {
    this.meta.addTag({ 'og:title': rant.title });
    this.meta.addTag({ 'og:type': 'blog' });
    this.meta.addTag({ 'og:url': this.document.location.href });
    this.meta.addTag({ 'og:image': rant.thumbnail });
  }

  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    this.hljs.highlightAll().then();
  }

  onToggleThumbnail() {
    this.revealThumbnail.set(!this.revealThumbnail());
  }
}
