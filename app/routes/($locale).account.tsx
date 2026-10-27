import {data, NavLink, Outlet, useLoaderData} from 'react-router';

import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {requireCustomerAccount} from '~/lib/customer-account';

import type {Route} from './+types/($locale).account';

export function shouldRevalidate() {
  return true;
}

export async function loader({request, context}: Route.LoaderArgs) {
  const {client, accessToken} = await requireCustomerAccount(context, request);
  const {data: result, errors} = await client.graphql(CUSTOMER_DETAILS_QUERY, {
    accessToken,
  });

  if (errors?.length || !result?.customer) {
    throw new Error('Customer not found');
  }

  return data(
    {customer: result.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export type AccountCustomer = Awaited<
  ReturnType<typeof loader>
>['data']['customer'];

/** The context the account layout passes to its child routes' `useOutletContext()`. */
export type AccountOutletContext = {customer: AccountCustomer};

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="account">
      <h1>{heading}</h1>
      <br />
      <AccountMenu />
      <br />
      <br />
      <Outlet context={{customer} satisfies AccountOutletContext} />
    </div>
  );
}

function AccountMenu() {
  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  }

  return (
    <nav role="navigation">
      <NavLink to="/account/orders" style={isActiveStyle}>
        Orders &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/profile" style={isActiveStyle}>
        &nbsp; Profile &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/addresses" style={isActiveStyle}>
        &nbsp; Addresses &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <Logout />
    </nav>
  );
}

// Logout is owned by the customer-account handlers, so this must be a native form POST.
function Logout() {
  return (
    <form className="account-logout" method="POST" action="/account/logout">
      &nbsp;<button type="submit">Sign out</button>
    </form>
  );
}
