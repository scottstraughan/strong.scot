import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { ShoutboxService } from '../../services/shoutbox.service';

type Scope = 'all' | 'page';

@Component({
  selector: 'scott-shoutbox',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './shoutbox.component.html',
  styleUrl: './shoutbox.component.scss',
})
export class ShoutboxComponent {
  protected readonly enabled = ShoutboxService.ENABLED;

  protected readonly shoutboxService = inject(ShoutboxService);
  private readonly router = inject(Router);

  protected readonly scope = signal<Scope>('all');
  protected readonly showForm = signal(false);

  protected readonly shoutboxForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  private readonly currentPage = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  protected readonly filteredEntries = computed(() => {
    const entries = this.shoutboxService.entries();

    if (this.scope() === 'all') {
      return entries;
    }

    const page = this.currentPage() ?? '/';
    return entries.filter((entry) => entry.page === page);
  });

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    this.shoutboxService.hide();
  }

  protected onSubmit(): void {
    if (this.shoutboxForm.invalid) {
      return;
    }

    const { username, message } = this.shoutboxForm.value;
    this.shoutboxService.addEntry(
      username!,
      message!,
      this.currentPage() ?? '/',
    );
    this.shoutboxForm.reset();
    this.showForm.set(false);
  }
}
