import { Routes } from '@angular/router';
import { RantsComponent } from './rants/rants.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ViewRantComponent } from './rants/view-rant/view-rant.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rants'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'rants',
    component: RantsComponent
  },
  {
    path: 'rants/:tag',
    component: ViewRantComponent
  },
  {
    path: '**',
    redirectTo: 'rants'
  }
];
