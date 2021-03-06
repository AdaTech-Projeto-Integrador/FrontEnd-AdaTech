import { UsuarioLogin } from './../model/UsuarioLogin';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuarioLogin: UsuarioLogin = new UsuarioLogin()

    constructor(

        private auth: AuthService,
        private router: Router,
        private alertas: AlertasService

    ) { }

    ngOnInit() {
        window.scroll(0,0)
    }

    entrar() {
        this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{
            this.usuarioLogin = resp
            environment.id = this.usuarioLogin.id
            environment.token = this.usuarioLogin.token
            environment.nome = this.usuarioLogin.nome
            environment.foto = this.usuarioLogin.foto
            environment.tipo = this.usuarioLogin.tipo

            console.log(environment.id)
            console.log(environment.token)
            console.log(environment.nome)
            console.log(environment.foto)
            console.log(environment.tipo)

            this.router.navigate(['/inicio'])
            }
            , erro => {
                if(erro.status == 500 || erro.status == 401) {
                    this.alertas.showAlertDanger('Email ou senha incorretos!')
                }
            }
        )
    }

}