import React from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";
// import { FaRobot } from "react-icons/fa";
import logo from "../../assets/logo.png";
import TypeAnimation from "react-type-animation";
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
    <Flex flexDir="column-reverse" h="max" mx="5" my="4">
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
          <Text ml="3">
            {conv.response ?? (
              <Flex fontStyle="italic" opacity="0.5">
                <Text>Artbot is typing</Text>
                <TypeAnimation
                  cursor={false}
                  sequence={[`......`, 100, ""]}
                  wrapper="h2"
                  // @ts-ignore
                  duration={100}
                  repeat={999}
                />
              </Flex>
            )}
          </Text>
        </Flex>
      </Flex>

      {/* <hr /> */}
      <Flex w="full" justify="flex-end" textAlign="right" flexDir="column">
        <Flex w="full" alignItems="center" justify="end">
          <Text fontWeight="bold" fontSize={20}>
            You
          </Text>
          {/* <BsDot/> */}
          {/* <Text>{conv.recieve_time.toLocaleTimeString()}</Text> */}
        </Flex>

        <Text ml={["5vh", "60vh"]}>
          {conv.query ?? (
            <Text fontStyle="italic" color="gray">
              Failed to fetch data
            </Text>
          )}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Conversation;
