import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
// import '../data/backend-practise.js';


async function loadPage() {
try{

  await loadProductsFetch();


const value = await new Promise((resolve) =>{
    loadCart(() =>{   
      resolve('value3');
    });
  })
} catch(error) {
console.log('unexpected error . please try again later.');

}

 renderOrderSummary(); 
renderPaymentSummary();


}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) =>{
    loadCart(() =>{   //then we go to the next step which is load the cart, wait for it to finish to load the cart 
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  
  renderOrderSummary(); 
renderPaymentSummary();
});
*/
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