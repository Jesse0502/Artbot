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
  const dispatch = useDispatch();
  const { conversations } = props;
  const handleScroll = (e: any) => {
    const currPos = e.currentTarget.scrollTop;
    if (currPos === 0) {
      dispatch(fetchResponses(conversations.length + 10));
    }
  };
  const scrollRef = React.useRef();
  React.useEffect(() => {
    console.log(conversations.length);
    // @ts-ignore
    scrollRef.current.scrollTop = 99999 * 99999;
  }, [conversations]);
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
      >
        {conversations.map((conv, idx) => (
          <Conversation length={conversations.length} conv={conv} key={idx} />
        ))}
        <Center my="5">
          <CircularProgress
            color="#5e70b0"
            size="10"
            thickness={"lg"}
            isIndeterminate
          />
        </Center>
      </Flex>
    </>
  );
};

export default CoversationContainer;
