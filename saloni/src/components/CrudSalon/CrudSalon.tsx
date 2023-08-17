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
  import {City} from '../../global'
import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";

export interface CrudSalonProps{
    userId:string
    salonDetails:SalonDetails | null
} 

export interface SalonDetails{
    id:string
    address:string,
    banner:string[],
    city_id:string,
    contact_number:string,
    description:string,
    gender:string,
    name:string
}
enum ServiceAction {
    SALON_DETAILS="salonDetails",
    ADD_DETAILS = "addDetails",
    UPDATE_DETAILS = "updateDetails",
  }
  
const CrudSalon:React.FC<CrudSalonProps> = ({salonDetails}) => {

    const [activeButton, setActiveButton] = useState("");
    // const [salonDetails, setSalonDetails] = useState<SalonDetails | null>(null)
    const { isOpen, onToggle } = useDisclosure();
     const [salonImage, setSalonImage] = useState<File | null>(null);
     const user = useAppSelector(state=>state.user)
     const [cities, setCities] = useState<City[]>([])
     const [salonName, setSalonName] = useState<string>("");
const [description, setDescription] = useState<string>("");
const [contactNumber, setContactNumber] = useState<string>("");
const [gender, setGender] = useState<string>("");
const [address, setAddress] = useState<string>("");
const [imageUrl, setImageUrl] = useState<string>("");
  
    const handleActiveButton = (item: string) => {
      setActiveButton(item);
      onToggle();
    };
    
    const handleSubmitDetails = async()=>{
        const data = new FormData();
        if (salonImage) {
            data.append('file', salonImage);
        }
        data.append('upload_preset','kqcnemr7')
        data.append('cloud_name','coorgly')
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/coorgly/image/upload', data);
            setImageUrl(res.data.url);
          } catch (err:any) {
            console.error("Error uploading the image:", err.response ? err.response.data : err.message);
          }

    }
    useEffect(() => {
        if (salonDetails) {
            setSalonName(salonDetails.name);
            setDescription(salonDetails.description);
            setContactNumber(salonDetails.contact_number);
            setGender(salonDetails.gender);
            setAddress(salonDetails.address);
            setImageUrl(salonDetails.banner[0])
        }
    }, [salonDetails]);
    
    useEffect(() => {
        if (imageUrl && activeButton==ServiceAction.ADD_DETAILS) {
            submitDetails();
        }
    }, [imageUrl]);
    
    const submitDetails=()=>{
        const city= cities.filter((item)=>item.name===user.GeoAddress.city)[0]

        const headers = {
            'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
            'Content-Type': 'application/json',
        };

        const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_ADD_SALON}`
        const payload={
            "name": salonName,
            "treatment_tags": ["c96de68f-8e9f-4c2f-8a89-86719a7b73be",
          "3921a8d0-dfb0-4f6b-b3ab-d1a2a6b0a54e"],
            "address": address,
            "description": description,
            "contact_number": contactNumber,
            "gender": gender,
            "open_untill": "21:00:00",
            "location": {
              "type": "Point",
              "coordinates": [city.lat, city.lon]
            },
            "open_from": "09:00:00",
            "temp_inactive": 0,
            "banner": [imageUrl],
            "kyc_completed": 1,
            "is_active": 1,
            "city_id": city.id,
            "user_id": user.userId
          }

          axios.post(apiEndpoint,payload,{headers})
          .then((res)=>{
            console.log(res)
            alert('Added Salon Details succesfully')
            window.location.reload();
          })
          .catch((err)=>[
            console.log(err)
          ])
        console.log(apiEndpoint,payload)

    }
    useEffect(()=>{
       
        const apiEndpoint2= `https://res.cloudinary.com/coorgly/raw/upload/v1692012905/cities_ce3y9s.json`
        axios.get(apiEndpoint2)
        .then((res)=>{
            setCities(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    const handleUpdateDetails =()=>{
        console.log(salonName,address,gender,description,contactNumber,imageUrl)
        const city= cities.filter((item)=>item.name===user.GeoAddress.city)[0]

        const headers = {
            'Authorization': `Bearer ${user.token}`,  // Bearer is a common convention, but your backend might expect something different.
            'Content-Type': 'application/json',
        };

        const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_UPDATE_SALON}`
        const payload={
            "name": salonName,
            "treatment_tags": ["c96de68f-8e9f-4c2f-8a89-86719a7b73be",
          "3921a8d0-dfb0-4f6b-b3ab-d1a2a6b0a54e"],
            "address": address,
            "description": description,
            "contact_number": contactNumber,
            "gender": gender,
            "open_untill": "21:00:00",
            "location": {
              "type": "Point",
              "coordinates": [city.lat, city.lon]
            },
            "open_from": "09:00:00",
            "temp_inactive": 0,
            "banner": [imageUrl],
            "kyc_completed": 1,
            "is_active": 1,
            "city_id": city.id,
            "user_id": user.userId
          }

          axios.put(apiEndpoint,payload,{headers})
          .then((res)=>{
            console.log(res)
            alert('updated succesfully')
            window.location.reload();
          })
          .catch((err)=>[
            console.log(err)
          ])
        console.log(apiEndpoint,payload)


    }
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
        {salonDetails==null && <Button
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
        }
        {salonDetails!=null &&
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
        }
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {activeButton === ServiceAction.ADD_DETAILS && (
          <Flex wrap={"wrap"} align="flex-start" p={{base:0,sm:10}} pt={0} direction={{base:"column",sm:"row"}}>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Salon Name:
              </Text>
              <Input placeholder="Enter salon name" onChange={(e) => setSalonName(e.target.value)} bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Description:
              </Text>
              <Input placeholder="Description" onChange={(e) => setDescription(e.target.value)} bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Contact Number:
              </Text>
              <Input placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Service for (Gender):
              </Text>
              <Input placeholder="Enter gender" onChange={(e) => setGender(e.target.value)} bg={"white"} flex="1" />
            </HStack>
            <HStack m={3} w={'100%'} spacing={4} mb={4}>
              <Text fontWeight={600} color={"white"}>
                Address:
              </Text>
              <Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
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
          <Text color={'white'}fontSize={13} > We have detected your city location as &quot;{user.GeoAddress.city}&quot; This city name will be your default city address for salon </Text>

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
            <Text color={'accent.500'}fontSize={13} >Note : Currently we are serving only 4 cities Mumbai, Bengaluru, Delhi & Mysore</Text>
          </Flex>

        )}
        {activeButton === ServiceAction.SALON_DETAILS && (

            <Flex wrap={'wrap'} direction={'column'} justifyContent={'center'} alignItems={'start'} pl={{base:0,sm:20}} pb={{base:0,sm:10}}>

             <Text fontSize={19} color={'white'}>Name: {salonDetails?.name}</Text>
             <Text fontSize={19} color={'white'}>Description: {salonDetails?.description}</Text>
             <Text fontSize={19} color={'white'}>Contact: {salonDetails?.contact_number}</Text>
             <Text fontSize={19} color={'white'}>Gender: {salonDetails?.gender}</Text>
             <Text fontSize={19} color={'white'}>Address: {salonDetails?.address}</Text>
             <Text fontSize={19} color={'white'}>City: {cities.filter((item) => item.id === salonDetails?.city_id)[0]?.name}</Text>

            </Flex>
            


        )}
        {activeButton===ServiceAction.UPDATE_DETAILS && (
  <Flex wrap={"wrap"} align="flex-start" p={{base:0,sm:10}} pt={0} direction={{base:"column",sm:"row"}}>
    <HStack m={3} spacing={4} mb={4}>
      <Text fontWeight={600} color={"white"}>
        Salon Name:
      </Text>
      <Input
        value={salonName || salonDetails?.name || ""}
        onChange={(e) => setSalonName(e.target.value)}
        bg={"white"}
        flex="1"
      />
    </HStack>
    <HStack m={3} spacing={4} mb={4}>
      <Text fontWeight={600} color={"white"}>
        Description:
      </Text>
      <Input
        value={description|| salonDetails?.description || ""}
        onChange={(e) => setDescription(e.target.value)}
        bg={"white"}
        flex="1"
      />
    </HStack>
    <HStack m={3} spacing={4} mb={4}>
      <Text fontWeight={600} color={"white"}>
        Contact Number:
      </Text>
      <Input
        value={contactNumber|| salonDetails?.contact_number || ""}
        onChange={(e) => setContactNumber(e.target.value)}
        bg={"white"}
        flex="1"
      />
    </HStack>
    <HStack m={3} spacing={4} mb={4}>
      <Text fontWeight={600} color={"white"}>
        Service for (Gender):
      </Text>
      <Input
        value={gender|| salonDetails?.gender || ""}
        onChange={(e) => setGender(e.target.value)}
        bg={"white"}
        flex="1"
      />
    </HStack>
    <HStack m={3} w={'100%'} spacing={4} mb={4}>
      <Text fontWeight={600} color={"white"}>
        Address:
      </Text>
      <Input
        value={address|| salonDetails?.address || ""}
        onChange={(e) => setAddress(e.target.value)}
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
        accept="image/*"
        variant={'filled'}
        w={'100%'}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setSalonImage(e.target.files[0]);
          }
        }}
      />
    </HStack>
    <Text color={'white'}fontSize={13}> 
      We have detected your city location as &quot;{user.GeoAddress.city}&quot; This city name will be your default city address for salon 
    </Text>
    <Button
      colorScheme="teal"
      size="lg"
      ml={{base:0,sm:5}}
      color={"accent.500"}
      variant={"outline"}
      mb={5}
      onClick={handleUpdateDetails}
    >
      Update
    </Button>
    <Text color={'accent.500'}fontSize={13}>
      Note: Currently we are serving only 4 cities Mumbai, Bengaluru, Delhi & Mysore
    </Text>
  </Flex>
)}

      </Collapse>
    </Box>
  </>
}

export default CrudSalon
