import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Conversation from "./Conversations";
import Files from "./Files";
import { setTab } from "../reducers/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsChatTextFill, BsChatText } from "react-icons/bs";
import { useEffect } from "react";
import { checkAuth } from "../reducers/authSlice";
import { userInfo } from "../reducers/userSlice";
import {
  RiNotification2Fill,
  RiNotification2Line,
  RiUserLocationFill,
  RiUserLocationLine,
} from "react-icons/ri";
import { fetchResponses } from "../reducers/speechSplice";
import { AiFillFolder, AiOutlineFolder } from "react-icons/ai";
import "./index.css";
import Signin from "./Signin/index";
import Push from "push.js";
import Logo from "../assets/logo.png";
import Notifications from "./Notifications/Notifications";

function Index() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  let responses = useSelector((state: any) => state.speech.responses);
  let currTab = useSelector((state: any) => state.nav.tab);

  useEffect(() => {
    isAuthenticated &&
      Push.create("Welcome back!", {
        body: "What would you like me to do?",
        icon: Logo,
        vibrate: true,
      });
    dispatch(fetchResponses(responses.length + 10));
    dispatch(checkAuth(null));
    dispatch(userInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  let size = 32;
  let color = "#5e70b0";
  const tabs = isAuthenticated
    ? [
        {
          index: 0,
          name: "Files",
          component: <Files />,
          filled: <AiFillFolder size={size} color={color} />,
          icon: <AiOutlineFolder size={size} color={color} />,
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
          component: <Conversation />,
          filled: <BsChatTextFill size={size - 8} color={color} />,
          icon: <BsChatText size={size - 8} color={color} />,
        },
        {
          index: 3,
          name: "Notifications",
          component: <Notifications />,
          filled: <RiNotification2Fill size={size - 8} color={color} />,
          icon: <RiNotification2Line size={size - 8} color={color} />,
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
    <Flex h="100vh" overflow="clip" flexDir="column">
      <Box flex="1" bg="blackAlpha.300">
        {tabs[currTab.index].component}
      </Box>
      <Navbar switchTabs={switchTabs} tabs={tabs} currTab={currTab} />
    </Flex>
  );
}

export default Index;
