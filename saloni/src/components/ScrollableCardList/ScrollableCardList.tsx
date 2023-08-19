import React, { useState, useRef, useEffect } from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface ScrollableCardListProps {
  children: React.ReactNode;
}

const ScrollableCardList: React.FC<ScrollableCardListProps> = ({
  children,
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setIsScrollable(
        scrollContainerRef.current.scrollWidth >
          scrollContainerRef.current.clientWidth,
      );
    }
  }, []);

  const handleScroll = (scrollDirection: 'left' | 'right'): void => {
    const container = scrollContainerRef.current!;
    const scrollAmount = 500;

    if (scrollDirection === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    setScrollPosition(container.scrollLeft);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
    e.preventDefault(); // Prevent default scroll behavior
  };

  return (
    <Box position="relative">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={() => handleScroll('left')}
        isDisabled={scrollPosition === 0}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        aria-label="Scroll Left"
      />
      <Box
        ref={scrollContainerRef}
        overflowX="auto"
        whiteSpace="nowrap"
        pl="6" // To avoid overlapping with the left arrow
        pr="8" // To provide space for the right arrow
        onWheel={handleWheel} // Prevent default scroll behavior
      >
        <HStack spacing={4}>{children}</HStack>
      </Box>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={() => handleScroll('right')}
        isDisabled={
          !isScrollable ||
          scrollPosition >=
            scrollContainerRef.current?.scrollWidth! -
              scrollContainerRef.current?.clientWidth!
        }
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        aria-label="Scroll Right"
      />
    </Box>
  );
};

export default ScrollableCardList;
