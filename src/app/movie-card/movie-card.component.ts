import { Component, input, model } from '@angular/core';

import { MovieModel } from '../shared/model/movie.model';
import { TiltDirective } from '../shared/tilt.directive';
import { StarRatingComponent } from '../ui/pattern/star-rating/star-rating.component';

@Component({
  selector: 'movie-card',
  imports: [StarRatingComponent, TiltDirective, TiltDirective],
  template: `
    <div class="movie-card" tilt [tiltDegree]="360">
      <img
        class="movie-image"
        [alt]="movie().title"
        [src]="'https://image.tmdb.org/t/p/w342' + movie().poster_path" />
      <div class="movie-card-content">
        <div class="movie-card-title">{{ movie().title }}</div>
        <div class="movie-card-rating">
          <ui-star-rating [rating]="movie().vote_average" />
        </div>
      </div>
      <button
        class="favorite-indicator"
        [class.is-favorite]="favorite()"
        (click)="toggle()">
        @if (favorite()) {
          I like it
        } @else {
          Like me
        }
      </button>
    </div>
  `,
  styles: `
    .movie-card {
      transition:
        box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s,
        transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }

    .movie-card:hover {
      .movie-image {
        transform: scale(1);
      }
      box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.6);
    }

    .movie-image {
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
      transform: scale(0.97);
    }

    .movie-card-content {
      text-align: center;
      padding: 1.5rem 3rem;
      font-size: 1.5rem;
    }

    .movie-card-title {
      font-size: 2rem;
    }
  `,
})
export class MovieCardComponent {
  movie = input.required<MovieModel>();
  favorite = model(false);

  toggle() {
    this.favorite.set(!this.favorite());
  }
}
