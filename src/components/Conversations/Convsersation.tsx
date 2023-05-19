import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import TypeAnimation from "react-type-animation";
import logo from "../../assets/logo.png";


const Conversation = (props: any) => {
  const conv: any = props.conv;
  const session = useSelector ((state: any) => state.speech.session)   
  
  return (
    <Flex flexDir="column-reverse" h="max" mx="5" my="4">
      <Flex mt="7">
        <Avatar src={logo} size="sm" />
        <Flex w="60%" justify="start" flexDir="column">
          <Flex alignItems="center">
            <Text ml="3" fontWeight="bold" fontSize={20}>
              Artbot
            </Text>
          </Flex>
          <Text ml="3">
            {!conv.response ? (
              <Flex fontStyle="italic" opacity="0.5">
                <Text>Artbot is typing</Text>
                <TypeAnimation
                  cursor={false}
                  sequence={[`......`, 500, ""]}
                  wrapper="h2"
                  // @ts-ignore
                  // duration={100}
                  repeat={999}
                />
              </Flex>
            ) : (
              <Box dangerouslySetInnerHTML={{__html: conv.response}}>
                
                {/* {ReactHtmlParser(parseText(conv.response))} */}
              </Box>
            )}
            
          {session && conv.response && conv.response.includes("Sir, I found") && session.type === "email" && (<>
          <Text fontSize="md" py="2" fontWeight="bold">Current Session</Text>
          <Flex flexDir="column" maxH="96" overflow="auto">
            
          {session.session.map((mail: any, index: number) => (
            <Text key={index} fontWeight="semibold">{index + 1}. {mail.sender} - {mail.subject} </Text>
            ))}
            </Flex>
          </>)}
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
