import { Component, computed, signal } from '@angular/core';

import { AppShellComponent } from './app-shell/app-shell.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieModel } from './shared/model/movie.model';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent, MovieListComponent],
  template: `
    <app-shell>
      <div class="favorite-widget">
        @for (fav of favoriteMovies(); track fav; let last = $last) {
          <span>{{ fav.title }}</span>
          @if (!last) {
            <span>•</span>
          }
        }
      </div>
      <movie-list
        [movies]="movies()"
        [favoriteMovieIds]="favoriteMovieIds()"
        (toggleFavorite)="toggleFavorite($event)" />
    </app-shell>
  `,
})
export class AppComponent {
  movies = signal<MovieModel[]>([
    {
      id: 'the-god',
      title: 'The Godfather',
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      vote_average: 10,
    },
    {
      id: 'the-god-2',
      title: 'The Godfather part II',
      poster_path: '/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
      vote_average: 9,
    },
    {
      id: 'the-god-3',
      title: 'The Godfather part III',
      poster_path: '/lm3pQ2QoQ16pextRsmnUbG2onES.jpg',
      vote_average: 10,
    },
  ]);

  favoriteMovieIds = signal(new Set<string>(), {
    equal: () => false,
  });

  favoriteMovies = computed(() =>
    this.movies().filter(movie => this.favoriteMovieIds().has(movie.id))
  );

  toggleFavorite(movie: MovieModel) {
    this.favoriteMovieIds.update(favoriteMovieIds => {
      if (favoriteMovieIds.has(movie.id)) {
        favoriteMovieIds.delete(movie.id);
      } else {
        favoriteMovieIds.add(movie.id);
      }
      return favoriteMovieIds;
    });
  }
}
