import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  tituloPostagem: string
  textoPostagem: string


  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { } 

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
  }

  let id = this.route.snapshot.params['id']
  this.findByIdPostagem(id)
  this.findAllTemas()
}

findByIdPostagem(id: number){
  this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
    this.postagem = resp
  })
}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
    this.tema = resp
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

}