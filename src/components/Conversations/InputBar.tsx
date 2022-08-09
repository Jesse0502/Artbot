import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Center,
} from "@chakra-ui/react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdOutlineExpandLess } from "react-icons/md";
import { BsKeyboard } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {setTab} from "../../reducers/navigationSlice"
import { fetchResponse, addQuery } from "../../reducers/speechSplice";

const InputBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<any>(null);
  
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          setLocation({ lat, lng });
        },
        (err: any) => {}
      );
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!query) return;
    setQuery("");

    let uid = Math.random() * 10;
    dispatch(addQuery({ query, uid }));
    let res = await dispatch(fetchResponse({ query, location, uid }));
    
    if (res.payload.response.link) {
      let a = document.createElement("a");
      a.href = res.payload.response.link;
      a.target = "_blank";
      a.click();
    }
    if(res.payload.response.hasOwnProperty("session"))
    if(res.payload.response.session.type === "memes")
      dispatch(setTab({index: 1, name: "Home"}))
  };
  return (
    <form onSubmit={handleSubmit}>
      <Center w="full" pos="relative">
        <Flex
          roundedTop="full"
          bg="white"
          p="2"
          rounded={!open ? "full" : ""}
          pos="absolute"
          bottom={open ? 10 : 0}
          onClick={() => setOpen(() => !open)}
        >
          {open ? (
            <BsKeyboard size={24} />
          ) : (
            <Flex alignItems="center" flexDir="column">
              <MdOutlineExpandLess size={24} />
            </Flex>
          )}
        </Flex>
        {open && (
          <Flex
            h="12"
            zIndex={999999}
            pos="absolute"
            bottom="0"
            alignItems="center"
            justify="space-between"
            w="full"
            px="3"
          >
            <InputGroup rounded="full">
              <Input
                h="12"
                rounded="lg"
                bg="white"
                color="black"
                value={query}
                type="text"
                onChange={(e: any) => setQuery(e.target.value)}
                placeholder="type something"
              />
              <InputRightAddon
                as={Button}
                _active={{}}
                _focus={{}}
                _pressed={{}}
                p="3"
                h="12"
                rounded="full"
                bg="#5e70b0"
                color="white"
                type="submit"
                children={<RiSendPlane2Fill size={24} />}
              />
            </InputGroup>
          </Flex>
        )}
      </Center>
    </form>
  );
};

export default InputBar;
