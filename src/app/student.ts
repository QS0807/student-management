export class Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;

  constructor(id: number=0 ,first_name: string = '', last_name: string = '', email: string = '', gender: string = '') {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.gender = gender;
    this.id = id;
  }
}
