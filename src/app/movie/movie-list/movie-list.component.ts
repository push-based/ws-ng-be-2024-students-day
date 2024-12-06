import { Component, input, output } from '@angular/core';

import { MovieCardComponent } from '../../movie-card/movie-card.component';
import { MovieModel } from '../../shared/model/movie.model';

@Component({
  selector: 'movie-list',
  imports: [MovieCardComponent],
  template: `
    @for (movie of movies(); track movie.id) {
      <movie-card
        [movie]="movie"
        [favorite]="favoriteMovieIds().has(movie.id)"
        (favoriteChange)="toggleFavorite.emit(movie)" />
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 35rem));
      gap: 4rem 2rem;
      place-content: space-between space-evenly;
      align-items: start;
      position: relative;
    }
  `,
})
export class MovieListComponent {
  movies = input.required<MovieModel[]>();
  favoriteMovieIds = input(new Set<string>());
  toggleFavorite = output<MovieModel>();
}
