import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { handleLogin } from "../../reducers/authSlice";
import { setTab } from "../../reducers/navigationSlice";
import { useDispatch } from "react-redux";

const Login = (props: any) => {
  const dispatch = useDispatch();
  let { handleChooseSignin } = props;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: any) => {
      console.log(values);
      dispatch(handleLogin(null));
      dispatch(setTab({ index: 1, name: "Home" }));
    },
  });
  return (
    <Box>
      <Text fontSize="2xl" textAlign="center" pb="4" fontWeight={"bold"}>
        Login
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex gap={2} flexDir="column">
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
            placeholder="Enter your password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
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
            Don't Have an account?{" "}
            <Text
              onClick={handleChooseSignin}
              cursor="pointer"
              as={"span"}
              color="blue.400"
            >
              Signup
            </Text>
          </Text>
        </Flex>
      </form>
    </Box>
  );
};

export default Login;
