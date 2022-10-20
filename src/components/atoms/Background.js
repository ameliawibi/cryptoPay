import { Box } from "@chakra-ui/react";
import PageHeader from "./PageHeader";
import pageBackground from "../../pageBg.jpg";
import Footer from "./Footer";

export default function Background(props) {
  return (
    <Box
      minH={"94.3vh"}
      h={"100%"}
      w={"100%"}
      // bg={"gray.100"}
      bgImage={pageBackground}
      bgSize={"cover"}
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box w={"90%"} margin={"auto"} mt={"10"}>
          <PageHeader text={props.title} />
        </Box>
        <Box
          boxShadow="md"
          p="6"
          w={"90%"}
          margin={"auto"}
          mt={"5"}
          rounded="md"
          bg="white"
          // minH={"75vh"}
          h={"100%"}
        >
          {props.children}
        </Box>
        <Footer />
      </main>
    </Box>
  );
}
