import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsWifiOff } from "react-icons/bs";
function OfflineIcon() {
  const [isOnline, setIsOnline] = useState(true);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setIsOnline(navigator.onLine);
    setTimeout(() => {
      setCounter(counter + 1);
    }, 200);
  }, [counter]);
  return (
    <>
      <Box pos="absolute" top="4" left="4" color="red">
        {!isOnline && <BsWifiOff size={24} />}
      </Box>
    </>
  );
}

export default OfflineIcon;
