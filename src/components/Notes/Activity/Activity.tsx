import React from "react";
import { GridItem, Center, Box, Text, Flex } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { BiBook } from "react-icons/bi";
const Activity = (props: any) => {
  let { setActivity, i } = props;
  return (
    <GridItem
      onClick={() => setActivity(i)}
      rounded="xl"
      _active={{ bg: i.type === "Reminder" ? "pink.50" : "blue.50" }}
      bg="white"
      shadow="md"
      maxH="52"
    >
      <Flex flexDir="column" h="44" py="5" rounded="lg" justify="space-around">
        <Center>
          <Box
            p="4"
            rounded="full"
            bg={i.type === "Reminder" ? "pink.100" : "blue.100"}
            color={i.type === "Reminder" ? "pink.400" : "blue.400"}
          >
            {i.type === "Reminder" ? (
              <IoMdNotifications size={28} />
            ) : (
              <BiBook size={28} />
            )}
          </Box>
        </Center>
        <Flex alignItems="center" flexDir="column">
          <Text textAlign="center" fontWeight={"bold"} noOfLines={2}>
            {i.name}
          </Text>
          <Text opacity="0.6" fontSize="sm">
            {i.items.length} item(s)
          </Text>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default Activity;
