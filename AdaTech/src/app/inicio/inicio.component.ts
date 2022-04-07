import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

 postagem : Postagem = new Postagem()
 listaPostagens: Postagem[]

 tema : Tema = new Tema()
 listaTemas : Tema[]
 idTema : number

 usuario : Usuario = new Usuario()
 idUsuario = environment.id

  constructor(
    private router: Router,
    private postagemService : PostagemService,
    private temaService : TemaService,
    private authService : AuthService

  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.getAllTemas()
    this.getAllPostagens()

  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp : Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
     this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{this.listaPostagens = resp
      
    })
  }

  findByIdUser(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  publicar(){
     this.tema.id = this.idTema
     this.postagem.tema = this.tema

     this.usuario.id = this.idUsuario
     this.postagem.usuario = this.usuario

     this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
       this.postagem = resp
       alert('Postagem realizada com sucesso!')
       this.postagem= new Postagem()
       this.getAllPostagens()
     })
  }

}
