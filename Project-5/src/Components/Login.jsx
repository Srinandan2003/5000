import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!email || !username) {
      alert("Please fill out all fields.");
      return;
    }

    const loginData = { email, username };
    localStorage.setItem("loginData", JSON.stringify(loginData));
    alert(`Logged in with:\nEmail: ${email}\nUsername: ${username}`);
  };

  return (
    <Flex height="100vh" bg="gray.100">
      {/* Left Side: Form */}
      <Box
        width="50%"
        p="6"
        boxShadow="lg"
        bg="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h2" size="lg" textAlign="center" mb="6">
          Login
        </Heading>
        <VStack spacing="4" mx="auto" width="80%">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  mb="4" 
            />
          </FormControl>
          <Button
             bg="#71BC78"
             color="white"
             _hover={{ bg: "#5ca963" }}
             border="1px solid white"
             borderRadius="xl"  // Increased border radius
             width="200px"
             onClick={handleLogin}
          >
            Login
          </Button>
        </VStack>
      </Box>

      {/* Right Side: Image */}
      <Box width="50%">
        <Image
          src="/image/bgg.jpg"
          alt="Decorative Background"
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default Login;
