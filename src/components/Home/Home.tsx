import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { ReactMic } from "react-mic";
import { useDispatch, useSelector } from "react-redux";
import OfflineIcon from "../../OfflineIcon";
import { addQuery, fetchResponse } from "../../reducers/speechSplice";
import Session from "./Session";
// @ts-ignore
import sound from "../../assets/click.wav";

function Home() {
  const [query, setQuery] = React.useState<string>("");
  const [record, setRecord] = React.useState<boolean>(false);
  const [transcript, setTranscript] = React.useState<string>("");
  const [location, setLocation] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [recognition, setRecognition] = React.useState<any>(null);
  
  const sessionCtx = useSelector(
    (state: any) => state.speech.session
  );

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
    if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
      // @ts-ignore
      window.SpeechRecognition =
        // @ts-ignore
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition =
        // @ts-ignore
        window.speechRecognition || window.webkitSpeechRecognition;
      recognition = new recognition();
      recognition.interimResults = true;
      setRecognition(recognition);
      recognition.addEventListener("result", (e: any) => {
        setQuery(e.results[0][0].transcript);
        setTranscript(e.results[0][0].transcript);
      });
    }
  }, []);
  
  let dispatch = useDispatch();

  useEffect(() => {
    if ("speechSynthesis" in window && query && !record) {
      const respondSpeech = async () => {
        setLoading(true);
        let uid = Math.random() * 10
        dispatch(addQuery({ query, uid }));
        let res = await dispatch(
          fetchResponse({ query, location, uid })
        );
        console.log(res);
        setLoading(false);
        let textToSpeak = `${res.payload.response.msg}`;
        if (res.payload.response.link) {
          let a = document.createElement("a");
          a.href = res.payload.response.link;
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
    return () => setQuery("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);
  if (recognition)
    recognition.addEventListener("end", (e: Event) => {
      setRecord(false);
    });

  const handleOnRecord = async () => {
    synth.cancel();
    if (recognition) recognition.stop();
    setRecord(false);
    if (!recognition) {
        let speakData = new SpeechSynthesisUtterance();
        speakData.volume = 100;
        speakData.pitch = 1.1;
        speakData.text =
          "You browser does not support speech recognition yet! Please use Google Chrome";

        speakData.lang = "en";
        speakData.voice = speechSynthesis.getVoices()
          ? speechSynthesis.getVoices()[1]
          : speechSynthesis.getVoices()[0];
        speechSynthesis.speak(speakData);
    } else if (navigator.onLine) {
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
      <OfflineIcon />
      {loading && (
        <Box pos="absolute" top="3" right="3">
          <Spinner />
        </Box>
      )}
      {!sessionCtx && (
        <>

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
        </>
      )}
      {sessionCtx && sessionCtx.type === "memes" && <Session session={sessionCtx} />}
    </Center>
  );
}

export default Home;
