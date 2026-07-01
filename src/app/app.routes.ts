import { Routes } from '@angular/router';
import { RantsComponent } from './rants/rants.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { MeComponent } from './me/me.component';
import { ViewRantComponent } from './rants/view-rant/view-rant.component';
import { MemesComponent } from './me/memes/memes.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RantsComponent,
  },
  {
    path: 'gram',
    pathMatch: 'full',
    component: RantsComponent,
  },
  {
    path: 'me',
    component: MeComponent,
  },
  {
    path: 'me/memes',
    component: MemesComponent,
  },
  {
    path: 'about',
    component: MeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'rants/:tag',
    component: ViewRantComponent,
  },
  {
    path: 'rants',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: 'rants',
  },
];
