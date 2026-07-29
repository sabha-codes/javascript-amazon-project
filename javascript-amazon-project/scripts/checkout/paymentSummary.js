import {cart} from '../../data/cart.js';

import { getProduct } from '../../data/products.js';

import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';

export function renderPaymentSummary(){
  let productPriceCents = 0;
let shippingPriceCents = 0;
 cart.forEach((cartItem) =>{
const product = getProduct(cartItem.productId);
productPriceCents += product.priceCents * cartItem.quantity;

const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
 shippingPriceCents += deliveryOption.priceCents;
 }); 
 
 const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
 const taxCents = totalBeforeTaxCents * 0.1;
 const totalCents = totalBeforeTaxCents + taxCents;


 let cartQuantity = 0;
 cart.forEach((cartItem)=>{
  cartQuantity += cartItem.quantity;
 });

 const paymentSummaryHTML = `

           <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items ():</div>
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>

 `;

 document.querySelector('.js-payment-summary')
 .innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order')
 .addEventListener('click' , async () => {
  try{
const response = await  fetch('https://supersimplebackend.dev/orders', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json' //this tells the backend that what type of data we are sending in our backend .its basicaly a js object

    },
    body: JSON.stringify({ // this is the actual data we gonna send to the backend
      cart: cart  // however we cannot send an object directly. we need to convert it into a JSON string
    })
  })

 const order = await response.json() // remeber to get the data from the response we need to use response.json() this is also a promise
 addOrder(order);

  }catch (error) {
console.log('Unexpected Error. Try again later');

  }

 window.location.href = 'orders.html';
 });

}