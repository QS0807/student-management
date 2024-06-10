import { Injectable } from '@angular/core';
import {BehaviorSubject ,Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Student} from "./student";

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';
  private refreshNeeded$ = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient) { }

  get refreshNeeded(): Observable<boolean>{
    return this.refreshNeeded$.asObservable();
  }
  notifyRefreshNeeded(){
    this.refreshNeeded$.next(true);
  }
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>( this.baseUrl,student);
  }
  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl);
  }
  deleteStudent(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
  getStudent(id: number): Observable<Student>{
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }
  updateStudent(id: number, student: Student): Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, student);
  }
}
