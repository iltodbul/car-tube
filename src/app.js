import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { getUserData } from './utility.js';
import { logout } from './api/data.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', userLogout);
setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData;

  next();
}

function setUserNav() {
  let user = getUserData();
  if (user) {
    document.getElementById('profile').style.display = '';
    document.getElementById('guest').style.display = 'none';
    document.getElementById(
      'user-greating'
    ).textContent = `Welcome ${user.username}`;
  } else {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('guest').style.display = '';
  }
}

async function userLogout() {
  await logout();
  setUserNav();
  page.redirect('/');
}
