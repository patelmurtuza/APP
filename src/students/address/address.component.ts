import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @Output() callComponent = new EventEmitter<string>();
  
  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  response: any[] = [];
  request: any = {};
  dataSource = new MatTableDataSource<any>();
  cols = [ 'IsPrimary', 'Street1', 'Street2', 'City', 'State', 'ZipCode' ];

  ngOnInit(): void {
    this.request.isPrimary = true;
    this.request.city = 'Navi Mumbai';
    this.request.state = 'Maharashtra';
    this.request.zipCode = 410208;
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
  });
    this.client.getRequest('Student/Address', { studentId: this.request.studentId }).subscribe(response => {
      this.response = response.responseObj.addressObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator
    });
  }

  register(form: NgForm): void {
    this.client.postBodyRequest('Student/Address', this.request, this.request.addressId).subscribe(response => {
      this.response = response.responseObj.addressObj;
      this.dataSource = new MatTableDataSource(this.response),
      this.dataSource.sort = this.sort,
      this.dataSource.paginator = this.paginator,
      this.request.addressId = 0;
      form.resetForm();
      this.alert.openSnackBar('Record saved successfully')
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.addressId == id);
  }

  goBack(): void {
    this.callComponent.emit('document');
  }

}
