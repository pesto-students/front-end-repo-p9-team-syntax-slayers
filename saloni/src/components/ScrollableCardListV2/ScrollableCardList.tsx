import React, { useState } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, useAnimation } from 'framer-motion';

interface ScrollableCardProps {
  children: React.ReactNode[];
  cardWidth: string;
  visibleCards: number;
}

const MotionBox = motion(Box);

const ScrollableCard: React.FC<ScrollableCardProps> = ({
  children,
  cardWidth,
  visibleCards,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScrollPosition = Math.max(0, children.length - visibleCards);
  const controls = useAnimation();

  const handleScroll = async (scrollOffset: number) => {
    const newPosition = Math.max(
      0,
      Math.min(scrollPosition + scrollOffset, maxScrollPosition),
    );

    // Stop scrolling when reaching the end
    if (newPosition === scrollPosition) {
      return;
    }

    await setScrollPosition(newPosition);
    await controls.start({ x: -newPosition * (parseInt(cardWidth) + 8) });
  };

  const handleCardClick = (index: number) => {
    setScrollPosition(index);
    controls.start({ x: -index * (parseInt(cardWidth) + 8) });
  };

  return (
    <Box width="100%" position="relative">
      <Flex alignItems="center">
        {scrollPosition > 0 && (
          <ChevronLeftIcon
            onClick={() => handleScroll(-1)}
            position="absolute"
            left="10px"
            zIndex={1}
            cursor="pointer"
            boxSize={8} // Adjust the icon size as needed
          />
        )}

        <Box flex="1" overflow="hidden">
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'row',
              transition: 'transform 0.3s ease-out',
              transform: `translateX(-${
                scrollPosition * (parseInt(cardWidth) + 8)
              }px)`,
            }}
          >
            {React.Children.map(children, (child, index) => (
              <MotionBox
                width={cardWidth}
                onClick={() => handleCardClick(index)}
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={controls}
              >
                {child}
              </MotionBox>
            ))}
          </motion.div>
        </Box>
        {scrollPosition < maxScrollPosition && (
          <ChevronRightIcon
            onClick={() => handleScroll(1)}
            position="absolute"
            right="10px"
            zIndex={1}
            cursor="pointer"
            boxSize={8} // Adjust the icon size as needed
          />
        )}
      </Flex>
    </Box>
  );
};

export default ScrollableCard;
