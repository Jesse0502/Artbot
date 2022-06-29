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
  Textarea,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useFormik } from "formik";
import { AiOutlinePlus } from "react-icons/ai";
const AddWorkItem = (props: any) => {
  let { type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues:
      type === "Reminders"
        ? {
            name: "",
            description: "",
            dueOn: "",
            status: "Pending",
          }
        : {
            name: "",
            description: "",
            files: [],
          },
    onSubmit: (values: any) => {
      if (type === "Notes") {
        values = {
          name: values.name,
          description: values.description,
          files: [...values.files],
        };
      }

      console.log(values);
    },
  });
  return (
    <>
      <Box onClick={onOpen}>
        <AiOutlinePlus size={28} />
      </Box>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={["90%", "full"]}>
          <ModalHeader>Add Work Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="8" pt="4">
            <form onSubmit={formik.handleSubmit}>
              <Flex gap={2} flexDir="column">
                <label>Title</label>
                <Input
                  isRequired
                  placeholder="Add Name (max length: 30)"
                  maxLength={30}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                />
                <label>Description</label>
                <Textarea
                  isRequired
                  placeholder="Add Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                />
                {/* @ts-ignore */}
                {type === "Reminders" && (
                  <>
                    <label>Due On (date and time):</label>
                    <Input
                      onChange={formik.handleChange}
                      type="datetime-local"
                      isRequired
                      name="dueOn"
                    />
                    <label>Status</label>
                    <RadioGroup
                      pb="4"
                      onChange={(val: string) =>
                        // @ts-ignore
                        formik.setValues({ ...formik.values, status: val })
                      }
                      value={formik.values.status}
                      name="status"
                    >
                      <Stack direction="row">
                        <Radio value="Done">Done</Radio>
                        <Radio value="Pending">Pending</Radio>
                      </Stack>
                    </RadioGroup>
                  </>
                )}
                {type === "Notes" && (
                  <>
                    <label>files</label>
                    <input
                      type="file"
                      name="files"
                      onChange={(event: any) => {
                        formik.setFieldValue(
                          "files",
                          event.currentTarget.files
                        );
                      }}
                      multiple
                    />
                  </>
                )}
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

export default AddWorkItem;
