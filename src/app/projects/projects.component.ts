import { Component, Signal, signal } from '@angular/core';
import { ImageCollectionComponent } from '../shared/ui-components/image-collection/image-collection.component';
import { Project, ProjectsService } from '../shared/services/projects.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppComponent } from '../app.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'scott-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [
    ImageCollectionComponent
  ],
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  /**
   * Title of component
   */
  static readonly TITLE = 'Projects';

  /**
   * A list of all the projects.
   */
  readonly projects: Signal<Project[]> = signal([]);

  /**
   * Constructor.
   */
  constructor(
    private projectService: ProjectsService,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle(`${ProjectsComponent.TITLE} - ${AppComponent.TITLE}`);
    meta.addTag({ 'description': 'View all my personal projects including Saorsail, scoredash.xyz and more!' });

    this.projects = toSignal(projectService.getProjects(), { initialValue: [] });
  }

  /**
   * Get the initial project image.
   */
  getInitialGraphicForProject(
    project: Project,
  ) {
    return this.projectService.getBestInitialGraphicForProject(project);
  }
}
