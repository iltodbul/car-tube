import { html } from '../../node_modules/lit-html/lit-html.js';
import { createListing } from '../api/data.js';

const createTemplate = (onSubmit) => html`
  <section id="create-listing">
    <div class="container">
      <form @submit=${onSubmit} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" />

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" />

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" />

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" />

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" />

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" />

        <hr />
        <input type="submit" class="registerbtn" value="Create Listing" />
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

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
      return alert('Year must be a positive number!');
    }
    if (typeof price !== 'number' || price <= 0) {
      return alert('Price must be a positive number!');
    }

    let car = { brand, model, description, year, imageUrl, price };
    let user = ctx.user();
    if (user) {
      await createListing(car);
      ctx.page.redirect('/catalog');
    }
  }
}
