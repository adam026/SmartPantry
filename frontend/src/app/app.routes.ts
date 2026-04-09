import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Storage } from './pages/storage/storage';
import { ShoppingList } from './pages/shopping-list/shopping-list';
import { Recipes } from './pages/recipes/recipes';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'storage', component: Storage },
  { path: 'shopping-list', component: ShoppingList },
  { path: 'recipes', component: Recipes },
  { path: 'about', component: About }
];
