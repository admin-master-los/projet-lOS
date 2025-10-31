import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

/**
 * Configuration de React Query pour l'application admin
 * Gère le cache, les refetch automatiques et les mutations
 */

// Configuration du QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch automatique après 5 minutes
      staleTime: 1000 * 60 * 5,
      // Garder les données en cache pendant 10 minutes
      gcTime: 1000 * 60 * 10,
      // Retry 1 fois en cas d'erreur
      retry: 1,
      // Refetch on window focus
      refetchOnWindowFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry 0 fois pour les mutations
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Provider React Query à wrapper autour de l'app admin
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools uniquement en développement */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export { queryClient };
