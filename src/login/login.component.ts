import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceClientService } from '../services/serviceclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private client: ServiceClientService, private router: Router) { }

  request: any = {};
  errorMessage: string = '';

  ngOnInit(): void {
  }

  submit() : void {
    this.client.postBodyRequest('Login/Token', this.request).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        sessionStorage.setItem('accessToken', response.responseObj.tokenObj.accessToken),
        sessionStorage.setItem('refreshToken', response.responseObj.tokenObj.refreshToken),
        this.router.navigate(['/student']);
      }
      else {
        this.errorMessage = 'Username or password is invalid';
      }
    });
  }

}
