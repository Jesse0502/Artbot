import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import File from "./File";
import AddFileModal from "./AddFileModal";
import { useDispatch, useSelector } from "react-redux";
import { getUploads } from "../../reducers/userSlice";

const Index = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUploads());
  }, [dispatch]);

  const files = useSelector((state: any) => state.user.uploads);

  return (
    <Box p="3">
      <Flex alignItems="center" px="3" mb="5" justify="space-between">
        <Text fontWeight="bold" fontSize="40">
          Files
        </Text>
        <AddFileModal edit={false} data={null} />
      </Flex>
      <Flex flexDir="column-reverse">
        {files &&
          files.map((item: any, index: number) => (
            <File key={index} file={item} />
          ))}
      </Flex>
    </Box>
  );
};

export default Index;
