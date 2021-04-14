import { html } from '../../node_modules/lit-html/lit-html.js';

import { carTemplate } from './catalog.js';
import { getListingByYear } from '../api/data.js';

const searchTemplate = (cars, onSearch, query) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired production year"
        .value=${query || ''}
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
      <!-- Display all records -->
      ${cars.length > 0
        ? cars.map(carTemplate)
        : html`<p class="no-cars">No results.</p>`}
    </div>
  </section>
`;

export async function searchPage(ctx) {
  let query = Number(ctx.querystring.split('=')[1]);
  let cars = Number.isNaN(query) ? [] : await getListingByYear(query);
  ctx.render(searchTemplate(cars, onSearch, query));

  async function onSearch() {
    let searchYear = document.getElementById('search-input').value.trim();
    searchYear = Number(searchYear);
    if (Number.isNaN(searchYear) == false || searchYear <= 0) {
      ctx.page.redirect('/search?quiery=' + searchYear);
    } else {
      alert('Year must be a positive number!');
    }
  }
}
