import { Box } from "@chakra-ui/react";
import React from "react";
import { BsWifiOff } from "react-icons/bs";
function OfflineIcon() {
  return (
    <Box pos="absolute" top="4" left="4" color="red">
      {!navigator.onLine && <BsWifiOff size={24} />}
    </Box>
  );
}

export default OfflineIcon;
