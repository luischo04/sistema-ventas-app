import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { environment } from '@env/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.checkToken();
  }

  logIn(authData: User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.URL_API}/auth`, authData).pipe(
      map((user : UserResponse) => {
        this.saveToken(user.token);
        return user;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  private checkToken(): void {
    const userToken = localStorage.getItem("token")?.toString();
    const isExpired = helper.isTokenExpired(userToken);
    if(isExpired){
      this.logout();
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = "Ocurrio un error";

    if(err){
      errorMessage = `Error: ${err.message}`;
      this._snackBar.open(errorMessage, '', {
        duration: 6000
      });
    }
    return throwError(errorMessage);
  }
}
