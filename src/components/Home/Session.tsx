import React, { useState } from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  Image,
  Center,
  Button,
  ChakraProps,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {useDispatch} from "react-redux"
import {removeSession} from '../../reducers/speechSplice'
const Session = (props: any) => {
  const dispatch = useDispatch();
  let { session } = props;
  session = session.session
  const [count, setCount] = useState<any>(0);
  const [currentMeme, setCurrentMeme] = useState<any>(session[count].url);
  const [loading, setLoading] = useState<boolean>(false);
  const nextMeme = () => {
    setLoading(true);
    setCount(() => count + 1);
    setCurrentMeme(session[count + 1].url);
  };

  React.useEffect(() => {
    console.log(count);
  }, [count]);

  const prevMeme = () => {
    if (count > 0) {
      setLoading(true);
      setCount(() => count - 1);
      setCurrentMeme(session[count - 1].url);
    }
  };

  //   const endSession = () => {
  //     onOpen();
  //   };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonProps: ChakraProps = {
    rounded: "full",
    p: "5",
    w: "max",
    h: "max",
    shadow: "sm",
    bg: "white",
  };
  return (
    <Center flexDir="column" alignItems="center" mt={["-5", "-20"]}>
      <Box
        pos="absolute"
        top="4"
        fontWeight="bold"
        onClick={() => dispatch(removeSession(null))}
        right="5"
        cursor="pointer"
      >
        End Session
      </Box>
      <Center
        as={Button}
        bg="transparent"
        color=""
        isLoading={loading}
        w="96"
        h="80"
      >
        <Image
          maxW="96"
          maxH="80"
          shadow="md"
          objectFit="contain"
          rounded="md"
          onClick={() => onOpen()}
          onLoad={() => setLoading(false)}
          src={currentMeme}
        />
      </Center>
      <Flex justify="space-around" w="80%" mt="7">
        <Button {...buttonProps} onClick={prevMeme} isDisabled={count <= 0}>
          <FaStepBackward size={28} />
        </Button>
        <Button
          {...buttonProps}
          isDisabled={count + 1 >= session.length}
          onClick={nextMeme}
        >
          <FaStepForward size={28} />
        </Button>
      </Flex>
      <>
        {/* @ts-ignore */}
        <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent w="90%">
              <AlertDialogHeader>
                <Flex justify="space-between">
                  <Text noOfLines={1}>{session[count].title}</Text>
                  <Box onClick={() => onClose()}>
                    <AiOutlineClose />
                  </Box>
                </Flex>
              </AlertDialogHeader>
              <AlertDialogBody>
                <Center flexDir="column" py="2">
                  <Image
                    maxH="80vh"
                    shadow="md"
                    objectFit="contain"
                    rounded="md"
                    src={currentMeme}
                  />
                  <Link
                    href={`${session[count].source}`}
                    target={"_blank"}
                    color="blue.500"
                    pt="2"
                  >
                    Source
                  </Link>
                </Center>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </Center>
  );
};

export default Session;
