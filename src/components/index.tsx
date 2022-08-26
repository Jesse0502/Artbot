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
import { RiUserLocationFill, RiUserLocationLine } from "react-icons/ri";
import { fetchResponses } from "../reducers/speechSplice";
import { AiFillFolder, AiOutlineFolder } from "react-icons/ai";
import "./index.css";
import Signin from "./Signin/index";
import Push from "push.js";
import Logo from "../assets/logo.png";
function Index() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  let currTab = useSelector((state: any) => state.nav.tab);
  let responses = useSelector((state: any) => state.speech.responses);

  useEffect(() => {
    isAuthenticated &&
      Push.create("You're authenticated!", {
        body: "You're officially in the game now",
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
