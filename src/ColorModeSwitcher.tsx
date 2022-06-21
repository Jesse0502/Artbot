import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Box,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Box pos="absolute" right="5" top="3">
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </Box>
  );
};
