import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { setTab } from "../reducers/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { useEffect } from "react";
function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}`);
  }, []);

  const currTab = useSelector((state: any) => state.nav.tab);
  let size = 32;
  let color = "#5e70b0";
  const tabs = [
    {
      index: 0,
      name: "Home",
      component: <Home />,
      filled: <AiFillHome size={size} color={color} />,
      icon: <AiOutlineHome size={size} color={color} />,
    },
    {
      index: 1,
      name: "Home2",
      component: <Home />,
      filled: <AiFillHome size={size} color={color} />,
      icon: <AiOutlineHome size={size} color={color} />,
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
