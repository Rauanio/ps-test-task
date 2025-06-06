import { ApolloProvider } from '@apollo/client';
import { client } from '@/shared/api/apollo-client';

// Обертка над провайдерами
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
