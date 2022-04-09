import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @Output() callComponent = new EventEmitter<string>();
  
  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  response: any[] = [];
  request: any = {};
  form: FormData = new FormData();
  fileName: string = '';
  dataSource = new MatTableDataSource<any>();
  cols = [ 'DocumentType', 'DocumentPath', 'Comments' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
  });
    this.client.getRequest('Student/Document', { studentId: this.request.studentId }).subscribe(response => {
      this.response = response.responseObj.documentObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator
    });
  }

  register(form: NgForm): void {
    this.client.postFormRequest('Student/Document', this.form, this.request, this.request.documentId).subscribe(response => {
      this.response = response.responseObj.documentObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator,
      this.request.documentId = 0;
      form.resetForm();
      this.alert.openSnackBar('Record saved successfully')
    });
  }

  onFileSelected(event: any){
    this.fileName = event.srcElement.files[0].name;
    this.form.append('file', event.srcElement.files[0]);
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.documentId == id);
  }

  goBack(): void {
    this.callComponent.emit('admission');
  }

  goNext(): void {
    this.callComponent.emit('address');
  }

}
