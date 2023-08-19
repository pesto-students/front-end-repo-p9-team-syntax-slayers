import React, { useState } from 'react';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface ScrollableCardProps {
  children: React.ReactNode[];
  cardWidth: string;
  visibleCards: number;
}

const ScrollableCard: React.FC<ScrollableCardProps> = ({
  children,
  cardWidth,
  visibleCards,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScrollPosition = children.length - visibleCards;

  const handleScroll = (scrollOffset: number) => {
    const newPosition = Math.max(
      0,
      Math.min(scrollPosition + scrollOffset, maxScrollPosition),
    );
    setScrollPosition(newPosition);
  };

  return (
    <Box width="100%">
      <Flex alignItems="center">
        <Button
          disabled={scrollPosition === 0}
          onClick={() => handleScroll(-1)}
          leftIcon={<ChevronLeftIcon />}
          w={'20px%'}
        />

        <Box flex="1" overflow="hidden">
          <Stack
            direction="row"
            spacing="2"
            transform={`translateX(-${
              scrollPosition * (parseInt(cardWidth) + 8)
            }px)`}
            transition="transform 0.3s ease-in-out"
          >
            {children}
          </Stack>
        </Box>
        <Button
          disabled={scrollPosition === maxScrollPosition}
          onClick={() => handleScroll(1)}
          rightIcon={<ChevronRightIcon />}
          w={'20px%'}
        />
      </Flex>
    </Box>
  );
};

export default ScrollableCard;
