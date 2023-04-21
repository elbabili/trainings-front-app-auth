import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loginout',
  templateUrl: './loginout.component.html',
  styleUrls: ['./loginout.component.css']
})
export class LoginoutComponent implements OnInit {
  myForm : FormGroup;
  user : User | undefined;
  error : string | undefined;
  connected : boolean = false;
  
  constructor(private formBuilder : FormBuilder, public authService : AuthenticateService, private router : Router) { 
    this.user = authService.getUser(); 
    this.connected = authService.isConnected();
    this.myForm = this.formBuilder.group({
      email : [this.user.email, [Validators.required,Validators.pattern(environment.regExEmail)]],
      password : [this.user.password, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.user = new User("","",[]);
  }

  onLogin(form : FormGroup){
    if(form.valid){
      this.authService.login(form.value.email).subscribe({
        next : (data) => {
            this.user = data[0];
            if(this.user.email == form.value.email && this.user.password == form.value.password){
                this.authService.setUser(this.user);
                this.router.navigateByUrl('cart');
            }
            else this.error = "Email or Password incorrecte"; 
          },
        error : (err) => this.error = err.message,  //pb sur la requete
        complete : () => console.log("Welcome")
      })
    }
    else this.error = 'Erreur de saisie';
  }

  onAddUser(){
  }

  disconnect(){
    this.authService.disconnected();
    this.connected = false;
    this.router.navigateByUrl('trainings');
  }
}
