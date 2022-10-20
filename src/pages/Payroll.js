import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import PageHeader from "../components/atoms/PageHeader";
import { Box, Avatar, Text, HStack, Button } from "@chakra-ui/react";
import axios from "axios";
import { url } from "../utils/url";
import pageBackground from "../pageBg.jpg";
import PayrollData from "../components/templates/PayrollTable";
import Footer from "../components/atoms/Footer";

export default function Payroll() {
  ///// ######## BLOCKCHAIN ######## /////////
  const [defaultValues, setDefaultValues] = useState(null);
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
        axios
          .post(`${url}/update-payroll`, { timesheet_items: defaultValues })
          .then((res) => {
            console.log(res);
            initialize();
          })
          .catch((e) => {
            console.log(e);
          });
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
        setDefaultValues(response.data.timesheet_items);
        let timesheet_items = response.data.timesheet_items
          .map((Item) => ({
            ...Item,
            ...Item.User,
            ...Item.Timesheet,
          }))
          .map((Item) => {
            Item["toBePaid"] = Item["totalPay"] - Item["tokensPaid"];
            delete Item.User;
            delete Item.Timesheet;
            return Item;
          });
        console.log(timesheet_items);
        setPayrollData(timesheet_items);
        let walletAddresses = [];
        let toBePaidArray = [];
        for (let i = 0; timesheet_items.length > i; i++) {
          for (const [key, value] of Object.entries(timesheet_items[i])) {
            if (key === "walletAddress") {
              walletAddresses.push(value);
            }
            if (key === "toBePaid") {
              toBePaidArray.push((value * 10 ** 18).toString());
            }
          }
        }
        setTransferWallet(walletAddresses);
        setTransferAmount(toBePaidArray);
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
      // bg={"gray.100"}
      bgImage={pageBackground}
      bgSize={"cover"}
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box w={"90%"} margin={"auto"} mt={"10"}>
          <PageHeader text={"Payroll"} />
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <Button
              variant="outline"
              color={"white"}
              size={"sm"}
              fontWeight={"light"}
              _hover={{ bg: "gray.100", color: "#001a37" }}
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
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  bulkTransfer(transferWallet, transferAmount);
                }}
              >
                Bulk transfer
              </Button>
              <Text>Wallet Connected</Text>
            </main>
          )}
        </Box>

        <PayrollData data={payrollData} />
        <Footer />
      </main>
    </Box>
  );
}
