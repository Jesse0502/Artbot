import { Box, Center, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";
// @ts-ignore
import sound from "../../assets/click.wav";
import { ReactMic } from "react-mic";
import { useDispatch } from "react-redux";
import { fetchResponse } from "../../reducers/speechSplice";

function Home() {
  const [query, setQuery] = React.useState("");
  const [record, setRecord] = React.useState<boolean>(false);
  const [transcript, setTranscript] = React.useState<string>("");
  const [location, setLocation] = React.useState<any>(null);
  let synth = window.speechSynthesis;
  useEffect(() => {
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
      const respondSpeech = async () => {
        let res = await dispatch(fetchResponse({ query, location }));
        let textToSpeak = `${res.payload.msg}`;
        if (res.payload.link) {
          let a = document.createElement("a");
          a.href = res.payload.link;
          a.target = "_blank";
          a.click();
        }
        let speakData = new SpeechSynthesisUtterance();

        speakData.volume = 100;
        speakData.pitch = 1.1;

        speakData.text = textToSpeak;
        speakData.lang = "en";
        speakData.voice = speechSynthesis.getVoices()[1];
        speechSynthesis.speak(speakData);
      };
      respondSpeech();
    }
    return () => {
      setQuery("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  recognition.addEventListener("end", (e: Event) => {
    setRecord(false);
  });

  const handleOnRecord = async () => {
    synth.cancel();
    recognition.stop();
    setRecord(false);
    if (navigator.onLine) {
      let click = new Audio(sound);
      click.volume = 0.6;
      click.play();
      recognition.start();
      setRecord(true);
    } else {
      navigator.vibrate(400);
      let speakData = new SpeechSynthesisUtterance();
      speakData.volume = 100;
      speakData.pitch = 1.1;
      speakData.text =
        "You are currently offline, please connect to the internet!";

      speakData.lang = "en";
      speakData.voice = speechSynthesis.getVoices()
        ? speechSynthesis.getVoices()[1]
        : speechSynthesis.getVoices()[0];
      speechSynthesis.speak(speakData);
    }
  };

  return (
    <Center pt="44" overflow={"clip"} flexDir="column">
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
