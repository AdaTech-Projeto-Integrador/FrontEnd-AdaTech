import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)


  }
  
  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
    
  }

  atualizar(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>('http://localhost:8080/usuarios/atualizar',usuario);

   }


getByIdUsuario(id: number): Observable<Usuario>{
  return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`)
}


  logado(){
    let ok = false 
    if(environment.token !=''){
      ok = true
    }
    return ok
  }

  adm(){
    let ok = false 
    if(environment.tipo == 'Admin'){
      ok = true
    }
    return ok
  }

}