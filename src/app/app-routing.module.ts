import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/component/dashboard/dashboard.component';
import { CreatPostComponent } from './shared/component/creat-post/creat-post.component';
import { DeletePostComponent } from './shared/component/delete-post/delete-post.component';
import { AppPostComponent } from './shared/component/app-post/app-post.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'creatpost', component:CreatPostComponent},
  {path:'deletepost', component:DeletePostComponent},
  {path : 'addpost', component:AppPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
