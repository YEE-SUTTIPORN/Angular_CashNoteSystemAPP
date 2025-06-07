import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/services/auth.service';
import { firstValueFrom } from 'rxjs';

async function main() {
  const app = await bootstrapApplication(AppComponent, appConfig);
  const authService = app.injector.get(AuthService);

  // รอเช็ก login ให้เสร็จก่อน
  if (typeof window !== 'undefined') {
    await firstValueFrom(authService.authChecked$);
  }
}

main().catch(err => console.error(err));