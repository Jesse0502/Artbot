import React from "react";
import { Text, Box, Flex, Heading, Grid } from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import Activity from "./Activity/Activity";
import ActivityItems from "./Activity/AcivityItems";
import AddActivity from "./Modals/AddActivity";
import { useSelector } from "react-redux";
const Index = () => {
  const [activity, setActivity] = React.useState(false);
  const [activities, setActivities] = React.useState([]);
  let aSelector = useSelector((state: any) => state.activity.activities);
  React.useEffect(() => {
    setActivities(aSelector);
  }, [aSelector]);
  return (
    <>
      <Flex
        flexDir="column"
        fontFamily="body"
        h="83vh"
        overflow="auto"
        pos="relative"
      >
        {activity ? (
          <ActivityItems activity={activity} setActivity={setActivity} />
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
              {activities &&
                activities.map((i: any, key: number) => (
                  <Activity key={key} i={i} setActivity={setActivity} />
                ))}
            </Grid>

            <AddActivity />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Index;
