import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string
  fotoUsuario: string

  constructor(

    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  validarFoto(event: any) {
    this.fotoUsuario = event.target.value
  }

  cadastrar() {

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas!')
    } else if (this.tipoUsuario != "profissional" && this.tipoUsuario != "org" && this.tipoUsuario != "adm") {
      this.alertas.showAlertDanger('Selecione o tipo de perfil!')
    }

    else {

      if (this.fotoUsuario == null) {
        this.fotoUsuario = "https://i.imgur.com/wBsUWjq.png"
      }

      this.usuario.tipo = this.tipoUsuario
      this.usuario.foto = this.fotoUsuario
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        this.router.navigate(['/login'])
      },

        erro => {
          if (erro.status == 500 || erro.status == 401 || erro.status == 400) {
            this.alertas.showAlertDanger('Preencha os campos obrigatórios corretamente!')
          }
        }

      )
    }

  }

}
