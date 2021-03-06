import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student-family',
  templateUrl: './student-family.component.html',
  styleUrls: ['./student-family.component.scss']
})
export class StudentFamilyComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @Output() callComponent = new EventEmitter<string>();
  
  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  response: any[] = [];
  request: any = {};
  dataSource = new MatTableDataSource<any>();
  cols = [ 'FullName', 'Relation', 'Qualification', 'Occupation', 'Designation', 'MobileNo', 'EmailAddress', 'MonthlyIncome', 'OfficeAddress' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
       this.request.studentId = params.get('id');
   });
    this.client.getRequest('Student/StudentFamily', { studentId: this.request.studentId }).subscribe(response => {
      this.response = response.responseObj.studentFamilyObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator
    });
  }

  register(form: NgForm): void {
    this.client.postBodyRequest('Student/StudentFamily', this.request, this.request.studentFamilyId).subscribe(response => {
      this.response = response.responseObj.studentFamilyObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator,
      form.resetForm();
      this.request.studentFamilyId = 0;
      this.alert.openSnackBar('Record saved successfully')
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.studentFamilyId == id);
  }

  goNext(): void {
    this.callComponent.emit('previous-enrollment');
  }

}
