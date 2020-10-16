import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  users = [];

  constructor(private dataService: DataService) {
    this.dataService.getUsers()
    .then(res => {
      res.data.forEach(element => {
        this.users.push(element);
      });
    });
  }

  getPets(user) {
    if(!user.pets) {
      user.pets = [];
      this.dataService.getUserPets(user._id)
      .then(res => {
        res.data.forEach(element => {
          user.pets.push(element);
        });
      });
    }
  }

}
