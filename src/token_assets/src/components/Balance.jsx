import React,{useState} from "react";
import {Principal} from '@dfinity/principal';
import { token } from "../../../declarations/token";

function Balance() {
  
  const [inputValue,SetInputValue]=useState("");
  const [balance,setBalance]=useState("");

  async function handleClick() {
    // console.log("Balance Button Clicked");
    const principal=Principal.fromText(inputValue);
    const bal=await token.balanceOf(principal)
    console.log(bal);
    setBalance("Your account balance is " + bal.toLocaleString()+" KCON.");
    SetInputValue("");
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(event)=>{ SetInputValue(event.target.value) } }
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>{balance}</p>
    </div>
  );
}

export default Balance;
