import { html } from '../../node_modules/lit-html/lit-html.js';
import { getListingById, updateListing } from '../api/data.js';

const editTemplate = (car, onSubmit) => html`
  <section id="edit-listing">
    <div class="container">
      <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input
          type="text"
          placeholder="Enter Car Brand"
          name="brand"
          .value=${car.brand}
        />

        <p>Car Model</p>
        <input
          type="text"
          placeholder="Enter Car Model"
          name="model"
          .value=${car.model}
        />

        <p>Description</p>
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          .value=${car.description}
        />

        <p>Car Year</p>
        <input
          type="number"
          placeholder="Enter Car Year"
          name="year"
          .value=${car.year}
        />

        <p>Car Image</p>
        <input
          type="text"
          placeholder="Enter Car Image"
          name="imageUrl"
          .value=${car.imageUrl}
        />

        <p>Car Price</p>
        <input
          type="number"
          placeholder="Enter Car Price"
          name="price"
          .value=${car.price}
        />

        <hr />
        <input type="submit" class="registerbtn" value="Edit Listing" />
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  let carId = ctx.params.id;
  let car = await getListingById(carId);
  ctx.render(editTemplate(car, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let brand = formData.get('brand').trim();
    let model = formData.get('model').trim();
    let description = formData.get('description').trim();
    let year = formData.get('year').trim();
    year = Number(year);
    let imageUrl = formData.get('imageUrl').trim();
    let price = formData.get('price').trim();
    price = Number(price);

    if (!brand || !model || !description || !year || !imageUrl || !price) {
      return alert('All fields are required!');
    }
    if (typeof year !== 'number' || year <= 0) {
      return alert('Year must be positiv number!');
    }
    if (typeof price !== 'number' || price <= 0) {
      return alert('Price must be positiv number!');
    }

    let editedCar = { brand, model, description, year, imageUrl, price };

    await updateListing(carId, editedCar);
    ctx.page.redirect('/details/' + carId);
  }
}
