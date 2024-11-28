import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userConnected : User = new User(0,"","",[]);

  constructor(private apiService : ApiService) { }

  /**
   * Méthode qui renvoi un utilisateur en locale storage, s'il est trouvé c'est qu'il est connecté !
   * @returns user s'il existe
   */
  getUser(){
    let user = localStorage.getItem('user');    
    if(user){ 
      try {
        this.userConnected = JSON.parse(atob(user));
      } catch (e) {
        console.error("Erreur lors du décryptage ou parsing :", e);
      }
    }
    return this.userConnected;
  }

  login(email: string) {
    return this.apiService.getUserByEmail(email);
  }

  isConnected() {
    return localStorage.getItem('user') != null; 
  }

  disconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User(0,"","",[]);
  }

  isAdmin() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('ADMIN') > -1)  return true;
    }
    return false;
  }

  isUser() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('USER') > -1)  return true;
    }
    return false;
  }

  setUser(user : User):any{
    user.password = '';
    this.userConnected = user;
    localStorage.setItem('user',btoa(JSON.stringify(user)));  //cryptage des données avant stockage en LS
  }
}
