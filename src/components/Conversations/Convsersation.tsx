import React from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";
// import { FaRobot } from "react-icons/fa";
import logo from "../../assets/logo.png";
// import { BsDot } from "react-icons/bs";

// interface responseInterface {}

// interface convTypes {
//   _id: string;
//   response: string;
//   query: string;
//   response_time: Date;
//   recieve_time: Date;
// }
const Conversation = (props: any) => {
  const conv: any = props.conv;
  // const idx: number = props.key;
  // const length: number = props.length

  return (
    <Flex flexDir="column-reverse" h="full" mx="5" my="4">
      {conv.response && (
        <Flex mt="7">
          <Avatar src={logo} size="sm" />
          <Flex w="60%" justify="start" flexDir="column">
            <Flex alignItems="center">
              <Text ml="3" fontWeight="bold" fontSize={20}>
                Artbot
              </Text>
              {/* <BsDot /> */}
              {/* <Text>{new Date(conv.response_time).toLocaleTimeString()}</Text> */}
              {/* <FaRobot color="gray" size={20} /> */}
            </Flex>
            <Text ml="3">{conv.response}</Text>
          </Flex>
        </Flex>
      )}
      {/* <hr /> */}
      <Flex w="full" justify="end" textAlign="right" flexDir="column">
        <Flex textAlign="right" alignItems="center" w="full" justify="end">
          <Text fontWeight="bold" fontSize={20}>
            You
          </Text>
          {/* <BsDot/> */}
          {/* <Text>{conv.recieve_time.toLocaleTimeString()}</Text> */}
        </Flex>

        <Text>{conv.query}</Text>
      </Flex>
    </Flex>
  );
};

export default Conversation;
