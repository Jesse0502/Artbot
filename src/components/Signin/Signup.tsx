import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { useFormik } from "formik";

const Signup = (props: any) => {
  let { handleChooseSignin } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values: any) => {
      console.log(values);
    },
  });
  return (
    <Box>
      <Text fontSize="2xl" textAlign="center" pb="4" fontWeight={"bold"}>
        Signup
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex gap={2} flexDir="column">
          <label>Name</label>
          <Input
            isRequired
            placeholder="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
          />
          <label>Email</label>
          <Input
            isRequired
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          <label>Password</label>
          <Input
            isRequired
            type="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
          />
          <label>Confirm Password</label>
          <Input
            isRequired
            type="password"
            placeholder="ReEnter your password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            name="confirmPassword"
          />

          <Button
            _active={{}}
            _hover={{}}
            type="submit"
            bg="blue.400"
            color="white"
          >
            Submit
          </Button>
          <Text>
            Already Have an account?{" "}
            <Text
              onClick={handleChooseSignin}
              cursor="pointer"
              as={"span"}
              color="blue.400"
            >
              Login
            </Text>
          </Text>
        </Flex>
      </form>
    </Box>
  );
};

export default Signup;
