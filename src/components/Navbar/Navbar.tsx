import { Box, Center, Flex, AbsoluteCenter, Button } from "@chakra-ui/react";
import React from "react";

function Navbar(props: any) {
  let { switchTabs, tabs, currTab } = props;
  const handleSwitch = (t: any) => {
    switchTabs(t.index, t.name);
  };
  return (
    <Flex bg="blackAlpha.300" shadow={"md"}>
      <Flex
        h="20"
        m="3"
        p="5"
        overflow={"clip"}
        rounded="3xl"
        bg="white"
        // color="white"
        shadow="xl"
        w="full"
      >
        {tabs.map((t: any) => (
          <Center
            onClick={() => handleSwitch(t)}
            _active={{}}
            alignItems={"center"}
            textAlign={"center"}
            w="100%"
          >
            {currTab.name == t.name ? t.filled : t.icon}
          </Center>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
