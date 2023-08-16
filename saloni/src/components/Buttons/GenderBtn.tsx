import React from 'react';
import { Button } from '@chakra-ui/react';

interface GenderBtnProps {
  color?: string;
  variant?: string;
  mt?: string | number;
  ml?: string | number;
  size?: string;
  children: React.ReactNode;
}

const GenderBtn: React.FC<GenderBtnProps> = ({
  color = 'accent.100',
  variant = 'outline',
  mt = '7px',
  ml = ['10px', '18px'],
  size = { base: 'xs', sm: 'sm' },
  children,
}) => {
  return (
    <Button
      color={color}
      colorScheme=""
      variant={variant}
      mt={mt}
      ml={ml}
      size={size}
    >
      {children}
    </Button>
  );
};

export default GenderBtn;
