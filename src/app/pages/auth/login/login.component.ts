import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    const userData = {
      usuario: 'admin',
      password: 'admin'
    };

    this.authSvc.logIn(userData).subscribe(res => console.log("login"));
  }

}
