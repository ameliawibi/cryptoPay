import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import Background from "../components/atoms/Background";

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

  return (
    <Background>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(connect());
          }}
        >
          Connect to Wallet
        </button>
      ) : (
        <p>Wallet Connected</p>
      )}
      <br />
      <h2>Payroll</h2>
      <button
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
      </button>
    </Background>
  );
}
