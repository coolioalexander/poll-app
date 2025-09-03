import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable, of } from 'rxjs';
import { Vote } from './models/vote';
import { AsyncPipe } from '@angular/common';
import { VoteComponent } from './components/option/vote.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, VoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  votes$: Observable<Vote[] | undefined> = of(undefined);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.votes$ = this.apiService.streamVotes();
  }
}
