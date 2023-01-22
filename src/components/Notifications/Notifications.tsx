import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
const Notifications = () => {
  const notifications = useSelector(
    (state: any) => state.user.userInfo.notifications
  );
  return (
    <Box p="5">
      <Heading>Notifications</Heading>
      <Flex flexDir="column" borderY="1px" mt="10">
        {notifications.map((i: any) => (
          <Flex
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
        ))}
      </Flex>
    </Box>
  );
};

export default Notifications;
