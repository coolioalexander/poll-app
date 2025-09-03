import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Vote } from '../models/vote';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = `${environment.apiUrl}/votes`;
  private votesSubject$ = new BehaviorSubject<Map<string, number>>(new Map());

  constructor(private httpClient: HttpClient) {}

  streamVotes() {
    console.log('sse... ' + this.url);
    const sseSource = new EventSource(`${this.url}/sse`);

    sseSource.onmessage = (event) => {
      console.log('sse event : ' + event.data);
      const record: Record<string, number> = JSON.parse(event.data);
      const votes = new Map<string, number>(Object.entries(record));
      this.votesSubject$.next(votes);
    };

    sseSource.onerror = (error) => {
      console.error('sse error : ' + error);
    };

    return this.votesSubject$.asObservable().pipe(
      map(votes => this.transformVotes(votes))
    );
  }

  transformVotes(votes: Map<string, number>) {
    const maxVotes = Math.max(...Array.from(votes.values()), 1);
    const options: Vote[] = Array.from(votes.entries()).map(([title, votes]) => {
      let color = '';
      switch (title) {
        case 'React': color = 'var(--cyan-gradient)'; break;
        case 'Angular': color = 'var(--red-gradient)'; break;
        case 'Vue': color = 'var(--teal-gradient)'; break;
        default: color = 'var(--gray-gradient)'; break;
      }

      return {
        title,
        votes,
        percentage: (votes / maxVotes) * 100,
        color
      };
    });
    return options;
  }

  vote(option: string, checked: number) {
    this.httpClient.post(`${this.url}/${option}`, null, { params: { checked: checked } })
      .subscribe();
  }
}
