import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from './services/feathers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Teste da Fernanda';

  constructor(private feathersService: FeathersService, private router: Router) { }

  logout() {
    this.feathersService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
