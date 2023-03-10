import { HomePage } from './home/HomePage';
import { Basket } from './basket/Basket';
import { Page } from '../core/templates/page';
import { Store } from './store/Store';
import { PageIds } from '../types/PageIds';
import { Header } from '../core/components/header';
import ErrorPage, { ErrorTypes } from './error/Error';
import dataJSON from '../assets/data/data.json';
import { IData } from '../types/dataJSON';
import { Product } from './product/Product';
import SelectProduct from './product/Select';

const data: IData[] = dataJSON.products;

export class App {
  private static container: HTMLElement = document.body;
  private initialPage: HomePage;
  private header: Header;

  renderNewPage(idPageSource: string) {
    const idPage = idPageSource.toLowerCase();
    document.body.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.HomePage) {
      page = new HomePage(idPage);
    } else if (idPage === PageIds.BasketPage) {
      page = new Basket(idPage);
    } else if (idPage === PageIds.StorePage) {
      page = new Store(idPage);
    } else if (PageIds.Product.includes(idPage)) {
      const id = Number(idPage.replace(/[\D]+/g, ''));
      const findItem = data.find((el) => el.id === id);
      if (findItem == undefined) return false;
      page = new Product('123', findItem);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      if (page instanceof Store) {
        page.applyAllFilters();
      }
      const pageHtml = page.render();
      const containerMain: HTMLElement = document.createElement('main');
      containerMain.id = 'root';
      containerMain.append(pageHtml);
      App.container.append(this.header.render(), containerMain);
    }
    SelectProduct.changeCurrentItems();
  }

  private enableRouteChange() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        window.location.hash = `/home-page`;
      }

      if (!hash.includes('?')) {
        this.renderNewPage(hash);
      } else {
        this.renderNewPage(String(PageIds.StorePage));
      }
    };

    window.addEventListener('hashchange', loadPage);
    window.addEventListener('load', loadPage);
  }

  constructor() {
    this.initialPage = new HomePage('Home-Page');
    this.header = new Header('header', 'header');
  }

  run() {
    this.renderNewPage('Home-Page');
    this.enableRouteChange();
    SelectProduct.chooseProduct();
    SelectProduct.addAndRemoveInBasket();
  }
}
