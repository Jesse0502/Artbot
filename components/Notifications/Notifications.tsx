import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import axios from "axios";
import { setNotifications } from "../../reducers/userSlice";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
const Notifications = () => {
  const notifications = useSelector(
    (state: any) => state.user.userInfo.notifications
  );

  const dispatch = useDispatch();

  const [deletingNotification, setDeletingNotification] = useState("");

  const deleteNotification = async (i: any) => {
    setDeletingNotification(i.id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/user/deleteNotification
        `,
        { data: { id: i.id } },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("art-token")}`,
          },
        }
      );
      dispatch(setNotifications(res.data.data.update));
    } catch (err) {}
    setDeletingNotification("");
  };

  const handleDeleteAll = async () => {
    setDeletingNotification("all");
    try {
      const confirmed = window.confirm("Are you sure?");
      if (!confirmed) return setDeletingNotification("");
      const res = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/user/deleteAllNotification
        `,
        { data: {} },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("art-token")}`,
          },
        }
      );
      if (res.status === 200) dispatch(setNotifications([]));
    } catch (err) {}
    setDeletingNotification("");
  };

  return (
    <Box p="5">
      <Flex alignItems={"center"} justify="space-between">
        <Heading>Notifications</Heading>
        <Button
          isLoading={deletingNotification === "all"}
          onClick={handleDeleteAll}
        >
          Delete All
        </Button>
      </Flex>
      <Flex flexDir="column" mt="10" h={["65vh", "65vh"]} overflow="auto">
        {notifications.length > 0 ? (
          [...notifications].reverse().map((i: any, key) => (
            <Flex
              borderTop="1px"
              key={key}
              alignItems={"center"}
              justify="space-between"
              p="4"
              _hover={{ bg: "blackAlpha.300" }}
            >
              <Flex alignItems={"center"}>
                <Image h="10" rounded="full" src={Logo.src} alt="logo" />
                <Flex flexDir="column" ml="3">
                  <Text fontWeight={"bold"} fontSize="xl">
                    {i.type}
                  </Text>
                  <Text>{i.message}</Text>
                  {i.html && <div dangerouslySetInnerHTML={i.html} />}
                </Flex>
              </Flex>
              <Button
                isLoading={deletingNotification === i.id}
                onClick={() => deleteNotification(i)}
              >
                <AiFillDelete />
              </Button>
            </Flex>
          ))
        ) : (
          <Center h="full">
            <Heading color="gray">No Notifications yet...</Heading>
          </Center>
        )}
      </Flex>
    </Box>
  );
};

export default Notifications;
