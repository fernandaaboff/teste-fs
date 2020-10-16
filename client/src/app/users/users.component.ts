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
    })
  }

}
