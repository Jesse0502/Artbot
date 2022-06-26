import React, { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";
import useLongPress from "../../Hooks/useLongPress";
const ActivityItem = (props: any) => {
  const [showMore, setShowMore] = useState(false);
  const longPressProps = useLongPress({
    // @ts-ignore
    onClick: (ev) => console.log("on click", ev.button, ev.shiftKey),
    // @ts-ignore
    onLongPress: (ev) => {
      navigator.vibrate(100);
      console.log("on long press");
      setShowMore(true);
    },
  });
  return (
    <Flex shadow="sm">
      <Flex
        {...longPressProps}
        alignItems="center"
        w="full"
        borderBottom="2px"
        borderColor="blackAlpha.500"
      >
        <Flex
          justify="center"
          flex="2"
          alignItems="center"
          h="full"
          color="orange"
          bg="blackAlpha.200"
          textAlign="center"
        >
          <FiCircle size={24} />
        </Flex>
        <Box flex="10" p="5">
          <Text fontWeight="bold">This is a demo task</Text>
        </Box>
        {showMore ? <></> : <></>}
      </Flex>
    </Flex>
  );
};

export default ActivityItem;
