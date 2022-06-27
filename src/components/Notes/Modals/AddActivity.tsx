import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Flex,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useFormik } from "formik";
import { AiOutlinePlus } from "react-icons/ai";
const AddActivity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "Notes",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Box
        pos="absolute"
        bottom="3"
        p="4"
        rounded="full"
        color="purple.600"
        bg="purple.50"
        right="8"
        shadow="lg"
        onClick={onOpen}
        _active={{ bg: "purple.100" }}
      >
        <AiOutlinePlus size={32} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={["90%", "full"]}>
          <ModalHeader>Add Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="8" pt="4">
            <form onSubmit={formik.handleSubmit}>
              <Flex gap={2} flexDir="column">
                <label>Name</label>
                <Input
                  isRequired
                  placeholder="Add Title (max length: 30)"
                  maxLength={30}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  name="title"
                />
                <label>Sub Activity</label>
                <RadioGroup
                  pb="4"
                  onChange={(val: string) =>
                    formik.setValues({ ...formik.values, type: val })
                  }
                  value={formik.values.type}
                  name="type"
                >
                  <Stack direction="row">
                    <Radio value="Task">Task</Radio>
                    <Radio value="Notes">Notes</Radio>
                  </Stack>
                </RadioGroup>
                <Button type="submit" bg="blue.400" color="white">
                  Submit
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddActivity;
