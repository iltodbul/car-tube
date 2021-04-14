import { html } from '../../node_modules/lit-html/lit-html.js';
import { getListingById, deleteListing } from '../api/data.js';

const detailTemplate = (car, isOwner, onDelete) => html`
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src=${car.imageUrl} />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
      </ul>

      <p class="description-para">${car.description}</p>
      ${isOwner
        ? html`
            <div class="listings-buttons">
              <a href="/edit" class="button-list">Edit</a>
              <a
                @click=${onDelete}
                href="javascript:void(0)"
                class="button-list"
                >Delete</a
              >
            </div>
          `
        : ''}
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  let user = ctx.user();
  let userId = '';
  if (user) {
    userId = user._id;
  }
  let carId = ctx.params.id;
  let car = await getListingById(carId);
  let isOwner = userId === car._ownerId;
  ctx.render(detailTemplate(car, isOwner, onDelete));

  async function onDelete() {
    let confirmed = confirm('Are you sure?');
    if (confirmed) {
      await deleteListing(carId);
      ctx.page.redirect('/catalog');
    }
  }
}
