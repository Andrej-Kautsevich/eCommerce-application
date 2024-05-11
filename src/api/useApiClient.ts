import { useContext } from 'react';
import { ApiClientContext } from './ApiClientProvider';

const useApiClient = () => {
  const context = useContext(ApiClientContext);
  if (context === undefined) {
    throw new Error('useApiClient must be used within a ApiClientProvider');
  }
  return context;
};

export default useApiClient;
