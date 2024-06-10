import { Component, OnInit, OnDestroy } from '@angular/core';
import {Student} from "../student";
import {StudentService} from "../student.service";
import {Subscription, switchMap} from "rxjs";
import {EditingService} from "../editing.service";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  private subscription!: Subscription;
  constructor(private studentService: StudentService,
              private editingService: EditingService) { }

  ngOnInit(): void {
    this.subscription = this.studentService.refreshNeeded
      .pipe(
        switchMap(() => this.studentService.getAllStudents())
      )
      .subscribe({
        next: (data) => {
          this.students = data;
        },
        error: (error) => {
          console.error('Error fetching students', error);
        }
      });
  }
  editStudent(id: number) {
    this.editingService.toggleEditing(true);
  }
  deleteStudent(id: number){
    this.studentService.deleteStudent(id).subscribe({
      next: () =>{
        this.studentService.notifyRefreshNeeded();
        console.log(`student delete successfully!`);
      },
      error: (err)=> {
        console.error(err);
      }
    })
  }
  ngOnDestroy() {

  }
}
