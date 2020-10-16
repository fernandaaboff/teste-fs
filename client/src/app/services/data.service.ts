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
}
