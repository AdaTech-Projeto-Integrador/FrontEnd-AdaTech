import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUsuario: string
  fotoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/login'])
    }

    console.log(environment.id)

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
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

  atualizar() {

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas!')
    } else if (this.tipoUsuario != "profissional" && this.tipoUsuario != "org") {
      alert('Selecione o tipo de perfil!')
    }

    else {

      if (this.fotoUsuario == null) {
        this.fotoUsuario = "https://i.imgur.com/wBsUWjq.png"
      }

      else {
        this.usuario.tipo = this.tipoUsuario
        this.usuario.foto = this.fotoUsuario
        this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/login'])

          this.alertas.showAlertInfo("Usuario atualizado com sucesso, faça o login novamente.")
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
          environment.tipo = ''
          this.router.navigate(['/login'])
        },
        
        erro => {
          if (erro.status == 500 || erro.status == 401 || erro.status == 400) {
            alert('Preencha os campos obrigatórios corretamente!')
          }
        })
      }

    }

  }
  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}
