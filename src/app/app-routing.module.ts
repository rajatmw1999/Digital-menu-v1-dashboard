import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { SubCategoryListComponent } from './pages/sub-category-list/sub-category-list.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'items',
    component: ItemsListComponent
  },
  {
    path: 'subcategory',
    component: SubCategoryListComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
