import type {ReactNode} from 'react';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';

import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import {requireCustomerAccount} from '~/lib/customer-account';

import type {AccountCustomer, AccountOutletContext} from './($locale).account';
import type {Route} from './+types/($locale).account.addresses';

type CustomerAddress = NonNullable<AccountCustomer['defaultAddress']>;

/** The address fields the form reads, shared by saved addresses and the blank new-address form. */
type AddressFormValues = Partial<
  Pick<
    CustomerAddress,
    | 'address1'
    | 'address2'
    | 'city'
    | 'company'
    | 'countryCode'
    | 'firstName'
    | 'lastName'
    | 'phoneNumber'
    | 'zoneCode'
    | 'zip'
  >
>;

type AddressInput = {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  countryCode?: CustomerAddress['countryCode'];
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  zoneCode?: string;
  zip?: string;
};

type ActionResponse = {
  error: Record<string, string> | string | null;
  createdAddress?: {id: string};
  updatedAddress?: AddressInput;
  deletedAddress?: string;
  defaultAddress?: boolean;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Addresses'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  await requireCustomerAccount(context, request);

  return {};
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function action({request, context}: Route.ActionArgs) {
  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    // this will ensure redirecting to login never happen for mutatation
    let account: Awaited<ReturnType<typeof requireCustomerAccount>>;
    try {
      account = await requireCustomerAccount(context, request);
    } catch {
      return data<ActionResponse>(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }
    const {client, accessToken} = account;

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: AddressInput = {};
    const keys = [
      'address1',
      'address2',
      'city',
      'company',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ] as const;

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    // The Customer Account API takes an upper-case ISO 3166-1 alpha-2 `countryCode`; an
    // unknown value fails the whole request, so reject anything that is not two letters.
    const countryCode = form.get('countryCode');
    if (typeof countryCode === 'string') {
      const normalized = countryCode.trim().toUpperCase();
      if (!/^[A-Z]{2}$/.test(normalized)) {
        return data<ActionResponse>(
          {
            error: {
              [addressId]:
                'Country code must be a two-letter code such as US or CA.',
            },
          },
          {status: 400},
        );
      }
      address.countryCode = normalized as CustomerAddress['countryCode'];
    }

    switch (request.method) {
      case 'POST': {
        // handle new address creation
        try {
          const {data: result, errors} = await client.graphql(
            CREATE_ADDRESS_MUTATION,
            {
              accessToken,
              variables: {
                address,
                defaultAddress,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (result?.customerAddressCreate?.userErrors?.length) {
            throw new Error(result.customerAddressCreate.userErrors[0].message);
          }

          if (!result?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: result.customerAddressCreate.customerAddress,
            defaultAddress,
          } satisfies ActionResponse;
        } catch (error) {
          return data<ActionResponse>(
            {error: {[addressId]: errorMessage(error)}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        // handle address updates
        try {
          const {data: result, errors} = await client.graphql(
            UPDATE_ADDRESS_MUTATION,
            {
              accessToken,
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (result?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(result.customerAddressUpdate.userErrors[0].message);
          }

          if (!result?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          } satisfies ActionResponse;
        } catch (error) {
          return data<ActionResponse>(
            {error: {[addressId]: errorMessage(error)}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        // handles address deletion
        try {
          const {data: result, errors} = await client.graphql(
            DELETE_ADDRESS_MUTATION,
            {
              accessToken,
              variables: {
                addressId: decodeURIComponent(addressId),
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (result?.customerAddressDelete?.userErrors?.length) {
            throw new Error(result.customerAddressDelete.userErrors[0].message);
          }

          if (!result?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {
            error: null,
            deletedAddress: addressId,
          } satisfies ActionResponse;
        } catch (error) {
          return data<ActionResponse>(
            {error: {[addressId]: errorMessage(error)}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data<ActionResponse>(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error) {
    return data<ActionResponse>(
      {error: errorMessage(error)},
      {
        status: 400,
      },
    );
  }
}

type ActionFunction = typeof action;

export default function Addresses() {
  const {customer} = useOutletContext<AccountOutletContext>();
  const {defaultAddress, addresses} = customer;

  return (
    <div className="account-addresses">
      <h2>Addresses</h2>
      <br />
      {!addresses.nodes.length ? (
        <p>You have no addresses saved.</p>
      ) : (
        <div>
          <div>
            <legend>Create address</legend>
            <NewAddressForm />
          </div>
          <br />
          <hr />
          <br />
          <ExistingAddresses
            addresses={addresses}
            defaultAddress={defaultAddress}
          />
        </div>
      )}
    </div>
  );
}

function NewAddressForm() {
  const newAddress: AddressFormValues = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    countryCode: null,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  };

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
    >
      {({stateForMethod}) => (
        <div>
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
          >
            {stateForMethod('POST') !== 'idle' ? 'Creating' : 'Create'}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

function ExistingAddresses({
  addresses,
  defaultAddress,
}: Pick<AccountCustomer, 'addresses' | 'defaultAddress'>) {
  return (
    <div>
      <legend>Existing addresses</legend>
      {addresses.nodes.map((address) => (
        <AddressForm
          key={address.id}
          addressId={address.id}
          address={address}
          defaultAddress={defaultAddress}
        >
          {({stateForMethod}) => (
            <div>
              <button
                disabled={stateForMethod('PUT') !== 'idle'}
                formMethod="PUT"
                type="submit"
              >
                {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Save'}
              </button>
              <button
                disabled={stateForMethod('DELETE') !== 'idle'}
                formMethod="DELETE"
                type="submit"
              >
                {stateForMethod('DELETE') !== 'idle' ? 'Deleting' : 'Delete'}
              </button>
            </div>
          )}
        </AddressForm>
      ))}
    </div>
  );
}

export function AddressForm({
  addressId,
  address,
  defaultAddress,
  children,
}: {
  addressId: string;
  address: AddressFormValues;
  defaultAddress: {id: string} | null | undefined;
  children: (props: {
    stateForMethod: (
      method: 'PUT' | 'POST' | 'DELETE',
    ) => ReturnType<typeof useNavigation>['state'];
  }) => ReactNode;
}) {
  const {state, formMethod} = useNavigation();
  const action = useActionData<ActionFunction>();
  const error =
    action?.error && typeof action.error === 'object'
      ? action.error[addressId]
      : undefined;
  const isDefaultAddress = defaultAddress?.id === addressId;
  return (
    <Form id={addressId}>
      <fieldset>
        <input type="hidden" name="addressId" defaultValue={addressId} />
        <label htmlFor="firstName">First name*</label>
        <input
          aria-label="First name"
          autoComplete="given-name"
          defaultValue={address?.firstName ?? ''}
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          type="text"
        />
        <label htmlFor="lastName">Last name*</label>
        <input
          aria-label="Last name"
          autoComplete="family-name"
          defaultValue={address?.lastName ?? ''}
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          type="text"
        />
        <label htmlFor="company">Company</label>
        <input
          aria-label="Company"
          autoComplete="organization"
          defaultValue={address?.company ?? ''}
          id="company"
          name="company"
          placeholder="Company"
          type="text"
        />
        <label htmlFor="address1">Address line*</label>
        <input
          aria-label="Address line 1"
          autoComplete="address-line1"
          defaultValue={address?.address1 ?? ''}
          id="address1"
          name="address1"
          placeholder="Address line 1*"
          required
          type="text"
        />
        <label htmlFor="address2">Address line 2</label>
        <input
          aria-label="Address line 2"
          autoComplete="address-line2"
          defaultValue={address?.address2 ?? ''}
          id="address2"
          name="address2"
          placeholder="Address line 2"
          type="text"
        />
        <label htmlFor="city">City*</label>
        <input
          aria-label="City"
          autoComplete="address-level2"
          defaultValue={address?.city ?? ''}
          id="city"
          name="city"
          placeholder="City"
          required
          type="text"
        />
        <label htmlFor="zoneCode">State / Province*</label>
        <input
          aria-label="State/Province"
          autoComplete="address-level1"
          defaultValue={address?.zoneCode ?? ''}
          id="zoneCode"
          name="zoneCode"
          placeholder="State / Province"
          required
          type="text"
        />
        <label htmlFor="zip">Zip / Postal Code*</label>
        <input
          aria-label="Zip"
          autoComplete="postal-code"
          defaultValue={address?.zip ?? ''}
          id="zip"
          name="zip"
          placeholder="Zip / Postal Code"
          required
          type="text"
        />
        <label htmlFor="countryCode">Country Code*</label>
        <input
          aria-label="countryCode"
          autoComplete="country"
          defaultValue={address?.countryCode ?? ''}
          id="countryCode"
          name="countryCode"
          placeholder="Country"
          required
          type="text"
          maxLength={2}
        />
        <label htmlFor="phoneNumber">Phone</label>
        <input
          aria-label="Phone Number"
          autoComplete="tel"
          defaultValue={address?.phoneNumber ?? ''}
          id="phoneNumber"
          name="phoneNumber"
          placeholder="+16135551111"
          pattern="^\+?[1-9]\d{3,14}$"
          type="tel"
        />
        <div>
          <input
            defaultChecked={isDefaultAddress}
            id="defaultAddress"
            name="defaultAddress"
            type="checkbox"
          />
          <label htmlFor="defaultAddress">Set as default address</label>
        </div>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        {children({
          stateForMethod: (method) => (formMethod === method ? state : 'idle'),
        })}
      </fieldset>
    </Form>
  );
}
