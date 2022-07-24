import React from "react";
import { Flex, Box } from "@chakra-ui/react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../reducers/authSlice";
import ConversationContainer from "./CoversationContainer";
import { BiLogOutCircle } from "react-icons/bi";
import InputBar from "./InputBar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/authSlice";
// import {fetchResponses} from '../../reducers/speechSplice'
const Index = () => {
  const dispatch = useDispatch();
  const responses = useSelector((state: any) => state.speech.responses);

  return (
    <>
      <Flex
        flexDir="column"
        fontFamily="body"
        h={["87vh", "83vh"]}
        overflow="auto"
        pos="relative"
      >
        <Box
          shadow="md"
          zIndex={99999}
          pos="absolute"
          top="3"
          bg={"white"}
          right="3"
          p="3"
          rounded="full"
          onClick={() => dispatch(logout(null)) }
        >
          <BiLogOutCircle size={22} />
          {/* <BiVolumeMute size={22} /> */}
        </Box>
        <ConversationContainer conversations={responses} />
        <InputBar />
      </Flex>
    </>
  );
};

export default Index;
