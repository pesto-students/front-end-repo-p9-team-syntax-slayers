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
    Heading,
  } from "@chakra-ui/react";
import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";

interface CrudSalonProps{
    userId:string
} 

interface SalonDetails{
    address:string,
    banner:[],
    city_id:string,
    contact_number:string,
    description:string,
    gender:String,
    name:string
}
enum ServiceAction {
    SALON_DETAILS="salonDetails",
    ADD_DETAILS = "addDetails",
    UPDATE_DETAILS = "updateDetails",
  }
  
const CrudSalon:React.FC<CrudSalonProps> = () => {

    const [activeButton, setActiveButton] = useState("");
    const [salonDetails, setSalonDetails] = useState<SalonDetails | null>(null)
    const { isOpen, onToggle } = useDisclosure();
     const [salonImage, setSalonImage] = useState<File | null>(null);
     const user = useAppSelector(state=>state.user)
  
    const handleActiveButton = (item: string) => {
      console.log("clicked");
      setActiveButton(item);
      onToggle();
    };
    
    const handleSubmitDetails = ()=>{
        const data = new FormData();
        if (salonImage) {
            data.append('file', salonImage);
        }
        data.append('upload_preset','kqcnemr7')
        data.append('cloud_name','coorgly')

        axios.post('https://api.cloudinary.com/v1_1/coorgly/image/upload',data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    useEffect(()=>{
        const headers = {
            'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
            'Content-Type': 'application/json',
        };
        const apiEndpoint=`${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_GET_SALON_DETAILS_ADMIN}${user.userId}`
        console.log(apiEndpoint)
        axios.get(apiEndpoint,{headers})
        .then((res)=>{
            console.log(res.data.data[0])
            setSalonDetails(res.data.data[0])
        })
        .catch((err)=>{
           console.log(err)
        })
    },[])
  console.log(salonDetails)
  return <>
  
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
            activeButton === ServiceAction.SALON_DETAILS ? "accent.400" : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.SALON_DETAILS);
          }}
        >
          Salon Details
        </Button>
        <Button
          color={
            activeButton === ServiceAction.ADD_DETAILS
              ? "accent.400"
              : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.ADD_DETAILS);
          }}
        >
          Add Details
        </Button>
        <Button
          color={
            activeButton === ServiceAction.UPDATE_DETAILS
              ? "accent.400"
              : "white"
          }
          size={{ base: "sm", sm: "lg" }}
          variant={"unstyled"}
          onClick={() => {
            handleActiveButton(ServiceAction.UPDATE_DETAILS);
          }}
        >
          Update Details
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {activeButton === ServiceAction.ADD_DETAILS && (
          <Flex wrap={"wrap"} align="flex-start" p={{base:0,sm:10}} pt={0} direction={{base:"column",sm:"row"}}>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Salon Name:
              </Text>
              <Input placeholder="Enter salon name" bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Description:
              </Text>
              <Input placeholder="Description" bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Contact Number:
              </Text>
              <Input placeholder="Contact Number" bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Service for (Gender):
              </Text>
              <Input placeholder="Enter gender" bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} w={'100%'} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Address:
              </Text>
              <Input
                placeholder="Address"
                bg={"white"}
                flex="1"
              />
            </HStack>
            <HStack spacing={4} mb={4}>
            <Text fontWeight={600} color={"white"}>
              Salon Image:
            </Text>
            <Input
              type="file"
              accept="image/*" // restrict to image files
              variant={'filled'}
              w={'100%'}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                 setSalonImage(e.target.files[0]);
                console.log(e.target.files[0])
                }
              }}
            />
          </HStack>
            <Button
              colorScheme="teal"
              size="lg"
              ml={{base:0,sm:5}}
              color={"accent.500"}
              variant={"outline"}
              mb={5}
              onClick={handleSubmitDetails}
            >
              Submit
            </Button>
          </Flex>

        )}
        {activeButton === ServiceAction.SALON_DETAILS && (

            <Flex wrap={'wrap'} direction={'column'} justifyContent={'center'} alignItems={'start'} pl={{base:0,sm:20}} pb={{base:0,sm:10}}>

             <Text fontSize={19} color={'white'}>Name: {salonDetails?.name}</Text>
             <Text fontSize={19} color={'white'}>Description: {salonDetails?.description}</Text>
             <Text fontSize={19} color={'white'}>Contact: {salonDetails?.contact_number}</Text>
             <Text fontSize={19} color={'white'}>Gender: {salonDetails?.gender}</Text>
             <Text fontSize={19} color={'white'}>Address: {salonDetails?.address}</Text>

            </Flex>
            


        )}
      </Collapse>
    </Box>
  </>
}

export default CrudSalon
