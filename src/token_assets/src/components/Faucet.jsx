import React, { useState } from "react";
import { token,canisterId,createActor} from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisable,setDisable]=useState(false);
  const [buttenText,setButtenText]=useState("Gimme gimme");

  async function handleClick(event) {
      setDisable(true);
       
      const authClient = await AuthClient.create();
      const identity = await authClient.getIdentity();

      const authenticatedCanister=createActor(canisterId,{
        agentOptions:{identity,},
      });

      const str=await authenticatedCanister.payOut();

      // if want to deploy code on internet coputer remove this line and uncoment othe lines
      // const str=await token.payOut();
      
      setButtenText(str);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free KushCon tokens here! Claim 10,000 KCON coins to {props.userPrincipal} .</label>

      {/* remove this line for live internet computer and uncoment all comented lines */}
      {/* <label>Get your free KushCon tokens here! Claim 10,000 KCON coins to  2vxsx-fae.</label> */}
      
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisable}>
          {buttenText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
