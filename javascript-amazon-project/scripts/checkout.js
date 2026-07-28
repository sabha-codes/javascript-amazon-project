import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
// import '../data/backend-practise.js';


Promise.all([
  new Promise((resolve) => {
  loadProducts(() =>{ // first we load the products and we wait for it to finish
  resolve('value1');
  }),
  new Promise((resolve) =>{
    loadCart(() =>{   //then we go to the next step which is load the cart, wait for it to finish to load the cart 
      resolve();
    });
  })

})
]).then((values) => {
  console.log(values);
  
  renderOrderSummary(); 
renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() =>{ 
  resolve('value1');
  })

}).then((value)=>{
  console.log(value);
  
  return new Promise((resolve) =>{
    loadCart(() =>{   //then we go to the next step which is load the cart, wait for it to finish to load the cart 
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary(); // then go to the next step which is nothing but displaying the page.
renderPaymentSummary(); // render means we are displaying the page.
});

*/

/*
loadProducts(() => {
  loadCart(() =>{
renderOrderSummary();
renderPaymentSummary();
  })
});
*/