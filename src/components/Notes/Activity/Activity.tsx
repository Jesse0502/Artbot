import React from "react";
import { GridItem, Center, Box, Text, Flex } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";

const Activity = () => {
  return (
    <GridItem rounded="xl" bg="white" shadow="md" maxH="52">
      <Flex flexDir="column" h="44" py="5" rounded="lg" justify="space-around">
        <Center>
          <Box p="4" rounded="full" bg="pink.100" color="pink.400">
            <IoMdNotifications size={28} />
          </Box>
        </Center>
        <Text textAlign="center" fontWeight={"bold"}>
          Tasks{" "}
          <Text opacity="0.6" fontSize="sm">
            2 items
          </Text>
        </Text>
      </Flex>
    </GridItem>
  );
};

export default Activity;
