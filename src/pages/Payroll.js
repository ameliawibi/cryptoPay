import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { Image, Box, Flex, VStack, Button } from "@chakra-ui/react";
import crypto from "../crypto.png";

export default function Payroll() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  //need to run everytime blockchain account is updated
  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain.smartContract, dispatch]);

  const bulkTransfer = (addressArr, amountsArr) => {
    blockchain.smartContract.methods
      .multiTransfer(addressArr, amountsArr)
      .send({
        from: blockchain.account,
      })
      .once("error", (err) => {
        if (err.code !== 4001) {
          console.log("Something went wrong");
        } else {
          console.log("Please try again");
        }
        console.log(err);
      })
      .then((receipt) => {
        console.log(receipt);
        console.log("Success!");
        dispatch(fetchData(blockchain.account));
      });
  };

  const bulkTransferClick = (e) => {
    e.preventDefault();
    bulkTransfer(
      [
        "0xC28beACBa01F3Ca4a67E40068a61891027C8F540",
        "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      ],
      [(2 * 10 ** 18).toString(), "2"]
    );
  };

  const connectToWalletClick = (e) => {
    e.preventDefault();
    dispatch(connect());
  };

  return (
    <Box
      minH={"95vh"}
      h={"100%"}
      w={"100%"}
      bgGradient="linear(to-l, purple.800, blue.700)"
      overflow={"hidden"}
    >
      <Flex p="6" w={"90%"} margin={"auto"} mt={"20"} h={"100%"}>
        <Box w={"auto"}>
          <Image w={"auto"} h={"300px"} objectFit="fill" src={crypto} />
        </Box>
        <VStack
          p={6}
          rounded={"md"}
          bg={"gray.100"}
          ml={"24px"}
          spacing={"24px"}
          minWidth={"500px"}
        >
          <Box>
            {blockchain.account === "" || blockchain.smartContract === null ? (
              <Button onClick={connectToWalletClick}>Connect to Wallet</Button>
            ) : (
              <Button isDisabled={true}>Wallet Connected</Button>
            )}
          </Box>

          <Box>Payroll</Box>
          <Button colorScheme={"blue"} onClick={bulkTransferClick}>
            Bulk transfer
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
}
