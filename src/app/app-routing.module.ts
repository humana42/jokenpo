import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PlayComponent } from './play/play.component';


const routes: Routes = [
  {path: '',   redirectTo: 'menu', pathMatch: 'full'},
  {path:'menu', component:MenuComponent},
  {path: 'play', component:PlayComponent},
  {path: '**',   redirectTo: 'menu', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
