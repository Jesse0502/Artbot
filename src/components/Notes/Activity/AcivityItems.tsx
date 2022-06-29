import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import AddWorkItem from "../Modals/AddWorkItem";
import ActivityItem from "./ActivityItem";
import Task from "./Task";

const ActivityItems = (props: any) => {
  let { setActivity, activity } = props;
  const [task, setTask] = useState<any>(null);
  return (
    <Flex flexDir="column" h="83vh" overflow="auto" p="3">
      {task ? (
        <Task setTask={setTask} type={activity.type} task={task} />
      ) : (
        <>
          <Flex justify="space-between" alignItems="center">
            <Box flex="1" onClick={() => setActivity(null)}>
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
          </Flex>
          <Flex
            justify="space-between"
            borderBottom="2px"
            onClick={() => {}}
            borderColor={"blackAlpha.500"}
            mt="3"
            alignItems="center"
            p="4"
          >
            <Text fontWeight="bold" fontSize={"lg"}>
              Add Event
            </Text>
            <AddWorkItem type={activity.type} />
          </Flex>
          <Flex flexDir="column" h="max" overflow="auto">
            {activity.items.map((i: any, key: any) => (
              <Box onClick={() => setTask(i)}>
                <ActivityItem key={key} i={i} />
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ActivityItems;
