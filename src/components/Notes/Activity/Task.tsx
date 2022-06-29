import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteActivity } from "../../../reducers/activitySlice";
import { useDispatch } from "react-redux";
const Task = (props: any) => {
  let { setTask, task, type, setActivity } = props;
  console.log(task);
  window.onhashchange = function () {
    setTask(null);
  };
  let dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteActivity(task.id));
    setActivity(null);
  };
  return (
    <Box h="80%">
      <Flex justify="space-between" alignItems="center">
        <Box flex="3" onClick={() => setTask(null)}>
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
          {type}
        </Text>
      </Flex>
      <Flex
        onClick={() => setTask(Task)}
        justify="space-between"
        borderBottom="2px"
        borderColor={"blackAlpha.500"}
        mt="3"
        alignItems="center"
        py="4"
        px="2"
      >
        <Text fontWeight="bold" fontSize={22} noOfLines={2}>
          {task.name}
        </Text>
        <Flex>
          <Text px="4" fontWeight="bold" fontSize={"lg"}>
            <BiEdit size={24} />
          </Text>
          <Text fontWeight="bold" fontSize={"lg"} onClick={handleDelete}>
            <AiFillDelete size={24} />
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" h="90%" py="3" overflow="auto">
        <Text fontSize="sm" opacity="0.6" pt="2">
          Last updated: {task.updatedAt}
        </Text>
        <Text py="2">{task.description}</Text>
        {type === "Notes" && (
          <Flex flexDir="column">
            {task.files &&
              task.files.map((t: any) => (
                <Flex
                  p="2"
                  w="44"
                  bg="yellow.300"
                  rounded="lg"
                  shadow="md"
                  my="2"
                  alignItems="center"
                >
                  <FcOpenedFolder size={32} />
                  <Text noOfLines={1} px="2" fontSize="sm">
                    {t.name}
                  </Text>
                </Flex>
              ))}
          </Flex>
        )}
        {type === "Reminders" && (
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
