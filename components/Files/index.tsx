import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import File from "./File";
import AddFileModal from "./AddFileModal";
import { useDispatch, useSelector } from "react-redux";
import { getUploads } from "../../reducers/userSlice";

const Files = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUploads());
  }, [dispatch]);

  const files = useSelector((state: any) => state.user.uploads);

  return (
    <Box p="3">
      <Flex alignItems="center" px="3" mb="5" justify="space-between">
        <Text fontWeight="bold" fontSize="40">
          Storage
        </Text>
        <AddFileModal edit={false} data={null} />
      </Flex>
      <Flex flexDir="column" h="67vh" overflow={"auto"}>
        {console.log(files)}
        {files &&
          [...files]
            .reverse()
            .map((item: any, index: number) => (
              <File key={index} file={item} />
            ))}
      </Flex>
    </Box>
  );
};

export default Files;
