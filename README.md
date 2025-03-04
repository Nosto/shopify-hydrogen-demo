# Nosto Hydrogen V2 Demo Storefront

- This is a demo of Nosto within a [Shopify Hydrogen](https://github.com/Shopify/hydrogen) storefront deployed with Oxygen.
- Nosto is implemented by usage of [@nosto/shopify-hydrogen](https://github.com/Nosto/shopify-hydrogen)
- The deployment can be seen [here](https://nosto-hydrogen-demo-5bba196044d0453163cc.o2.myshopify.dev/)

## Implementing Nosto Extensions Without Pixel

To integrate Nosto without using the pixel, it is necessary to track the cart token as soon as a product is added to the cart. This can be achieved on the frontend using `useEffect` in React:

```javascript
useEffect(() => {
  checkTokenToCustomer(cart?._data?.id, header?.shop?.id);
}, [cart?._data?.id]);
```

- `cart?._data?.id` represents the cart token.
- `header?.shop?.id` represents the shop ID.

### Updating the Cart Token with the Session ID

To ensure that the cart token is correctly linked to a session ID, use the following function:

```javascript
export async function checkTokenToCustomer(
  cartIdGid,
  shopIdGid,
  providedCustomerId,
) {
  let customerId = providedCustomerId || getCookie('2c.cId');
  const cartToken = cartIdGid?.replace('gid://shopify/Cart/', '');
  const shopId = shopIdGid?.replace('gid://shopify/Shop/', 'shopify-');

  if (!customerId || !cartToken || !shopId) return;

  const NOSTO_URL = `https://connect.nosto.com/token/${shopId}/${customerId}/${cartToken}`;

  try {
    await fetch(NOSTO_URL);
  } catch (err) {
    console.error('Nosto: error updating cart:', err);
  }
}
```

The session ID is stored in the browser cookies under `2c.cId`, which can be retrieved using:

```javascript
function getCookie(name) {
  const value = `; ${document?.cookie}`;
  if (value) {
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }
  return null;
}
```

### Handling Buy Now Functionality

If the store has a "Buy Now" feature that redirects users directly to checkout, it is essential to call `checkTokenToCustomer` before redirection. The session ID should be extracted from cookies and passed along with the cart token and shop ID:

```javascript
if (inputs.redirectToCheckout === true) {
  const {shop} = await context.storefront.query(ROBOTS_QUERY);
  const cookies = request.headers.get('Cookie') || '';
  const sessionId =
    cookies
      .split(';')
      .find((cookie) => cookie.trim().startsWith('2c.cId='))
      ?.split('=')[1] || null;

  await checkTokenToCustomer(result.cart.id, shop.id, sessionId);
  status = 303;
  headers.set('Location', result.cart.checkoutUrl);
}
```

This ensures that Nosto correctly associates the cart token with the session ID, even when users proceed directly to checkout.

## Summary

- **Track the cart token** when a product is added to the cart using `useEffect`.
- **Link the cart token to the session ID** using `checkTokenToCustomer`.
- **Retrieve the session ID from cookies** using `getCookie('2c.cId')`.
- **Ensure the cart token is updated before checkout** in "Buy Now" flows.

By implementing these steps, you can fully integrate Nosto without requiring the pixel, ensuring accurate cart tracking and personalization for users.
