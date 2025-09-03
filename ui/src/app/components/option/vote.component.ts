import { Component, Input } from '@angular/core';
import { Vote } from '../../models/vote';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-option',
  imports: [],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {
  @Input() vote!: Vote;

  constructor(private apiService: ApiService) {}

  onVoteChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked ? 1 : -1;
    this.apiService.vote(this.vote.title, checked);
  }
}
