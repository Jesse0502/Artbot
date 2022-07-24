import React from 'react'
import { Button, Flex, Text } from "@chakra-ui/react"
import axios from 'axios'
import AddFileModal from './AddFileModal'

const File = (props: any) => {
    const [downloading, setDownloading] = React.useState(false)
    const {file} = props;


    const handleDownload = () => {
        setDownloading(true)
        axios({
            url: file.secureLink,
            method: 'GET',
            responseType: 'blob'
      })
            .then((response: any) => {
                  const url = window.URL
                        .createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `${file.name}.pdf`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
            })
            setDownloading(false)
    }

    const handleView = () => {
        const link = document.createElement('a');
        link.href = file.secureLink;
        link.target = "_blank"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
    <Flex justify="space-between" py="6" borderBottom="1px" borderColor='black' px="5" alignItems="center">
        <Flex flexDir="column"  >
        <Text cursor="pointer" _hover={{"color": "#5e70b0"}} onClick={handleView} fontSize={["xl","3xl"]} noOfLines={1} fontWeight="bold">{file.name} </Text>
            <Text fontSize={["sm","md"]} fontWeight="light">Type: {file.file_type}; Last Updated: {new Date(file.lastUpdated).toLocaleDateString()}</Text>
        </Flex>
        <Flex alignItems="center">
            <AddFileModal edit={true} data={file}/>

            {/* <Button colorScheme={"blue"} mx="3">Edit</Button> */}
            <Button colorScheme={"green"} onClick={handleDownload} isLoading={downloading} disabled={downloading}>Download</Button>
        </Flex>
    </Flex>
        </>
    )
}

export default File