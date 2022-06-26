import React from "react";
import { Text, Box, Flex, Heading, Grid } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import Activity from "./Activity/Activity";
import { AiOutlinePlus } from "react-icons/ai";
import ActivityItems from "./Activity/AcivityItems";

const Index = () => {
  const [isActivity, setIsActivity] = React.useState(false);
  return (
    <>
      <Flex
        flexDir="column"
        fontFamily="body"
        h="83vh"
        overflow="auto"
        pos="relative"
      >
        {isActivity ? (
          <ActivityItems setIsActivity={setIsActivity} />
        ) : (
          <Box>
            <Flex px="5" pt="5" alignItems="center" justify="space-between">
              <Box>
                <Heading maxW="90vw" fontFamily="serif" fontSize={"3xl"}>
                  Good morning, blackbear
                </Heading>
                <Text fontSize={16} color="blackAlpha.600">
                  No incompleted tasks
                </Text>
              </Box>
              <IoIosSettings size={32} />
            </Flex>
            <Grid
              overflow="auto"
              templateColumns="repeat(2, 1fr)"
              gap={4}
              mx="6"
              mt="5"
              h="min"
            >
              {Array.from({ length: 1 }).map(() => (
                <Activity setIsActivity={setIsActivity} />
              ))}
            </Grid>
            <Box
              pos="absolute"
              bottom="3"
              p="4"
              rounded="full"
              color="purple.600"
              bg="purple.50"
              right="8"
              shadow="lg"
              _active={{ bg: "purple.100" }}
            >
              <AiOutlinePlus size={32} />
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Index;
