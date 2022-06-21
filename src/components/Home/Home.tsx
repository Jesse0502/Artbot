import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillMicFill } from "react-icons/bs";
// @ts-ignore
import sound from "../../assets/click.wav";
import { ReactMic } from "react-mic";
function Home() {
  const [query, setQuery] = React.useState("");
  const [record, setRecord] = React.useState<boolean>(false);
  // @ts-ignore
  window.SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  // @ts-ignore
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.addEventListener("result", (e: any) => {
    setQuery(e.results[0][0].transcript);
  });

  function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      let utterance = new SpeechSynthesisUtterance("");
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }

  recognition.addEventListener("end", (e: any) => {
    setRecord(false);
    console.log(query);
    if ("speechSynthesis" in window) {
      let textToSpeak = `You said ${query}`;

      let speakData = new SpeechSynthesisUtterance();
      speakData.volume = 100;
      speakData.pitch = 1.3;

      speakData.text = textToSpeak;
      speakData.lang = "en";
      speakData.voice = getVoices()[2];
      speechSynthesis.speak(speakData);
    }
    setQuery("");
  });

  const handleOnRecord = () => {
    let click = new Audio(sound);
    click.play();
    if (record) recognition.stop();
    else recognition.start();
    setRecord(!record);
  };

  return (
    <Center pt="52" overflow={"clip"}>
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
          w="72"
          maxW="full"
          overflow={"clip"}
        >
          <ReactMic
            record={record}
            strokeColor="white"
            backgroundColor="#d6d6d6"
          />
          <Text>{query}</Text>
        </Center>
      </Box>
    </Center>
  );
}

export default Home;
