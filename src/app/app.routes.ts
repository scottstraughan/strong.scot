import { Routes } from '@angular/router';
import { RantsComponent } from './rants/rants.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ViewRantComponent } from './rants/view-rant/view-rant.component';
import { MemesComponent } from './memes/memes.component';

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
    path: 'rants/:tag',
    component: ViewRantComponent
  },
  {
    path: 'rants',
    pathMatch: 'full',
    component: RantsComponent
  },
  {
    path: 'memes',
    component: MemesComponent
  },
  {
    path: '**',
    redirectTo: 'rants'
  }
];
