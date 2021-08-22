import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public service: LoginService, private route: Router) { }

    Saudacao: any;

  ngOnInit(): void {

    this.verificaHora();

  }


  verificaHora() {
    const stamp = new Date();
    let hours;
    let time;

    hours = stamp.getHours();

    if (hours > 5 && hours < 12) {
      time = "Bom dia";

    } else if (hours >= 12) {

      time = "Boa Tarde";
    } else if (hours >= 18) {
      
      time = "Boa Noite"

    }
    this.Saudacao = time;
  }


  
  logout(){

    localStorage.removeItem('nome')
    localStorage.removeItem('logado')
   
    this.route.navigate(['']);



  }

}
