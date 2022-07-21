import { Box, Center, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";
// @ts-ignore
import sound from "../../assets/click.wav";
import { ReactMic } from "react-mic";
import { useDispatch, useSelector } from "react-redux";
import { fetchResponse } from "../../reducers/speechSplice";
import { logout } from "../../reducers/authSlice";
import OfflineIcon from "../../OfflineIcon";
import Session from "./Session";
import { FiLogOut } from "react-icons/fi";

function Home() {
  const [query, setQuery] = React.useState("");
  const [record, setRecord] = React.useState<boolean>(false);
  const [transcript, setTranscript] = React.useState<string>("");
  const [location, setLocation] = React.useState<any>(null);
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [recognition, setRecognition] = React.useState<any>(null);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
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
        let res = await dispatch(
          fetchResponse({ query, location, uid: Math.random() * 10 })
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
        if (res.payload.response.session) {
          setSession(res.payload.response.session);
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

  const handleLogout = () => {
    dispatch(logout(null));
  };

  return (
    <Center pt="44" overflow={"clip"} flexDir="column">
      <OfflineIcon />
      {loading && (
        <Box pos="absolute" top="3" right="3">
          <Spinner />
        </Box>
      )}
      {!session && (
        <>
          {isAuthenticated && (
            <Box pos="absolute" top="4" right="4" onClick={handleLogout}>
              <FiLogOut size={24} />
            </Box>
          )}
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
      {session && <Session session={session} setSession={setSession} />}
    </Center>
  );
}

export default Home;
