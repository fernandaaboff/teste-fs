import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from '../services/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mensagens = [];

  constructor(private feathersService: FeathersService, private router: Router) { }

  login(event, email, senha) {
    event.preventDefault();
    this.mensagens = [];
    console.log(event);
    if (!email || !senha) {
      this.mensagens.push("Preencha os dados");
      return;
    }
    this.feathersService.authenticate(email, senha)
    .then(res => {
      this.router.navigate(['/users']);
    })
    .catch(erro => {
      this.mensagens.push(erro.message);
    });
  }
}
