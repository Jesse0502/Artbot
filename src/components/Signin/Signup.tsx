import React, { useState } from "react";
import { Box, Text, Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { handleSignup } from "../../reducers/authSlice";
const Signup = (props: any) => {
  let { handleChooseSignin } = props;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values: any) => {
      setLoading(true);
      let res = await dispatch(handleSignup(values));
      if (!res.type.includes("fulfilled")) {
        setLoading(false);
        toast({
          title: "Some unexpected error occurred!",
          description: "Please try again.",
          duration: 3000,
          status: "error",
          position: "bottom-right",
        });
        return;
      }

      if (
        res.payload.data.msg.includes("exists") ||
        res.payload.data.msg.includes("match")
      ) {
        toast({
          title: "Error",
          description: res.payload.data.msg,
          duration: 3000,
          status: "error",
          position: "bottom-right",
        });
        setLoading(false);
        return;
      }
      toast({
        title: "Signup was successful!",
        description: res.payload.data.msg,
        duration: 3000,
        status: "success",
        position: "bottom-right",
      });
      setLoading(false);
      return;
    },
  });
  return (
    <Box>
      <Text fontSize="2xl" textAlign="center" pb="4" fontWeight={"bold"}>
        Signup
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
