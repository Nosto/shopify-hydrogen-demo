import * as React from 'react';

export function ClientOnly({
  fallback = null,
  children,
}: {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  return ready ? <>{children}</> : <>{fallback}</>;
}

export function clientOnlyLazy<TProps = any>(
  loader: () => Promise<{ default: React.ComponentType<TProps> }>,
): React.ComponentType<TProps> {
  const Comp = React.lazy(loader);
  return function Wrapped(props: TProps) {
    return (
      <ClientOnly fallback={null}>
        <React.Suspense fallback={null}>
          <Comp {...(props as any)} />
        </React.Suspense>
      </ClientOnly>
    );
  };
}
