import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/_services/characters.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  film;
  films;
  subscription;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {
    this.films = JSON.parse(localStorage.getItem('films'));
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.film = this.films[+params.get('filmId')];
      console.log('film', this.film['characters'])
    });

    this.subscription = this.route.paramMap.subscribe(params => {
      this.charactersService
      .getPeople()
      .subscribe( data => {
        console.log(data);
      });
    });
  }

}
