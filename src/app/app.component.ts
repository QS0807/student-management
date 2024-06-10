import { Component } from '@angular/core';
import {EditingService} from "./editing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public editingService: EditingService) {
  }
  title = 'student-management';


}
