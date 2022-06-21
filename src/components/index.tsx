import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import navigationSlice, { setTab } from "../reducers/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";

function Index() {
  const dispatch = useDispatch();
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
    console.log();
  };
  console.log(
    currTab
    // currTab.index,
    // tabs[currTab.index].component,
    // tabs.find((t: any) => t.index !== currTab.index)
  );
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
