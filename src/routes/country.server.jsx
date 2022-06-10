export async function api(request, {queryShop, session}) {

    if (request.method === 'POST') {
      const {isoCode, name} = await request.json();
      await session.set('isoCode', isoCode);
      await session.set('name', name);
      return 'success';
    } else if (request.method === 'GET') {
       const { isoCode, name } = await session.get();
       return { isoCode, name };
    } else {
        throw new Error(`request method ${request.method} not supported`);
    }
}