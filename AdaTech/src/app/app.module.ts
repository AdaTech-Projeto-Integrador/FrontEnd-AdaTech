import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { SobreAdatechComponent } from './sobre-adatech/sobre-adatech.component';



@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    MenuComponent,
    RodapeComponent,
    LoginComponent,
    CadastroComponent,
    InicioComponent,
    TemaComponent,
    TemaEditComponent,
    TemaDeleteComponent,
    UsuarioEditComponent,
    AlertasComponent,
    PostagemDeleteComponent,
    PostagemEditComponent,
    MinhasPostagensComponent,
    SobreAdatechComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule
  
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
