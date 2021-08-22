import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/core/services/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = <any>[];
  Cadastro: FormGroup = <any>[];
  invalid: boolean = false;
  invalidDados: boolean = false;
  usuario: boolean = false;
  usuarios: any = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder, private service: LoginService, private route: Router) {

    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      LOGIN_USUARIO: ['', Validators.required],
      SENHA_USUARIO: ['', Validators.required],
    });

    this.Cadastro = this.formBuilder.group({
      NOME: ['', Validators.required],
      EMAIL: ['', [Validators.email, Validators.required]],
      SENHA: ['', Validators.required],
    });

    this.service.Usuarios().subscribe((data) => {

      this.usuarios = data;

    })

  }


  open(content: any) {
    this.modalService.open(content);
  }


  login() {

    const email = this.usuarios.find((user: { email: string; }) => user.email === this.loginForm.value.LOGIN_USUARIO);
    const senha = this.usuarios.find((user: { senha: string; }) => user.senha === this.loginForm.value.SENHA_USUARIO);

    if (this.loginForm.invalid) {
      this.usuario = false;
      this.invalid = true;
    } else if (email != undefined && senha != undefined) {

      this.invalid = false;
      this.usuario = false;
      localStorage.setItem('nome', email.nome);
      localStorage.setItem('logado', email.logado);
      this.service.UsuarioLogado = senha;
      this.route.navigate(['home']);

    } else {

      console.log('aqui');

      this.invalid = false;
      this.usuario = true;

    }

  }


  Cadastrar(){

    const body = {

      nome: this.Cadastro.value.NOME,
      email: this.Cadastro.value.EMAIL,
      senha: this.Cadastro.value.SENHA,
      logado: true

    }

    if (this.Cadastro.invalid) {

      this.invalidDados = true;

    } else {

      this.service.Cadastro(body).subscribe((data)=> {

        localStorage.setItem('nome', data.nome);
        localStorage.setItem('logado', data.logado);
        this.route.navigate(['home']);
        this.modalService.dismissAll('Cross click');
  
      })

    }

    

  }

}
