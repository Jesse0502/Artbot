import { Box, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import ActivityItem from "./ActivityItem";
import Task from "./Task";
interface propsType {
  setIsActivity: Dispatch<SetStateAction<boolean>>;
}
const ActivityItems = (props: propsType) => {
  let { setIsActivity } = props;
  const [isTask, setIsTask] = useState(false);
  return (
    <Flex flexDir="column" h="83vh" overflow="auto" p="3">
      {isTask ? (
        <Task setIsTask={setIsTask} />
      ) : (
        <>
          <Flex justify="space-between" alignItems="center">
            <Box flex="1" onClick={() => setIsActivity(false)}>
              <Box
                p="3"
                bg="purple.50"
                color="purple.500"
                w="min"
                _active={{ bg: "purple.100" }}
                rounded="full"
              >
                <BiArrowBack size={20} />
              </Box>
            </Box>
            <Text
              textAlign="center"
              flex="12"
              fontWeight="bold"
              fontSize={"xl"}
            >
              Work Items
            </Text>
            <Box></Box>
          </Flex>
          <Flex
            onClick={() => setIsTask(true)}
            justify="space-between"
            borderBottom="2px"
            borderColor={"blackAlpha.500"}
            mt="3"
            alignItems="center"
            p="4"
          >
            <Text fontWeight="bold" fontSize={"lg"}>
              Add Event
            </Text>
            <Box>
              <AiOutlinePlus size={28} />
            </Box>
          </Flex>
          <Flex flexDir="column" h="96" overflow="auto">
            {Array.from({ length: 9 }).map(() => (
              <Box onClick={() => setIsTask(true)}>
                <ActivityItem />
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ActivityItems;
