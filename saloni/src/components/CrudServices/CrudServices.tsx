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
  Select
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";

interface CrudServicesProps {
  salonId: string | undefined;
}

interface SalonService{
description:string
duration:number
featured:boolean
id:string
name:string
price:number
salon_id:string
}

enum ServiceAction {
  ADD_SERVICE = "addService",
  UPDATE_SERVICE = "updateService",
  DELETE_SERVICE = "deleteService",
}

const CrudServices: React.FC<CrudServicesProps> = ({salonId}) => {
  const [activeButton, setActiveButton] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const [serviceName, setServiceName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const user = useAppSelector(state=>state.user)
  const [allServices, setAllServices] = useState<SalonService[]>([])
  const [selectToUpdate, setSelectToUpdate] = useState<SalonService | null>(null)

  const handleActiveButton = (item: string) => {
    console.log("clicked");
    setActiveButton(item);
    onToggle();
  };


  const handleSubmit = () => {
    console.log({
      serviceName, 
      description, 
      price, 
      timePeriod, 
      salonId
      
    });
     
    const headers = {
      'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
      'Content-Type': 'application/json',
    };

    const payload={
      "name": serviceName,
      "description": description,
      "price": price,
      "duration": timePeriod,
      "featured": 1,
      "salon_id": salonId,
      "treatment_tags": ["c96de68f-8e9f-4c2f-8a89-86719a7b73be"]
    }
    const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_ADD_SERVICE}`
    axios.post(apiEndpoint,payload,{headers})
    .then((res)=>{
      console.log(res)
      alert("Service added")
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  const handleUpdate = ()=> {
     
    console.log({
      serviceName, 
      description, 
      price, 
      timePeriod, 
      salonId
      
    });

    const headers = {
      'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
      'Content-Type': 'application/json',
    };

    const payload={
      "name": serviceName,
      "description": description,
      "price": price,
      "duration": timePeriod,
      "featured": 1,
      "salon_id": salonId,
      "treatment_tags": ["c96de68f-8e9f-4c2f-8a89-86719a7b73be"]
    }

    const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_UPDATE_SERVICE}`
    axios.put(apiEndpoint,payload,{headers})
    .then((res)=>{
      console.log(res)
      alert("Service added")
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log(apiEndpoint,payload)
  }

  useEffect(()=>{
    
    const apiEndpoint=`${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_GET_SALON_SERVICES}${salonId}`
    axios.get(apiEndpoint)
    .then((res)=>{
      console.log(res.data.data)
      setAllServices(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[salonId])

  const openService = (e:any)=>{
    console.log('openn',e.target.value)
    const service = allServices.filter((item)=>item.id==e.target.value)[0]
    console.log(service)
    setSelectToUpdate(service)

    setServiceName(service.name);
    setDescription(service.description);
    setPrice(service.price.toString());  // Assuming `price` is stored as a number, convert to string
    setTimePeriod(service.duration.toString());
  }
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
              <Input placeholder="Enter service name" onChange={(e) => setServiceName(e.target.value)} bg={"white"} flex="1" />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Description:
              </Text>
              <Input
                placeholder="Enter Description"
                bg={"white"}
                flex="1"
                onChange={(e) => setDescription(e.target.value)}
              />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Price:
              </Text>
              <Input placeholder="Enter price" bg={"white"} onChange={(e) => setPrice(e.target.value)} flex="1" />
            </HStack>
            <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Time Period in (minutes):
              </Text>
              <Input placeholder="Enter time period" onChange={(e) => setTimePeriod(e.target.value)}  bg={"white"} flex="1" />
            </HStack>
            {/* <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Service for (Gender):
              </Text>
              <Input placeholder="Enter gender" onChange={(e) => setIsFeatured(!isFeatured)} bg={"white"} flex="1" />
            </HStack> */}
            <Button
              colorScheme="teal"
              size="lg"
              mt={5}
              color={"accent.500"}
              variant={"outline"}
              mb={5}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        )}
        {activeButton===ServiceAction.UPDATE_SERVICE &&(
          <>
          <Select placeholder='Select option' bg={'white'} width={'50%'} m={4} onChange={(e) => openService(e)}>
            {allServices.map((item,index)=>{
              return   <option key={index} value={item.id}>{item.name} </option>
            })}

        </Select>


          {selectToUpdate!=null && (
            <Flex wrap={"wrap"} align="center" direction="column">
              <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
                <Text fontWeight={600} color={"white"}>
                  Name:
                </Text>
                <Input placeholder="Enter service name" value={serviceName || selectToUpdate?.name} onChange={(e) => setServiceName(e.target.value)} bg={"white"} flex="1" />
              </HStack>
              <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
                <Text fontWeight={600} color={"white"}>
                  Description:
                </Text>
                <Input
                  placeholder="Enter Description"
                  bg={"white"}
                  flex="1"
                  value={description || selectToUpdate?.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </HStack>
              <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
                <Text fontWeight={600} color={"white"}>
                  Price:
                </Text>
                <Input placeholder="Enter price" bg={"white"} value={price || selectToUpdate?.price} onChange={(e) => setPrice(e.target.value)} flex="1" />
              </HStack>
              <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
                <Text fontWeight={600} color={"white"}>
                  Time Period in (minutes):
                </Text>
                <Input placeholder="Enter time period" value={timePeriod || selectToUpdate?.duration} onChange={(e) => setTimePeriod(e.target.value)}  bg={"white"} flex="1" />
              </HStack>
              {/* <HStack w={{ base: "100%", sm: "90%" }} spacing={4} mb={4}>
                <Text fontWeight={600} color={"white"}>
                  Service for (Gender):
                </Text>
                <Input placeholder="Enter gender" onChange={(e) => setIsFeatured(!isFeatured)} bg={"white"} flex="1" />
              </HStack> */}
              <Button
                colorScheme="teal"
                size="lg"
                mt={5}
                color={"accent.500"}
                variant={"outline"}
                mb={5}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Flex>
          )}


         </>
        )}

      </Collapse>
    </Box>
  );
};

export default CrudServices;
