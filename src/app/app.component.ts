import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  today = new Date();
  mobileMenuOpen = false;
  isMobileScreen = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  onClickLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  @HostListener('window:resize')
  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isMobileScreen = window.innerWidth < 768;
      if (!this.isMobileScreen) {
        this.mobileMenuOpen = false;
      }
    }
  }
}
