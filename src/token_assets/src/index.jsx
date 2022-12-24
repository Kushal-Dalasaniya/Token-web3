import ReactDOM  from "react-dom/client";
import React from 'react'
import App from "./components/App";
import {AuthClient} from "@dfinity/auth-client"

const init = async () => { 
  const authClient=await AuthClient.create();

  if(await authClient.isAuthenticated()){
    handleAuthenticated(authClient);
  }
  else{
    await authClient.login({
      identityProvider:"https:/identity.ic0.app/#authorize",
      onSuccess:()=>{
        handleAuthenticated(authClient);
      }
    });
  }

  //for  deploy on live internet computer coment next two line and uncoment all comented lines
  // const root = ReactDOM.createRoot(document.getElementById("root"));
  // root.render(<App />);
}

async function handleAuthenticated(AuthClient){
  const identity=await AuthClient.getIdentity();
  const userPrincipal=identity._principal.toString();
  console.log(userPrincipal);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App  loggedInPrincipal={userPrincipal} forceRefresh={true}/>);
}

init();


