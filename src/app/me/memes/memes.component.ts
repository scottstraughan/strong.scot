import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { MemesService } from '../../shared/services/memes.service';

@Component({
  selector: 'scott-memes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memes.component.html',
  styleUrl: './memes.component.scss',
})
export class MemesComponent {
  protected readonly columns: Signal<string[][]>;
 
  constructor(private memesService: MemesService) {
    this.columns = toSignal(this.memesService.getColumns(5), { initialValue: [] });
  }
}
