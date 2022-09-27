import { Center, Flex, Image, Box } from "@chakra-ui/react";
import LoginForm from "../components/templates/LoginForm";
import landingImage from "../landingImage.jpg";

export default function LoginPage() {
  return (
    <>
      <Box position={"relative"}>
        <Image
          w={"100%"}
          h={"100vh"}
          objectFit="fill"
          src="https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-with-digital-circuit-lines-background_1017-33592.jpg?w=1380&t=st=1664295865~exp=1664296465~hmac=81f7985e8d03eadbbb1f94ffefd4694cddbca47c7b3060d7b343f5bb708c338c"
        />
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
