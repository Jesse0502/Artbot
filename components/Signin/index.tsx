import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Signup from "./Signup";
import Login from "./Login";

const Signin = () => {
  const [login, setLogin] = useState(false);
  const handleChooseSignin = () => {
    setLogin(() => !login);
  };
  return (
    <Flex
      justify="center"
      flexDir="column"
      // bg="blackAlpha.300"
      h="full"
      w="full"
      color="black"
      alignItems="center"
    >
      <Flex
        flexDir="column"
        h={"max"}
        // shadow="md"
        bg="white"
        color="black"
        w={["90%", "96"]}
        rounded="lg"
        p="5"
      >
        {login ? (
          <Login handleChooseSignin={handleChooseSignin} />
        ) : (
          <Signup handleChooseSignin={handleChooseSignin} />
        )}
      </Flex>
    </Flex>
  );
};

export default Signin;
