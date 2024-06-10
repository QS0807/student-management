import { Component, OnInit } from '@angular/core';
import {Student} from "../student";
import {StudentService} from "../student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditingService} from "../editing.service";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student: Student = new Student();
  id!: number;
  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              private editingService: EditingService) {
    this.editingService.toggleEditing(true);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.id).subscribe({
      next: value => {
        this.student = value;
        console.log(this.student);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  save(): void{
    this.studentService.updateStudent(this.id, this.student).subscribe({
      next: () =>{
        this.router.navigate(['/students']);
        this.studentService.notifyRefreshNeeded();
        this.editingService.toggleEditing(false);
      },
      error: err => {
        console.error(err);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/students']);
    this.editingService.toggleEditing(false);
    this.studentService.notifyRefreshNeeded();
  }
}
