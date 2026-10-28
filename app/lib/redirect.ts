import {redirect} from 'react-router';

type LocalizedResource = {
  handle: string;
  data: {handle: string};
};

/**
 * The Storefront API resolves localized handles, so redirect to the handle the API returned
 * when it differs from the one in the URL.
 */
export function redirectIfHandleIsLocalized(
  request: Request,
  ...localizedResources: Array<LocalizedResource>
) {
  const url = new URL(request.url);
  let shouldRedirect = false;

  localizedResources.forEach(({handle, data}) => {
    if (handle !== data.handle) {
      url.pathname = url.pathname.replace(handle, data.handle);
      shouldRedirect = true;
    }
  });

  if (shouldRedirect) {
    throw redirect(url.toString());
  }
}
