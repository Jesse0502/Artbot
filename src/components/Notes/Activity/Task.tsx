import React, { Dispatch, SetStateAction } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
interface propsType {
  setIsTask: Dispatch<SetStateAction<boolean>>;
}
const Task = (props: propsType) => {
  let { setIsTask } = props;
  return (
    <Box>
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
        justify="end"
        borderBottom="2px"
        borderColor={"blackAlpha.500"}
        mt="3"
        alignItems="center"
        p="4"
      >
        <Text px="4" fontWeight="bold" fontSize={"lg"}>
          Edit
        </Text>
        <Text fontWeight="bold" fontSize={"lg"}>
          Delete
        </Text>
      </Flex>
    </Box>
  );
};

export default Task;
