const cart = [];
const count = document.querySelector('#cartCount');
const dialog = document.querySelector('#cartDialog');
const items = document.querySelector('#cartItems');
const total = document.querySelector('#cartTotal');
const note = document.querySelector('#demoNote');

function renderCart() {
  count.textContent = cart.length;
  total.textContent = `${cart.reduce((sum, item) => sum + item.price, 0)} ₽`;
  if (!cart.length) {
    items.innerHTML = '<p class="empty">Корзина пока пуста.</p>';
    return;
  }
  items.innerHTML = cart.map((item, index) => `
    <div class="cart-row">
      <span>${item.name}</span><strong>${item.price} ₽</strong>
      <button type="button" data-remove="${index}" aria-label="Удалить ${item.name}">×</button>
    </div>`).join('');
}

document.querySelectorAll('.add').forEach(button => button.addEventListener('click', () => {
  cart.push({name: button.dataset.name, price: Number(button.dataset.price)});
  renderCart();
  button.textContent = 'Добавлено';
  setTimeout(() => button.textContent = 'В корзину', 900);
}));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.product').forEach(card => {
    card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter);
  });
}));

document.querySelector('#cartButton').addEventListener('click', () => { renderCart(); dialog.showModal(); });
document.querySelector('#closeCart').addEventListener('click', () => dialog.close());
items.addEventListener('click', event => {
  const index = event.target.dataset.remove;
  if (index !== undefined) { cart.splice(Number(index), 1); renderCart(); }
});
document.querySelector('#checkout').addEventListener('click', () => {
  note.textContent = cart.length ? 'Заказ сформирован в демонстрационном режиме. Данные не отправлены.' : 'Сначала добавьте хотя бы один товар.';
  note.classList.add('notice');
});
