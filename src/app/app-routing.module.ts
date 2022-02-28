import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { DrinkDetailComponent } from './views/drink-detail/drink-detail.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  },
  {
    path: 'home',
    component: HomeViewComponent
  },
  {
    path: 'drink',
    component: DrinkDetailComponent
  },
  {
    path: 'login',
    component: LoginViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
