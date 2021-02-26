import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../_services/characters.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  film;
  films;
  subscription;
  endpoints;
  characters = new Array();

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {
    this.films = JSON.parse(localStorage.getItem('films'));
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.film = this.films[+params.get('filmId')];
      this.endpoints =  this.film['characters'];
    });

    for(let api of this.endpoints) {
      this.subscription = this.route.paramMap.subscribe(params => {
        this.charactersService
        .getPeople(api)
        .subscribe( data => {
          this.characters.push(data);
          localStorage.setItem('characters', JSON.stringify(this.characters));
        });
      });
    }
  }

}
