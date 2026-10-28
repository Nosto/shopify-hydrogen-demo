import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';

import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {requireCustomerAccount} from '~/lib/customer-account';

import type {AccountOutletContext} from './($locale).account';
import type {Route} from './+types/($locale).account.profile';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Profile'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  await requireCustomerAccount(context, request);

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed', customer: null}, {status: 405});
  }

  const {client, accessToken} = await requireCustomerAccount(context, request);
  const form = await request.formData();

  try {
    const customer: {firstName?: string; lastName?: string} = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const key of validInputKeys) {
      const value = form.get(key);
      if (typeof value === 'string' && value.length) {
        customer[key] = value;
      }
    }

    // update customer and possibly password
    const {data: result, errors} = await client.graphql(
      CUSTOMER_UPDATE_MUTATION,
      {
        accessToken,
        variables: {customer},
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (result?.customerUpdate?.userErrors?.length) {
      throw new Error(result.customerUpdate.userErrors[0].message);
    }

    if (!result?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: result.customerUpdate.customer,
    };
  } catch (error) {
    return data(
      {
        error: error instanceof Error ? error.message : String(error),
        customer: null,
      },
      {
        status: 400,
      },
    );
  }
}

type ActionFunction = typeof action;

export default function AccountProfile() {
  const account = useOutletContext<AccountOutletContext>();
  const {state} = useNavigation();
  const action = useActionData<ActionFunction>();
  const customer = action?.customer ?? account?.customer;

  return (
    <div className="account-profile">
      <h2>My profile</h2>
      <br />
      <Form method="PUT">
        <legend>Personal information</legend>
        <fieldset>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            defaultValue={customer.firstName ?? ''}
            minLength={2}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
            defaultValue={customer.lastName ?? ''}
            minLength={2}
          />
        </fieldset>
        {action?.error ? (
          <p>
            <mark>
              <small>{action.error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        <button type="submit" disabled={state !== 'idle'}>
          {state !== 'idle' ? 'Updating' : 'Update'}
        </button>
      </Form>
    </div>
  );
}
