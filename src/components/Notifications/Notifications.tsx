import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
const Notifications = () => {
  const notifications = useSelector(
    (state: any) => state.user.userInfo.notifications
  );
  return (
    <Box p="5">
      <Heading>Notifications</Heading>
      <Flex flexDir="column" mt="10">
        {notifications.length > 0 ? (
          notifications.map((i: any) => (
            <Flex
              borderY="1px"
              alignItems={"center"}
              p="4"
              cursor={"pointer"}
              _hover={{ bg: "gray.300" }}
            >
              <Image h="10" rounded="full" src={Logo} />
              <Flex flexDir="column" ml="3">
                <Text fontWeight={"bold"} fontSize="xl">
                  {i.type}
                </Text>
                <Text>{i.message}</Text>
              </Flex>
            </Flex>
          ))
        ) : (
          <Center h="full">
            <Heading color="gray" pt="20">
              No Notifications yet...
            </Heading>
          </Center>
        )}
      </Flex>
    </Box>
  );
};

export default Notifications;
