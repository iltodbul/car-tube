import { html } from '../../node_modules/lit-html/lit-html.js';

import { carTemplate } from './catalog.js';
import { getListingByYear } from '../api/data.js';

const searchTemplate = (cars, onSearch) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired production year"
      />
      <button id="searchBtn" class="button-list">Search</button>
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
  let cars = [];
  ctx.render(searchTemplate(cars));
  let searchBtn = document
    .getElementById('searchBtn')
    .addEventListener('click', onSearch);

  async function onSearch(event) {
    let searchYear = document.getElementById('search-input').value.trim();
    searchYear = Number(searchYear);
    if (typeof searchYear !== 'number' || searchYear <= 0) {
      return alert('Year must be a positive number!');
    }
    cars = await getListingByYear(searchYear);
    ctx.render(searchTemplate(cars));
  }
}
