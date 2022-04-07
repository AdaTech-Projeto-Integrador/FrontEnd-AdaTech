import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path:'',redirectTo:'login',pathMatch:'full'}, 

  {path:'login', component: LoginComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'contato', component: ContatoComponent},
  {path:'inicio', component: InicioComponent},
  {path:'tema', component: TemaComponent},
  {path:'tema-edit/:id', component: TemaEditComponent},
  {path:'tema-delete/:id', component: TemaEditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
