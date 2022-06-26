import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
interface propsType {
  setIsTask: Dispatch<SetStateAction<boolean>>;
}
const Task = (props: propsType) => {
  let { setIsTask } = props;
  return (
    <Box h="100%">
      <Flex justify="space-between" alignItems="center">
        <Box flex="3" onClick={() => setIsTask(false)}>
          <Box
            w="min"
            p="3"
            bg="purple.50"
            color="purple.500"
            _active={{ bg: "purple.100" }}
            rounded="full"
          >
            <BiArrowBack size={20} />
          </Box>
        </Box>
        <Text flex={4} textAlign="left" fontWeight="bold" fontSize={"xl"}>
          Task
        </Text>
      </Flex>
      <Flex
        onClick={() => setIsTask(true)}
        justify="space-between"
        borderBottom="2px"
        borderColor={"blackAlpha.500"}
        mt="3"
        alignItems="center"
        py="4"
        px="2"
      >
        <Text fontWeight="bold" fontSize={22} noOfLines={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
          aspernatur?
        </Text>
        <Flex>
          <Text px="4" fontWeight="bold" fontSize={"lg"}>
            <BiEdit size={24} />
          </Text>
          <Text fontWeight="bold" fontSize={"lg"}>
            <AiFillDelete size={24} />
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Text py="2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus id
          necessitatibus aliquid officia maiores doloribus debitis beatae
          dolorum sit nulla, possimus illo placeat aperiam quae, fugit, odit
          numquam sequi obcaecati?
        </Text>
        {true && (
          <Flex flexDir="column">
            {[1, 2, 3, 4].map(() => (
              <Flex
                p="2"
                w="36"
                bg="yellow.300"
                rounded="lg"
                shadow="md"
                my="2"
                alignItems="center"
              >
                <FcOpenedFolder size={32} />
                <Text noOfLines={1} px="2" fontSize="sm">
                  Loremipsum.txt{" "}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
        {true && (
          <Flex py="2">
            <Button bg="green.200" color="green">
              Done
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Task;
