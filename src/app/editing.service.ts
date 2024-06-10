import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditingService {
  private editingSource = new BehaviorSubject<boolean>(false);
  editing$ = this.editingSource.asObservable();
  constructor() { }
  toggleEditing(editing: boolean): void {
    this.editingSource.next(editing);
  }
}
