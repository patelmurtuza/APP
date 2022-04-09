import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @Output() callComponent = new EventEmitter<string>();
  
  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  response: any[] = [];
  request: any = {};
  dataSource = new MatTableDataSource<any>();
  cols = [ 'AdmissionNo', 'AdmissionDate', 'GRNo', 'FormNo', 'Comments' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
  });
    this.client.getRequest('Student/Admission', { studentId: this.request.studentId }).subscribe(response => {
      this.response = response.responseObj.admissionObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator
    });
  }

  register(form: NgForm): void {
    this.client.postBodyRequest('Student/Admission', this.request, this.request.admissionId).subscribe(response => {
      this.response = response.responseObj.admissionObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator,
      this.request.admissionId = 0;
      form.resetForm();
      this.alert.openSnackBar('Record saved successfully')
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.admissionId == id);
  }

  goBack(): void {
    this.callComponent.emit('previous-enrollment');
  }

  goNext(): void {
    this.callComponent.emit('document');
  }

}
