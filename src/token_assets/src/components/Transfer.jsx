import React, { useState } from "react";
import {Principal} from '@dfinity/principal';
import { token,canisterId,createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";

function Transfer() {

  const [isDisable,setDisable]=useState(false);
  const [recipientId,setRecipientId]=useState("");
  const [amt,setAmount]=useState("");
  const [feedBack,setFeedBack]=useState("");
  
  async function handleClick() {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister=createActor(canisterId,{
      agentOptions:{identity,},
    });

    const toPrincipal=Principal.fromText(recipientId);
    
    const result=await authenticatedCanister.transferAmount(toPrincipal,Number(amt));
    
    //for  deploy on live internet computer coment next line and uncoment all comented lines
    // const result = await token.transferAmount(toPrincipal,Number(amt));

    console.log(result);
    setFeedBack(result);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(event)=>{setRecipientId(event.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amt}
                onChange={(event)=>{setAmount(event.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisable}>
            Transfer
          </button>
        </p>
        <p>{feedBack}</p>
      </div>
    </div>
  );
}

export default Transfer;
