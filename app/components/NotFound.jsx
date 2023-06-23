import { Button } from './Button';
import { FeaturedSection } from './FeaturedSection';
import { PageHeader, Text } from './Text';

import { Nosto404, NostoPlacement } from "@nosto/shopify-hydrogen";

export function NotFound({ type = 'page' }) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <PageHeader heading={heading}>
        <Text width="narrow" as="p">
          {description}
        </Text>
        <Button width="auto" variant="secondary" to={'/'}>
          Take me to the home page
        </Button>
      </PageHeader>

      <NostoPlacement id="notfound-nosto-1" />
      <NostoPlacement id="notfound-nosto-2" />
      <Nosto404 />

      <FeaturedSection />
    </>
  );
}
