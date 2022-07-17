import React from "react";
import Conversation from "./Convsersation";
import { Flex, CircularProgress, Center } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { fetchResponses } from "../../reducers/speechSplice";

interface propTypes {
  conversations: {
    _id: string;
    response?: string;
    query: string;
    response_time?: Date;
    recieve_time: Date;
  }[];
}

const CoversationContainer = (props: propTypes) => {
  const { conversations } = props;

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef();
  // const [scrollTop, setscrollTop] = React.useState(0);

  const handleScroll = (e: any) => {
    const currPos = Math.abs(
      // @ts-ignore
      Math.abs(Math.ceil(e.currentTarget.scrollTop)) +
        // @ts-ignore
        scrollRef.current.clientHeight
    );
    // setscrollTop(currPos);
    // @ts-ignore
    const clientH = scrollRef.current.scrollHeight;
    if (+currPos + 5 >= +clientH) {
      setLoading(true);
      setTimeout(() => {
        dispatch(fetchResponses(conversations.length + 10));
        setLoading(false);
      }, 200);
    }
  };

  React.useEffect(() => {
    // const currPos = Math.abs(
    //   // @ts-ignore
    //   Math.abs(Math.ceil(scrollTop)) +
    //     // @ts-ignore
    //     scrollRef.current.clientHeight
    // );
    // // @ts-ignore
    // const clientH = scrollRef.current.scrollHeight;
    // if (+currPos >= +clientH) {
    // @ts-ignore
    scrollRef.current.scrollTop = 0;
    // }
  }, [conversations.length]);

  return (
    <>
      <Flex
        flexDir="column-reverse"
        h="full"
        //  @ts-ignore
        ref={scrollRef}
        overflow="auto"
        pb="20"
        scrollBehavior={"smooth"}
        onScroll={handleScroll}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            // borderColor: "red",
            borderRadius: "24px",
          },
        }}
      >
        {conversations.map((conv, idx) => (
          <Conversation length={conversations.length} conv={conv} key={idx} />
        ))}
        {loading && (
          <Center my="5">
            <Flex mx="3">Fetching conversations</Flex>
            <CircularProgress
              color="#5e70b0"
              size="5"
              thickness={"10"}
              isIndeterminate
            />
          </Center>
        )}
      </Flex>
    </>
  );
};

export default CoversationContainer;
