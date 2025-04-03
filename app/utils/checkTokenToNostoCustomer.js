export async function checkTokenToCustomer(cartIdGid, shopIdGid, providedCustomerId) {
  let customerId = providedCustomerId
  if (!customerId) {
    customerId = getCookie('2c.cId');
  }
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

function getCookie(name) {
  const value = `; ${document?.cookie}`;
  if (value) {
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  } else {
    return null;
  }
}