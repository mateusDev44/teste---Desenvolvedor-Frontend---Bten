import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLogado: boolean = false;

  private _UsuarioLogado = [];

  constructor(private http: HttpClient) { }

  public get UsuarioLogado() {
    return this._UsuarioLogado;
  }
  public set UsuarioLogado(value) {
    this._UsuarioLogado = value;
  }


  public get isLogado(): any {
    return this._isLogado;
  }
  public set isLogado(value: any) {
    this._isLogado = value;
  }


  get isLogged(): boolean {
    return !!this.token;
  }


  Usuarios() {
    return this.http.get<any>(`${environment.apiurl}`);
  }


  Cadastro(body: any) {
    return this.http.post<any>(`${environment.apiurl}`, body);
  }


  get token(): any {
    return localStorage.getItem('logado');
  }

  getadmDados(): any{

    return localStorage.getItem('nome');

  }

}
