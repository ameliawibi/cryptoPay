import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import PageHeader from "../components/atoms/PageHeader";
import { Box, Avatar, Text, HStack, Button } from "@chakra-ui/react";
import axios from "axios";
import { url } from "../utils/url";

export default function Payroll() {
  ///// ######## BLOCKCHAIN ######## /////////
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain.smartContract, dispatch]);

  console.log(blockchain.smartContract);
  console.log(data);

  const bulkTransfer = (addressArr, amountsArr) => {
    console.log(addressArr);
    console.log(amountsArr);
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
  ///// ######## BLOCKCHAIN ######## /////////

  ///// ######## SQL ######## /////////
  const [payrollData, setPayrollData] = useState(null);
  const [transferWallet, setTransferWallet] = useState(null);
  const [transferAmount, setTransferAmount] = useState(null);

  const initialize = async () => {
    try {
      const response = await axios.get(`${url}/payroll/`);

      if (response) {
        let timesheet_items = response.data.timesheet_items
          .map((Item) => ({
            ...Item,
            ...Item.User,
            ...Item.Timesheet,
          }))
          .map((Item) => {
            delete Item.User;
            delete Item.Timesheet;
            return Item;
          });
        console.log(timesheet_items);
        setPayrollData(timesheet_items);

        /*for (const [key, value] of Object.entries(timesheet_items[0])) {
          if (key === "walletAddress") {
            console.log(`${key}: ${value}`);
          }
        }
        */
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///// ######## SQL ######## /////////

  return (
    <Box
      minH={"95vh"}
      h={"100%"}
      w={"100%"}
      bgGradient="linear(to-l, purple.800, blue.700)"
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box
          bg={"white"}
          p={7}
          w={"90%"}
          margin={"auto"}
          mt={"10"}
          boxShadow="md"
          rounded="md"
          h={"100%"}
          minH={"85vh"}
        >
          <PageHeader text={"Payroll"} />
          {payrollData &&
            payrollData.map((item) => (
              <Box key={item.id}>
                <Box
                  boxShadow="md"
                  rounded="md"
                  display="flex"
                  alignItems="center"
                  alignContent="center"
                  p={6}
                >
                  <HStack spacing={10}>
                    <Avatar name={item.name} size="lg" p={3} />
                    <Text fontSize="sm"> {item.name}</Text>
                    <Text fontSize="sm">Month: {Number(item.month) + 1}</Text>
                    <Text fontSize="sm">Year: {item.year}</Text>
                    <Text fontSize="sm">Total Pay: {item.totalPay}</Text>
                    <Text fontSize="sm">Tokens Paid: {item.tokensPaid}</Text>
                    <Text fontSize="sm">
                      To be Paid: {item.totalPay - item.tokensPaid}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            ))}
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <Button
              mt={10}
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              Connect to Wallet
            </Button>
          ) : (
            <main>
              <Button
                mt={10}
                mr={8}
                onClick={(e) => {
                  e.preventDefault();
                  bulkTransfer(
                    [
                      "0xC28beACBa01F3Ca4a67E40068a61891027C8F540",
                      "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
                    ],
                    [(2 * 10 ** 18).toString(), "2"]
                  );
                }}
              >
                Bulk transfer
              </Button>
              <Text>Wallet Connected</Text>
            </main>
          )}
        </Box>
      </main>
    </Box>
  );
}
