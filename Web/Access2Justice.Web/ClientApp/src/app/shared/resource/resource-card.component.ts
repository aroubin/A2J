import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../../topics-resources/shared/topic';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
  @Input() data: Topic;
  @Input() type: string;

  subtopicDetails: Topic;
  constructor() { }

  ngOnInit() {
    this.subtopicDetails = this.data;
  }

}
