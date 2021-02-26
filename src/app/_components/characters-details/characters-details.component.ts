import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../_services/films.service';
import { PlanetsService } from '../../_services/planets.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.sass']
})
export class CharactersDetailsComponent implements OnInit {
  character;
  characters;
  homeworld;
  homeworldEndpoint;
  subscription;
  subscription2;
  endpoints;
  movies = new Array();

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService,
    private filmsService: FilmsService
  ) {
    this.characters = JSON.parse(localStorage.getItem('characters'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.character = this.characters[+params.get('charId')];
      this.homeworldEndpoint =  this.character['homeworld'];
      this.endpoints =  this.character['films'];
    });

    this.subscription = this.route.paramMap.subscribe(params => {
      this.planetsService
      .getPlanet(this.homeworldEndpoint)
      .subscribe( data => {
        this.homeworld = data['name'];
      });
    });

    for(let api of this.endpoints) {
      this.subscription2 = this.route.paramMap.subscribe(params => {
        this.filmsService
        .getFimsByCharacter(api)
        .subscribe( data => {
          this.movies.push(data['title']);
        });
      });
    }
  }

}
