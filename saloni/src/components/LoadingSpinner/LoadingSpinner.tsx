import { Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Spinner size="xl" color="accent.500" />
    </div>
  );
};

export default LoadingSpinner;
