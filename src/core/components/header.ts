import { ComponentHeaderFooter } from '../templates/componentHeaderFooter';
import { PageIds } from '../../types/PageIds';

const buttons = [
  {
    id: PageIds.HomePage,
    text: 'Home',
  },
  {
    id: PageIds.StorePage,
    text: 'Shop',
  },
  {
    id: PageIds.BasketPage,
    text: 'Basket',
  },
];

export class Header extends ComponentHeaderFooter {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderNavButtons() {
    const navButtons = document.createElement('div');
    navButtons.className = 'header__nav';
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      navButtons.append(buttonHTML);
    });
    this.container.innerHTML = '';
    this.container.append(navButtons);

    const basketContainer = document.createElement('div');
    basketContainer.className = 'header__basket-container';
    this.container.append(basketContainer);

    const basketInfo = document.createElement('div');
    basketInfo.className = 'basket-container__info';
    basketInfo.innerText = 'Basket:';

    const bastetScore = document.createElement('div');
    bastetScore.className = 'basket-container__score';

    const infoAmount = document.createElement('div');
    infoAmount.className = 'basket-container__amount';
    infoAmount.innerText = 'Amount:';

    const totalAmount = document.createElement('div');
    totalAmount.className = 'basket-container__total-amount';

    basketContainer.append(basketInfo, bastetScore, infoAmount, totalAmount);
  }

  render() {
    this.renderNavButtons();
    return this.container;
  }
}
