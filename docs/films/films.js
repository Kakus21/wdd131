import { films } from './films.mjs';

function renderFilmCard(film) {
  const card = document.createElement('div');
  card.classList.add('film-card');

  card.innerHTML = `
    <div class="film-card-image">
      <img src="${film.poster}" alt="${film.alt}" />
    </div>
    <div class="film-card-content">
      <h3>${film.title}</h3>
      <p class="film-meta">${film.year} • ${film.genre} • ⭐ ${film.rating}</p>
      <p class="film-synopsis">${film.synopsis}</p>
    </div>
  `;
  return card;
}

function displayFeaturedFilm(film) {
  const container = document.getElementById('random-film');
  if (!container) return;

  container.innerHTML = `
    <div class="featured-card">
      <img src="${film.poster}" alt="${film.alt}" class="featured-poster" />
      <div class="featured-details">
        <h2>${film.title}</h2>
        <p><strong>Year:</strong> ${film.year}</p>
        <p><strong>Genre:</strong> ${film.genre}</p>
        <p><strong>Rating:</strong> ${film.rating} ⭐</p>
        <p>${film.synopsis}</p>
      </div>
    </div>
  `;
}

function displayTopTenFilms() {
  const container = document.getElementById('films-container');
  if (!container) return;

  container.innerHTML = '';
  const top10 = films.filter(f => f.isTop10).sort((a, b) => b.rating - a.rating);
  top10.forEach(film => container.appendChild(renderFilmCard(film)));
}

function displaySearchResults() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (!query) return;

  const resultsContainer = document.getElementById('results-container');
  if (!resultsContainer) return;

  const lowerTerm = query.toLowerCase();
  const matched = films.filter(film =>
    film.title.toLowerCase().includes(lowerTerm) ||
    film.genre.toLowerCase().includes(lowerTerm) ||
    film.year.toString().includes(lowerTerm)
  );

  if (matched.length > 0) {
    matched.sort((a, b) => b.rating - a.rating)
      .forEach(film => resultsContainer.appendChild(renderFilmCard(film)));
  } else {
    resultsContainer.innerHTML = `<p>No films found for "${query}".</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('random-film')) {
    const randomIndex = Math.floor(Math.random() * films.length);
    displayFeaturedFilm(films[randomIndex]);
    displayTopTenFilms();

    const input = document.getElementById('film-search');
    const form = document.getElementById('film-search-form');

    if (input && form) {
      input.addEventListener('input', e => {
        const query = e.target.value.trim();
        if (query === '') {
          displayTopTenFilms();
        } else {
          const container = document.getElementById('films-container');
          container.innerHTML = '';
          const filtered = films.filter(f =>
            f.title.toLowerCase().includes(query.toLowerCase()) ||
            f.genre.toLowerCase().includes(query.toLowerCase()) ||
            f.year.toString().includes(query)
          );
          filtered.sort((a, b) => b.rating - a.rating)
            .forEach(film => container.appendChild(renderFilmCard(film)));
        }
      });
    }
  }

  if (document.getElementById('results-container')) {
    displaySearchResults();
  }
});
