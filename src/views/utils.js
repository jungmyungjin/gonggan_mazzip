export class Quantity {
  quantity;

  constructor(selector) {
    const { quantityEl, priceEl, totalPriceEl } = selector;
    this.quantityEl = quantityEl;
    this.totalPriceEl = totalPriceEl;
    this.price = Number(priceEl.innerText.replaceAll(",", ""));
    this.quantity = Number(quantityEl.innerText);
    this.totalPrice = this.quantity * this.price;
  }

  change(num) {
    if (this.quantity + num > 0) {
      this.quantity += num;
      this.quantityEl.innerText = this.quantity;

      this.totalPrice = this.quantity * this.price;
      this.totalPriceEl.innerText = this.totalPrice.toLocaleString();
    }
  }
}
