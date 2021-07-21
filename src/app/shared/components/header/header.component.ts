import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  isAdmin = false;
  isLogged = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authSvc.isLogged.subscribe(res => this.isLogged = res)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();

  }

  onLogout(): void {
    this.authSvc.logout();
  }

}
