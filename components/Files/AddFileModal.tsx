
import React, {useState, useEffect} from 'react'
import {Button, Flex, Image, Input,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure,useToast} from "@chakra-ui/react"
import { AiOutlinePlus } from "react-icons/ai";
import {uploadFile, editFile, getUploads} from "../../reducers/userSlice"
import {useDispatch} from "react-redux";
const AddFileModal = (props: any) => {

    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)

    const toast= useToast()
    useEffect(() => {
      if(props.edit){
        setName(props.data.name)
        setFile(props.data.secureLink)
      }
    }, [props])
    
    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function handleSubmit() {
      setLoading(true)
      let filetoBase64: any = null
      if(typeof file !== 'string'){
        filetoBase64 = await toBase64(file)
      }
        let data: any = {
            name,
            file: filetoBase64 || props.data.secureLink
        }

        let res: any
        if(props.edit){
          data.id = props.data.id
          res = await dispatch(editFile(data))
        } else {
          res = await dispatch(uploadFile(data))
        }
        setLoading(false)
        if(res.type.includes("rejected")){

          toast({
            title: 'Failed to Upload File.',
            description: "Please try with an Image or Pdf File",
            status: 'error',
            position:"bottom-right",
            duration: 4000,
            isClosable: true,
          })
        } else {
          
          toast({
          title: 'Successfully Uploaded File.',
          description: "File was uploaded successfully",
          status: 'success',
          position:"bottom-right",
          duration: 4000,
          isClosable: true,
        })
        }
        dispatch(getUploads())
        onClose()
    };
    return (<>
        <Button mx="3" onClick={onOpen} colorScheme="blue">
    <Flex>
      <Text mr={props.edit ? "" :"2"}> {props.edit ? "Edit" :"Upload"} </Text>
      {!props.edit && <AiOutlinePlus size="20"/>}
    </Flex>
    </Button>
  
        <Modal isOpen={isOpen} isCentered  onClose={onClose}>
          <ModalOverlay />
          <ModalContent mx={["3","0"]}>
            <ModalHeader>Add File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex alignItems="start" flexDirection="column">

                    <Text pb="2">Name</Text>
                    <Input value={name} mb="4" type="text" onChange={(e: any) => setName(e.target.value)} />
                    <Text pb="2">File</Text>
                    <input type="file" onChange={(e: any) => setFile(e.target.files[0])} />
                    {props.edit && props.data?.file_type.match(/jpeg|png|jpg/i) && <Image src={file} alt="myalt" />}
                    {props.edit && props.data?.file_type.match(/mp3|wav|ogg/i) && <audio src={file}/>}
                        </Flex>
              <Text fontWeight='bold' mb='1rem'>
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" disabled={loading} isLoading={loading} onClick={handleSubmit}>{props.edit ? "Edit" : "Upload"}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>)
}

export default AddFileModal;