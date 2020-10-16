import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

// Connect to the `http://feathers-api.com/messages` service


@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  private feathersApp: any = feathers();
  private restClient = rest('http://localhost:3030');
  private feathersAuthClient = require('@feathersjs/authentication-client').default;

  constructor() {
    this.feathersApp
      .configure(this.restClient.fetch(window.fetch))
      .configure(this.feathersAuthClient({
        path: '/login',
        storage: window.localStorage
      }));
  }

  public service(servico) {
    return this.feathersApp.service(servico);
  }

  public authenticate(email, senha) {
    return this.feathersApp.authenticate({
      strategy: 'local',
      email: email,
      password: senha
    }).then(() => {
      this.feathersApp.service('user').find().then(res=>{console.log(res)});
    }).catch(erro => {
      if (erro.code === 403) {
        throw new Error("Login inválido");
      } else {
        throw erro;
      }
    });
  }

  public reAuthenticate() {
    return this.feathersApp.reAuthenticate();
  }

  public logout() {
    return this.feathersApp.logout();
  }
}
