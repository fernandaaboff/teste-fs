import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeathersService } from '../services/feathers.service';
import { __assign } from 'tslib';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  mensagens = [];
  userOriginal = [];
  pets = [];
  userId = '';
  userForm: FormGroup;

  constructor(private feathersService: FeathersService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      nome: '',
      email: ''
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      console.log(this.userId);
      if (this.userId) {
        this.feathersService.service('user')
          .get(this.userId)
          .then(res => {
            console.log(res);
            const dados = {
              nome: res.nome || '',
              email: res.email
            };
            Object.assign(this.userOriginal, dados);
            this.userForm.setValue(this.userOriginal);
          })
          .then(() => {
            this.feathersService.service('pet')
              .find({
                query: {
                  userId: this.userId
                }
              })
              .then(res => {
                res.data.forEach(element => {
                  this.pets.push(element);
                });
              });
          }
          );
      }
    });
  }

  restaurarUser() {
    this.userForm.setValue(this.userOriginal);
  }

  newPet() {
    this.pets.push({});
  }

  salvar(dados) {
    this.mensagens = [];
    if (event) {
      event.preventDefault();
    }
    if (this.userId) {
      this.feathersService.service('user')
        .patch(this.userId, dados)
        .then(res => {
          console.log(res);
        })
        .catch(erro => {
          this.mensagens.push(erro.message);
        });
    } else {
      this.feathersService.service('user')
        .create(dados)
        .then(res => {
          console.log(res);
        })
        .catch(erro => {
          this.mensagens.push(erro.message);
        });
    }
  }

  excluirUser() {
    if (confirm("Tem certeza que deseja apagar esse usuário? :(")) {
      this.pets.forEach(element => {
        this.feathersService.service('pet')
          .remove(element._id)
          .then(res => {
            console.log(res);
          })
          .catch(erro => {
            this.mensagens.push(erro.message);
          });
      });
      this.feathersService.service('user')
        .remove(this.userId)
        .then(res => {
          this.router.navigate(['/users']);
        })
        .catch(erro => {
          throw erro;
        });
    }
  }

  salvarPet(pet, nome) {
    if (nome && pet.nome !== nome) {
      if (pet._id) {
        this.feathersService.service('pet')
          .patch(pet._id, {
            'nome': nome
          })
          .then(res => {
            pet.nome = res.nome;
          })
          .catch(erro => {
            this.mensagens.push(erro.message);
          });
      } else {
        this.feathersService.service('pet')
          .create({
            'nome': nome,
            'userId': this.userId
          })
          .then(res => {
            Object.assign(pet, res);
          })
          .catch(erro => {
            this.mensagens.push(erro.message);
          });
      }
    }
  }

  excluirPet(pet) {
    if (confirm("Tem certeza que deseja apagar esse animal? :(")) {
      this.feathersService.service('pet')
        .remove(pet._id)
        .then(res => {
          this.pets.splice(this.pets.indexOf(pet), 1);
        })
        .catch(erro => {
          this.mensagens.push(erro.message);
        });
    }
  }
}
