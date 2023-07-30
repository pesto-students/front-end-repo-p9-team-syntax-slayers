import { Box, Link, VStack, HStack, Divider, Text, Icon } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box as="footer" mt={10} py={6} bg="primary" color={'grey'}>
      <VStack spacing={3} align="center">
        <HStack spacing={{base:7,md:9}}>
          <Link href="/terms" fontSize={{base:10, md:14}}>Terms and Conditions</Link>
          <Link href="/faq" fontSize={{base:10, md:14}}>FAQ</Link>
          <Link href="/privacy" fontSize={{base:10, md:14}}>Privacy Policy</Link>
          <Link href="/contact" fontSize={{base:10, md:14}}>Contact Us</Link>
          <Link href="/sitemap" fontSize={{base:10, md:14}}>Sitemap</Link>
        </HStack>
        <Divider color={'grey'} width={'70%'}/>
        <Text fontSize={{base:10, md:14}}>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</Text>
      </VStack>
    </Box>
  );
}

export default Footer;
