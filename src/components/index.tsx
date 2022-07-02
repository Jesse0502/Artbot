import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Notes from "./Notes";
import Notification from "./Notifications";
import { setTab } from "../reducers/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCalendar2Check, BsCalendar2CheckFill } from "react-icons/bs";
import { useEffect } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { checkAuth } from "../reducers/authSlice";
import { RiUserLocationFill, RiUserLocationLine } from "react-icons/ri";

import Signin from "./Signin/index";
function Index() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  let currTab = useSelector((state: any) => state.nav.tab);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   currTab = {
    //     index: 0,
    //     name: "Home",
    //   };
    // }
    fetch(`${process.env.REACT_APP_SERVER_URL}`);
    dispatch(checkAuth(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let size = 32;
  let color = "#5e70b0";
  const tabs = isAuthenticated
    ? [
        {
          index: 0,
          name: "Notification",
          component: <Notification />,
          filled: <IoMdNotifications size={size} color={color} />,
          icon: <IoMdNotificationsOutline size={size} color={color} />,
        },
        {
          index: 1,
          name: "Home",
          component: <Home />,
          filled: <AiFillHome size={size} color={color} />,
          icon: <AiOutlineHome size={size} color={color} />,
        },
        {
          index: 2,
          name: "Notes",
          component: <Notes />,
          filled: <BsCalendar2CheckFill size={size - 8} color={color} />,
          icon: <BsCalendar2Check size={size - 8} color={color} />,
        },
      ]
    : [
        {
          index: 0,
          name: "Home",
          component: <Home />,
          filled: <AiFillHome size={size} color={color} />,
          icon: <AiOutlineHome size={size} color={color} />,
        },
        {
          index: 1,
          name: "Signin",
          component: <Signin />,
          filled: <RiUserLocationFill size={size - 8} color={color} />,
          icon: <RiUserLocationLine size={size - 8} color={color} />,
        },
      ];

  const switchTabs = (index: number, name: string) => {
    dispatch(setTab({ index: index, name: name }));
  };

  return (
    <Flex h="100vh" flexDir="column">
      <Box flex="1" bg="blackAlpha.300">
        {tabs[currTab.index].component}
      </Box>
      <Navbar switchTabs={switchTabs} tabs={tabs} currTab={currTab} />
    </Flex>
  );
}

export default Index;
