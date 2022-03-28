import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
const routes: Routes = [

  {path:'',redirectTo:'login',pathMatch:'full'}, 

  {path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroComponent},
{path:'contato', component: ContatoComponent,}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
