import { Component } from '@angular/core';
import { GithubWidgetComponent } from '../shared/ui-components/github-widget/github-widget.component';
import { LinkedinWidgetComponent } from '../shared/ui-components/linkedin-widget/linkedin-widget.component';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'scott-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [
    GithubWidgetComponent,
    LinkedinWidgetComponent,
    NgOptimizedImage
  ],
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  /**
   * Some photos to show.
   */
  readonly photos = [
    '/images/about/1.jpg',
    '/images/about/2.jpg',
    '/images/about/3.jpg',
    '/images/about/4.jpg',
    '/images/about/5.jpg',
    '/images/about/6.jpg',
    '/images/about/7.jpg',
    '/images/about/8.jpg',
    '/images/about/9.jpg'
  ];

  /**
   * Title of component
   */
  static readonly TITLE = 'About';

  /**
   * Constructor.
   */
  constructor(
    title: Title,
    meta: Meta
  ) {
    title.setTitle(`${AboutComponent.TITLE} - ${AppComponent.TITLE}`)
    meta.addTag({ 'description': 'Learn about my, who I am, what I am about and download my CV.' });
  }
}
