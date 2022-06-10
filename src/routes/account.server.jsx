import { default as HydrogenConfig } from '../../hydrogen.config';

export async function api(request, {queryShop, session}) {
    const account = await HydrogenConfig.nosto;
    await session.set('account', account.merchantId);
    return account;
}
