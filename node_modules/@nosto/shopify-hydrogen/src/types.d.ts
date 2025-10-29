declare module '@shopify/hydrogen' {
  export function parseGid(gid: string): { id: string };
}

declare module 'crypto-es' {
  const crypto: {
    SHA256: (input: string) => {
      toString(): string;
    };
  };
  export default crypto;
}
