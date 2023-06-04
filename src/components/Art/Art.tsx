import { Box, Button, Image, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Art = () => {
  const [placeholderText, setPlaceholderText] = useState("An Astronaut riding a horse")
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageLink, setImageLink] = useState("")

  useEffect(() => {
    const imagePrompts = [
      "A serene beach sunset with vibrant colors and silhouettes.",
      "An enchanted forest with mystical creatures and glowing flowers.",
      "A futuristic cityscape with towering skyscrapers and flying cars.",
      "A whimsical underwater world filled with colorful coral reefs and exotic sea creatures.",
      "A cozy cabin nestled in the snowy mountains, surrounded by a winter wonderland.",
      "A bustling marketplace with vibrant colors and diverse cultures.",
      "A magical garden with blooming flowers and fluttering butterflies.",
      "A misty waterfall in a lush rainforest with abundant wildlife.",
      "A surreal desert landscape with towering sand dunes and a starry sky.",
      "A charming village by a peaceful countryside with rolling hills and grazing sheep."
    ];
    setTimeout(() => {
      if(!prompt) {
        setPlaceholderText(`${imagePrompts[Math.ceil(Math.random() * imagePrompts.length - 1)]}`)
      }
    }, 2500)
  }, [placeholderText, prompt])

  const GenerateImage = async () => {
    try{
      setLoading(true)
      if(!prompt) setPrompt(placeholderText)
      const res = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/extras/generate-image
        `,
        { prompt: prompt || placeholderText},
        );
        setImageLink(res.data.link)
      } catch {}
      finally {
        setLoading(false)
      }
  }
  return (
    <Box p="5" display={'flex'} alignItems={"center"} justifyItems={"center"} flexDir={"column"}>
      <Box w='full' display={"flex"} pt="5" gap='3' alignItems={'center'} justifyContent={"center"}>
        <Input type='text' minW={["40%","35%"]} sx={{
        background: "linear-gradient(to right, #FFC371, #FF5F6D)",
        border: "none",
        borderRadius: "md",
        boxShadow: "md",
        _focus: {
          boxShadow: "outline",
        }
      }}
      _placeholder={{color: "whiteAlpha.700"}} value={prompt} w="max-content" onChange={(e) => setPrompt(e.currentTarget.value)} h={["10","12"]} color="white" disabled={loading} placeholder={placeholderText} />
        <Button colorScheme='gray' shadow="md" h={["10","12"]} isLoading={loading} onClick={GenerateImage}>Generate</Button>
      </Box>
      <Image mt={["10","5"]} display={imageLink ? "block" : "none"}  src={imageLink} height={"auto"} maxH={["80vh","60vh"]} objectFit={"contain"} width={["90%","30vw"]} />
    </Box>
  )
}

export default Art