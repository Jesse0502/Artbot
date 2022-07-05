import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Provider, connect } from "react-redux";
import { store } from "./store";
import Index from "./components";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <ColorModeSwitcher />
      <ConnectedComponent />
    </Provider>
  </ChakraProvider>
);
const ConnectedComponent = connect()(() => <Index />);
