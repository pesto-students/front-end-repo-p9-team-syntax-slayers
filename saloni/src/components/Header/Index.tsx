import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

interface HeaderTextProps {
  text: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
  return (
    <Heading as="b" fontSize={'3xl'}>
      {text}
    </Heading>
  );
};

export default HeaderText;
