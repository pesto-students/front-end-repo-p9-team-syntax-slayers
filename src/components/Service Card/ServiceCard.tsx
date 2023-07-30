import {
  Heading,
  Card,
  CardBody,
  Text,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { GrAddCircle } from "react-icons/gr";
import React from "react";

interface ServiceCardProps {
  serviceName: String;
  duration: string;
  price: string;
  gender: string;
}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {

  //Destructuring props
  const { serviceName, duration, price, gender } = props;

  return (
    <>
      <Box margin={"10px"}>
        <Card
          key={""}
          size={"sm"}
          maxW={"500px"}
          maxH={"100px"}
          variant={"outline" }
          borderRadius={"15px"}
          boxShadow={"xs" }
        >
          <CardBody pl={"20px"} pr={"40px"}>
            <HStack justifyContent={"space-between"}>
              <VStack justifyContent={"center"} alignItems={"flex-start"}>
                <HStack>
                  <Heading size="sm"> {serviceName}</Heading>
                  <Text fontSize={"xs"}>({gender})</Text>
                </HStack>

                <Text fontSize={"sm"}>Duration :{duration}m</Text>
                <Text fontSize={"sm"}>Rs.{price}</Text>
              </VStack>
              <GrAddCircle size={"30px"} style={{ opacity: 0.8 }} />
            </HStack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default ServiceCard;
