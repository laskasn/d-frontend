import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  @Input("type") type : string;
  @Input("text") text : string;
  @Input("visible") visible : boolean;

  ngOnInit() {

  }

}
