# Token

This is a project to transfer or buy my on-chain tokens. This project was inspired by [Curve Finance] (https://curve.fi/#/ethereum/swap). In Curve, you can transfer all kinds of crypto currency, but in my token project, you can only transfer the KCON token. You can get 10,000 free KCON tokens on your first visit.


You can visit [Ksurv] (https://emuqj-xyaaa-aaaam-abana-cai.ic0.app/) if my entire IC cycle is not burned 😂😂. I got some TC (trillion cycles) for free by joining the IC or DFX communities. As a result, after a while, all of the cycles will burn out, and we will no longer be able to host this site. But we can also buy Cycle, but it is priced in dollers, and my salary also does not come in dollers 😂😂.

Fort end is built with react js. 


# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: ygnih-wdxri-7mk35-bkhaf-ndciv-zttnh-zouhs-z3amu-2az7k-kxw7w-bre


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister


1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transferAmount "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transferAmount "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app