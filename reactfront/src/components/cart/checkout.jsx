import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import useCart from '../hooks/useCart';

// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

export default function MPButton() {
  const cart = useCart();
  
  useEffect(() => {
    // console.log(document.querySelector('.cho-container').childNodes.length)
    if (Object.keys(cart.boughtObj).length === 0) return;
    // if (document.querySelector('.cho-container').childNodes.length != 0) return;

    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      await axios.post('http://localhost:8000/products/buy', cart.boughtObj)
      .then(({data}) => {
        // const script = document.createElement('script') // Here we create the empty script tag
        // script.type = 'text/javascript' // The type of the script
        // script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted
        // script.setAttribute('data-preference-id', data.preferenceId) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        // document.body.appendChild(script) // Here we append it to the body of our page

        document.getElementById('mercado-pago-id').setAttribute('data-preference-id', data.preferenceId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        
        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        const mp = new window.MercadoPago('TEST-60491e71-6caf-48f1-ab50-a0a1f2b1aca4' ,{
          locale: 'es-CO'
        })

        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
          preference: {
            id: data.preferenceId
          },
          render: {
            container: '.cho-container',
            label: 'Checkout',
          }
        });

      }).catch(error => {
        // alert(error);
      })
    }
    fetchCheckout()
  }, [])

  return <div className="cho-container"></div>
}