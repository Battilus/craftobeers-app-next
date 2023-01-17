import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const BeerApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
  );
}

export default BeerApp;
