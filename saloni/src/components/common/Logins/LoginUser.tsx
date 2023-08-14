import { Button, Flex, Text, Image, Input, Box, Link } from "@chakra-ui/react";
import axios from "axios";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/index";
import {useNavigate} from "react-router-dom"

interface LoginUserProps {
  handleSuccessfulLoginUser: () => void; // The function type
}

const LoginUser: React.FC<LoginUserProps> = ({ handleSuccessfulLoginUser }) => {
  const [loginUser, setLoginUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const toggleMode = () => {
    setLoginUser(!loginUser);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (loginUser) {
      // Perform login logic
      setIsLoading(true)
      const apiEndpoint = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_LOGIN_USER}`;
      console.log(apiEndpoint, email, password);
      axios
        .post(apiEndpoint, { email, password })
        .then((res) => {
          console.log(res);
          setError(false);
          localStorage.setItem("token", res.data.data.token);
          handleSuccessfulLoginUser();
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setIsLoading(false)
          console.log(err.response.data.message);
        });

      console.log("Logging in with", email, password);
    } else {
      // Perform signup logic
      setIsLoading(true)
      const payload = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        type: "user",
      };
      console.log(payload)
      const apiEndpoint2 = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_REGISTER_USER}`;
      console.log(apiEndpoint2, email, password, firstName, lastName);
      axios
        .post(apiEndpoint2, payload)

        .then((res) => {
          console.log(res);
          setError(false);
          setLoginUser(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setIsLoading(false)
          console.log(err.response.data.message);
        });

      console.log("Signing up with", firstName, lastName, email, password);
    }
  };

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      h={{ base: "300px", sm: "400px" }}
      borderRadius={10}
    >
      <Flex
        w={{ base: "100%", sm: "30%" }}
        h={{ base: "230px", sm: "full" }}
        bg={"accent.500"}
        p={10}
        justifyContent={"center"}
        direction={"column"}
      >
        <Image
          src="/logo-white.png"
          alt="logo"
          h={{ base: "60px", sm: 90 }}
          w={{ base: 90, sm: 200 }}
        />
        <Text fontWeight={600} color={"white"} fontSize={25}>
          {" "}
          Welcome back
        </Text>
        <Text fontWeight={400} color={"white"} fontSize={10}>
          {loginUser ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Button
          variant="outline"
          color="white"
          size={{ base: "lg", sm: "lg" }}
          mt={2}
          onClick={toggleMode}
        >
          {loginUser ? "Signup" : "Login"}
        </Button>
      </Flex>

      <Flex
        w={{ base: "100%", sm: "70%" }}
        h={{ base: 700, sm: 400 }}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text fontWeight={700} fontSize={30} mt={{ base: 9, sm: 1 }} pt={4}>
            {loginUser ? "Login" : "Signup"}
          </Text>

          {!loginUser && (
            <>
              <Input
                mb={4}
                border={"1px"}
                borderColor={"white"}
                rounded={30}
                padding={2}
                placeholder={"First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                borderBottomColor={"black"}
                w={"80%"}
                variant={"unstyled"}
              />

              <Input
                mb={4}
                border={"1px"}
                borderColor={"white"}
                rounded={30}
                padding={2}
                placeholder={"Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                borderBottomColor={"black"}
                w={"80%"}
                variant={"unstyled"}
              />
            </>
          )}

          <Input
            mb={4}
            border={"1px"}
            borderColor={"white"}
            rounded={30}
            padding={2}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderBottomColor={"black"}
            w={"80%"}
            variant={"unstyled"}
          />

          <Input
            mb={4}
            border={"1px"}
            borderColor={"white"}
            type={"password"}
            rounded={30}
            padding={2}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderBottomColor={"black"}
            w={"80%"}
            variant={"unstyled"}
          />
          {error && (
            <Text fontSize={"xs"} color={"red"}>
              Incorrect password
            </Text>
          )}
          <Button
            isLoading={isLoading}
            type="submit"
            variant={"outline"}
            color={"accent.500"}
            colorScheme={"accent.500"}
            w={"70%"}
          >
            {loginUser ? "Login" : "Sign up"}
          </Button>
        </form>

        {loginUser ? (
          <Box w="80%" textAlign="right">
            <Link color={"red"}>Forgot Password?</Link>
          </Box>
        ) : (
          <Box w="80%" textAlign="center">
            <Text fontSize={"xs"}>
              By signing up, I agree to the{" "}
              <Link color={"red"}>Privacy Policy</Link> and the{" "}
              <Link color={"red"}>Terms of Services</Link>
            </Text>
          </Box>
        )}

        <Text fontSize={13} fontWeight={500}>
          Are you a partner?
        </Text>
        <Link fontSize={13} color={"accent.500"} pb={5}>
          Sign in as partner
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginUser;
