import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';
import { LoadingAnimationComponent } from '../loading-animaton/loading-animation.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'scott-github-widget',
  templateUrl: './github-widget.component.html',
  standalone: true,
  imports: [
    LoadingAnimationComponent,
    NgOptimizedImage
  ],
  styleUrls: [
    './widget-container.scss',
    './github-widget.component.scss'
  ]
})
export class GithubWidgetComponent implements OnInit {
  /**
   * URL of my GitHub.
   * @private
   */
  private static GITHUB_URL = 'https://api.github.com/users/scottstraughan';

  /**
   * Bio signal.
   */
  readonly bio: WritableSignal<any> = signal(undefined);

  /**
   * Constructor.
   */
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    this.httpClient.get<string>(GithubWidgetComponent.GITHUB_URL)
      .pipe(
        tap(bio => this.bio.set(bio)),
        take(1)
      )
      .subscribe()
  }
}