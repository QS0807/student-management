import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from "../student.service";
import {Student} from "../student";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, OnDestroy{
  student: Student = new Student();
  submitted = false;

  constructor(private studentService: StudentService) {
  }
  ngOnInit() {
  }
  saveStudent(): void {
    this.studentService.createStudent(this.student)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.submitted = true;
          this.studentService.notifyRefreshNeeded();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  newStudent(): void {
    this.submitted = false;
    this.student = new Student();  // Reset
  }
  ngOnDestroy() {
  }
}

