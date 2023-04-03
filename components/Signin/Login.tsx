import React, { useState } from "react";
import { Box, Text, Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { handleLogin } from "../../reducers/authSlice";
import { setTab } from "../../reducers/navigationSlice";
import { useDispatch } from "react-redux";

const Login = (props: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let { handleChooseSignin } = props;
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values: any) => {
      setLoading(true);
      const res = await dispatch(handleLogin(values));
      console.log(res);
      if (res.payload.data.msg.includes("incorrect")) {
        setLoading(false);
        toast({
          title: "Incorrect username or password",
          description: "Please try again.",
          duration: 2000,
          status: "error",
          position: "top-right",
        });
        return;
      }
      // if (res.type === "handleLogin/fulfilled" && res.payload.data.token) {
      toast({
        title: "Logged in successfully",
        description: "You're now logged in successfully",
        duration: 2000,
        status: "success",
        position: "top-right",
      });
      dispatch(setTab({ index: 1, name: "Home" } as unknown as any));
      // }
      setLoading(false);
    },
  });
  return (
    <Box>
      <Text fontSize="2xl" textAlign="center" pb="4" fontWeight={"bold"}>
        Login
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex gap={2} flexDir="column">
          <label>Username</label>
          <Input
            isRequired
            placeholder="Enter your username"
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
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
            isLoading={loading}
            _active={{}}
            _hover={{}}
            type="submit"
            bg="blue.400"
            color="white"
          >
            Submit
          </Button>
          <Text>
            Don&apos;t Have an account?{" "}
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
