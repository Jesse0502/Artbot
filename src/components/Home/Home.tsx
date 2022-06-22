import { Box, Center, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";
// @ts-ignore
import sound from "../../assets/click.wav";
import { ReactMic } from "react-mic";
import { useDispatch, useSelector } from "react-redux";
import { fetchResponse } from "../../reducers/speechSplice";
function Home() {
  const [query, setQuery] = React.useState("");
  const [record, setRecord] = React.useState<boolean>(false);
  const [transcript, setTranscript] = React.useState<string>("");
  let dispatch = useDispatch();
  // @ts-ignore
  window.SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  // @ts-ignore
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.addEventListener("result", (e: any) => {
    setQuery(e.results[0][0].transcript);
    setTranscript(e.results[0][0].transcript);
  });

  useEffect(() => {
    if ("speechSynthesis" in window && query && !record) {
      console.log(query, record);
      const respondSpeech = async () => {
        let res = await dispatch(fetchResponse(query));
        console.log(res.payload);
        let textToSpeak = `${res.payload.msg}`;
        if (res.payload.link) {
          let a = document.createElement("a");
          a.href = res.payload.link;
          a.target = "_blank";
          a.click();
        }

        let speakData = new SpeechSynthesisUtterance(textToSpeak);
        speakData.volume = 100;
        speakData.pitch = 1.3;

        // speakData.text = ;
        speakData.lang = "en";
        speakData.voice = speechSynthesis.getVoices()[2];
        speechSynthesis.speak(speakData);
      };
      respondSpeech();
    }
    setQuery("");
  }, [record]);

  recognition.addEventListener("end", (e: any) => {
    setRecord(false);
  });

  const handleOnRecord = () => {
    let click = new Audio(sound);
    click.play();
    if (record) recognition.stop();
    else recognition.start();
    setRecord(!record);
  };

  return (
    <Center pt="52" overflow={"clip"} flexDir="column">
      <Box
        p="16"
        m="5"
        shadow={!record ? "lg" : "none"}
        rounded="full"
        onClick={handleOnRecord}
      >
        {!record && <BsFillMicFill size={72} color={"#5e70b0"} />}
        <Center
          textAlign={"center"}
          display={!record ? "none" : "block"}
          w="80"
          maxW="full"
          overflow={"clip"}
        >
          <ReactMic
            record={record}
            strokeColor="white"
            backgroundColor="#d6d6d6"
          />
        </Center>
      </Box>
      <Text id="transcript" fontSize={20} color="blackAlpha.600">
        {transcript}
      </Text>
    </Center>
  );
}

export default Home;
