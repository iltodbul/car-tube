import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';

const main = document.querySelector('main');
setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;

  next();
}

function setUserNav() {
  let username = sessionStorage.getItem('username');
  if (username != null) {
    document.getElementById('guest').style.display = 'none';
    document.getElementById('profile').style.display = '';
  } else {
    document.getElementById('guest').style.display = '';
    document.getElementById('profile').style.display = 'none';
  }
}
