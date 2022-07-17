import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../reducers/authSlice";
import ConversationContainer from "./CoversationContainer";
import { BiVolumeMute } from "react-icons/bi";
import InputBar from "./InputBar";
import {useSelector, useDispatch} from 'react-redux'
import {fetchResponses} from '../../reducers/speechSplice'
const Index = () => {
  // const dispatch = useDispatch();
  const [speak, setSpeak] = useState(false);
  const responses = useSelector((state: any) => state.speech.responses)

  return (
    <>
      <Flex
        flexDir="column"
        fontFamily="body"
        h="83vh"
        overflow="auto"
        pos="relative"
      >
        <Box
          shadow="md"
          zIndex={99999}
          pos="absolute"
          top="3"
          color={speak ? "white" : "black"}
          right="3"
          p="3"
          rounded="full"
          bg={speak ? "#5e70b0" : "white"}
          onClick={() => setSpeak(() => !speak)}
        >
          <BiVolumeMute size={22} />
        </Box>
        <ConversationContainer
          conversations={
            responses  
        }
        />
        <InputBar />
      </Flex>
    </>
  );
};

export default Index;
