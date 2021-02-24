import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../_services/films.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  movies;
  private subscription;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
  ) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.filmsService
      .getFilms()
      .subscribe( data => {
        this.movies = data['results'];
        console.log('data', this.movies);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortByAlpha() {
    console.log('sortedByAlpha', this.movies)
    let sortByAlpha: { title: string; }[] = this.movies.sort( (a, b) => {
      return (a.title > b.title) ? 1 : -1;
      /*if(a.title > b.title) {
        return 1;
      } else {
        re
      }
      if(a.title < b.title) {
        return -1;
      }
      return 0;*/
    });
  }

  sortByEpisode() {
    console.log('sortByEpisode', this.movies)
    let sortByAlpha: { episode_id: number; }[] = this.movies.sort( (a, b) => {
      return (a.episode_id > b.episode_id) ? 1 : -1;
      /*if(a.title > b.title) {
        return 1;
      } else {
        re
      }
      if(a.title < b.title) {
        return -1;
      }
      return 0;*/
    });
  }

}
