import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private feathersService: FeathersService) { }

  public getUsers() {
    return this.feathersService.service('user')
      .find({
        paginate: false
      });
  }

  public getUserPets(id) {
    return this.feathersService.service('pet')
      .find({
        paginate: false,
        query: {
          userId: id
        }
      });
  }
}
