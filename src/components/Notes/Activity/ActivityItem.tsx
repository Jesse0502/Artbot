import React, { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";
const ActivityItem = (props: any) => {
  const [color, setColor] = useState("");
  let { i } = props;

  React.useEffect(() => {
    if (i.status === "Pending") {
      setColor("orange");
    } else if (i.status === "Done") {
      setColor("green");
    } else {
      setColor("blue");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex shadow="sm">
      <Flex
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
          color={color}
          bg="blackAlpha.200"
          textAlign="center"
        >
          <FiCircle size={24} />
        </Flex>
        <Box flex="10" p="5">
          <Text fontWeight="bold">{i.name}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ActivityItem;
