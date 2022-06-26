import { Center, Flex } from "@chakra-ui/react";

function Navbar(props: any) {
  let { switchTabs, tabs, currTab } = props;
  const handleSwitch = (t: any) => {
    switchTabs(t.index, t.name);
  };
  return (
    <Flex bg="blackAlpha.300" justify="center" shadow={"md"}>
      <Flex
        h="20"
        mx="3"
        my="3"
        p="5"
        overflow={"clip"}
        rounded="3xl"
        bg="white"
        transition="ease"
        transitionDelay="0.3s"
        shadow="xl"
        w={["full", "50vw"]}
      >
        {tabs.map((t: any, key: number) => (
          <Center
            key={key}
            onClick={() => handleSwitch(t)}
            _active={{}}
            alignItems={"center"}
            textAlign={"center"}
            w="100%"
          >
            {currTab.name === t.name ? t.filled : t.icon}
          </Center>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
