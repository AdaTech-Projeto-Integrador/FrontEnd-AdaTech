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
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost:number
  

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private postagemService : PostagemService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == ''){
      this.router.navigate(['/login'])
    }
    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
   
  }

  findByIdPostagem(id: number){
 this.postagemService.getByIdPostagem(id).subscribe((resp : Postagem)=>{
   this.postagem = resp
 })
  }

  apagar(){
  this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
    alert ('Postagem apagada com sucesso!')
    this.router.navigate(['/inicio'])
  })
  }
}
