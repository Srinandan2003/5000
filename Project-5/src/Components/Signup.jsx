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
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!usernameRegex.test(username)) {
      alert("Invalid username.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter exactly 10 digits.");
      return;
    }

    const signupData = { username, email, phone };
    localStorage.setItem("signupData", JSON.stringify(signupData));
    alert("Signed up successfully!");
    navigate("/");
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
          Signup
        </Heading>
        <VStack spacing="4" mx="auto" width="80%">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
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
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}  mb="4" 
            />
          </FormControl>
          <Button
            bg="#71BC78"
            color="white"
            _hover={{ bg: "#5ca963" }}
            border="1px solid white"
            borderRadius="xl"  // Increased border radius
            width="200px"
            onClick={handleSignup}
          >
            Signup
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

export default Signup;
