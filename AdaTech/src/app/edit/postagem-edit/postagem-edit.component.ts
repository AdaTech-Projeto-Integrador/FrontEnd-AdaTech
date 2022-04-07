import { TemaService } from './../service/tema.service';
import { Tema } from './../../model/Tema';
import { environment } from 'src/environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private postagemService : PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

    if (environment.token == ''){
      this.router.navigate(['/login'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostaem(id)
    this.findAllTemas()
  }

  findByIdPostaem(id: number){
 this.postagemService.getByIdPostagem(id).subscribe((resp : Postagem)=>{
   this.postagem = resp
 })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{

    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })

  }
}
