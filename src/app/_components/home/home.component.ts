import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../_services/films.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  sortByAlphaAsc : boolean = false;
  sortByEpisodeAsc: boolean = false;
  films;
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
        this.films = data['results'];
        localStorage.setItem('films', JSON.stringify(this.films));
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortByAlpha() {
    this.sortByAlphaAsc = !this.sortByAlphaAsc;
    if(this.sortByAlphaAsc) {
      this.films.sort( (a, b) => {
        return (a.title > b.title) ? 1 : -1;
      });
    } else {
      this.films.sort( (a, b) => {
        return (a.title < b.title) ? 1 : -1;
      });
    }
  }

  sortByEpisode() {
    this.sortByEpisodeAsc = !this.sortByEpisodeAsc;
    if(this.sortByEpisodeAsc) {
      this.films.sort( (a, b) => {
        return (a.episode_id > b.episode_id) ? 1 : -1;
      });
    } else {
      this.films.sort( (a, b) => {
        return (a.episode_id < b.episode_id) ? 1 : -1;
      });
    }
  }
}
