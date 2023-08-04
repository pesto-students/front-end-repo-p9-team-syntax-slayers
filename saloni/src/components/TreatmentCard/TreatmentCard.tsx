import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface TreatmentCardProps {
  imageUrl: string;
  serviceName: String;
  desciption?: string;
}

const TreatmentCard: React.FC<TreatmentCardProps> = (props) => {
  //Destructuring props
  const { imageUrl, serviceName, desciption } = props;
  
  return (
    <>
      <Box
        as={Card}
        direction={"row"}
        maxW={"230px"}
        minW={"190px"}
        minH={"150px"}
        margin="9px"
        borderRadius={"10px"}
      >
        <Image
          objectFit="cover"
          maxW={"110px"}
          borderTopLeftRadius={{ base: "xl", sm: "xl" }}
          borderBottomLeftRadius={{ base: "xl", sm: "xl" }}
          src={imageUrl}
          alt="Caffe Latte"
        />

        <CardBody
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Box>
            <Heading size="xs">{serviceName}</Heading>
            <Text fontSize={"xs"} mt={"5px"}>
              {desciption}
            </Text>
          </Box>
        </CardBody>
      </Box>
    </>
  );
};

export default TreatmentCard;
