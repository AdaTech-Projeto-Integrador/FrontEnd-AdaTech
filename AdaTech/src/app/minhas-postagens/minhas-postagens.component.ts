import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-minhas-postagens',
  templateUrl: './minhas-postagens.component.html',
  styleUrls: ['./minhas-postagens.component.css']
})
export class MinhasPostagensComponent implements OnInit {

  postagem: Postagem = new Postagem
  listaPostagens: Postagem[]

  tema: Tema = new Tema
  listaTemas: Tema[]

  idTema: number
  idPost: number

  tituloPostagem: string
  textoPostagem: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0,0)


    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdUsuario()

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)

  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp.reverse()
    })
  }


  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  validarTitulo(event: any) {
    this.tituloPostagem = event.target.value
  }

  validarTexto(event: any) {
    this.textoPostagem = event.target.value
  }

  publicar() {

    if (this.tituloPostagem == null) {
      alert('Postagem não publicada! Digite um título')
    }
    else if (this.textoPostagem == null) {
      alert('Postagem não publicada! Digite o texto')
    } else if (this.idTema == null) {
      alert('Postagem não publicada! Escolha um tema')
    } else {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.getAllTemas()
    })
  }
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    if (this.tituloPostagem == "") {
      alert('Digite um título!')
    }
    else if (this.textoPostagem == "") {
      alert('Digite o texto!')
    } else if(this.idTema == null) {
      alert('Escolha um tema!')
    }
    else

    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(() =>{
      this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }


}
