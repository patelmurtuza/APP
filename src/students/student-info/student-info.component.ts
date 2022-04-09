import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute) { }

  component: string = '';
  studentId: number = 0;

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.studentId = +params.get('id')!;
    });
    this.component = 'student-family';
  }

  getComponent(event: string) {
    this.component = event;
  }

}
