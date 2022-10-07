import { Box, Heading } from "@chakra-ui/react";
import TextGroup from "../atoms/TextGroup";

export default function WalletInformation({ salary, wallet }) {
  return (
    <Box>
      <Heading as="h4" size="md" mt={5} color={"blue.800"} mb={6}>
        Your Wallet
      </Heading>
      <TextGroup head={"salary"} text={salary} />
      <TextGroup head={"wallet"} text={wallet} />
    </Box>
  );
}
