import { Component, OnInit, OnDestroy } from '@angular/core';
import {Student} from "../student";
import {StudentService} from "../student.service";
import {EditingService} from "../editing.service";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit, OnDestroy {
  students: Student[] = [];

  constructor(private studentService: StudentService,
              private editingService: EditingService) { }

  ngOnInit(): void {
    this.studentService.refreshNeeded.subscribe({
      next: needed => {
        if (needed) {
          this.studentService.getAllStudents().subscribe({
            next: students => this.students = students,
            error: error => console.error('Error fetching students', error)
          });
        }
      },
      error: error => console.error('Error in refreshNeeded subscription', error)
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
