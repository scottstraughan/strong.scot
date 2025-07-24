import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'scott-linkedin-widget',
  templateUrl: './linkedin-widget.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: [
    './../github-widget/widget-container.scss',
    './linkedin-widget.component.scss'
  ]
})
export class LinkedinWidgetComponent {

}