import {
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Input,
  HStack,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface CrudServicesProps {
  salonId: string;
}

enum ServiceAction {
  ADD_SERVICE = "addService",
  UPDATE_SERVICE = "updateService",
  DELETE_SERVICE = "deleteService",
}

const CrudServices: React.FC<CrudServicesProps> = (props) => {
  const [activeButton, setActiveButton] = useState("");
  const { isOpen, onToggle } = useDisclosure();

  const handleActiveButton = (item: string) => {
    console.log("clicked");
    setActiveButton(item);
    onToggle();
  };

  return (
    <Box
      w={{ base: "350px", sm: "900px" }}
      mt={10}
      p={3}
      pb={0}
      bg={"primary"}
      boxShadow="lg"
      borderRadius="md"
    >
      <Flex
        justify={"space-around"}
        borderBottom="0px"
        borderColor="gray.200"
        pb={3}
        mb={5}
      >
        <Button
          color={
            activeButton === ServiceAction.ADD_SERVICE ? "accent.400" : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.ADD_SERVICE);
          }}
        >
          Add service
        </Button>
        <Button
          color={
            activeButton === ServiceAction.UPDATE_SERVICE
              ? "accent.400"
              : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.UPDATE_SERVICE);
          }}
        >
          Update service
        </Button>
        <Button
          color={
            activeButton === ServiceAction.DELETE_SERVICE
              ? "accent.400"
              : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.DELETE_SERVICE);
          }}
        >
          Delete service
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {activeButton === ServiceAction.ADD_SERVICE && (
          <Flex wrap={"wrap"} align="center" direction="column">
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Name:
              </Text>
              <Input placeholder="Enter service name" bg={"white"} flex="1" />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                No. of staff:
              </Text>
              <Input
                placeholder="Enter number of staff"
                bg={"white"}
                flex="1"
              />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Price:
              </Text>
              <Input placeholder="Enter price" bg={"white"} flex="1" />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Time Period:
              </Text>
              <Input placeholder="Enter time period" bg={"white"} flex="1" />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Service for (Gender):
              </Text>
              <Input placeholder="Enter gender" bg={"white"} flex="1" />
            </HStack>
            <Button
              colorScheme="teal"
              size="lg"
              mt={5}
              color={"accent.500"}
              variant={"outline"}
              mb={5}
            >
              Submit
            </Button>
          </Flex>
        )}
      </Collapse>
    </Box>
  );
};

export default CrudServices;
