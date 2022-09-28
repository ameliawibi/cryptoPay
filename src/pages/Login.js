import { Center, Flex, Image, Box } from "@chakra-ui/react";
import LoginForm from "../components/templates/LoginForm";
import landingImage from "../landingImage.jpg";

export default function LoginPage() {
  return (
    <>
      <Box position={"relative"}>
        <Image w={"100%"} h={"100vh"} objectFit="fill" src={landingImage} />
      </Box>
      {/* <Flex w={"100%"} h={"100vh"}> */}
      <Flex
        w={"400px"}
        justifyContent={"center"}
        alignContent="center"
        flexDirection={"column"}
        position="absolute"
        left={"10%"}
        top={"35%"}
      >
        <Box>
          <LoginForm />
        </Box>
      </Flex>
      {/* </Flex> */}
    </>
  );
}
