import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersDetailsComponent } from './_components/characters-details/characters-details.component';
import { HomeComponent } from './_components/home/home.component';
import { MovieDetailsComponent } from './_components/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'films/:filmId', component: MovieDetailsComponent },
  { path: 'chars/:charId', component: CharactersDetailsComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
