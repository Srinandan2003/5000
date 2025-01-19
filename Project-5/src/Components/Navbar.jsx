import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex bg="#71BC78" p={4} justify="space-between" color="white">
      <Box>
        <Link to="/">
          <Button colorScheme="#71BC78" color = "white" variant="outline" mr={2}>
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button colorScheme="#71BC78" variant="outline">
            Signup
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
