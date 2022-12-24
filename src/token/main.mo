import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor Token{
    let owner=Principal.fromText("ygnih-wdxri-7mk35-bkhaf-ndciv-zttnh-zouhs-z3amu-2az7k-kxw7w-bae");
    let totalSupply:Nat = 1000000000;
    let symbol : Text = "KCON";

    var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    stable var balanceEntries: [(Principal,Nat)]=[];
    if(balances.size() < 1){
        balances.put(owner,totalSupply);
    };

    public query func balanceOf(who:Principal):async Nat{
        let bal:Nat=switch(balances.get(who)){
            case null 0;
            case (? result) result;
        };
        Debug.print(debug_show(bal));
        return bal;
    };

    public shared(msg) func payOut():async Text{
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller)==null){
            var mesg:Text=await transferAmount(msg.caller,10000);
            // balances.put(msg.caller,10000);
            return mesg;
        }
        else{
            return "Already claimed";
        }
    };

    public shared(msg) func transferAmount(to:Principal ,amount:Nat):async Text{
        var senderAmount= await balanceOf(msg.caller);

        if(senderAmount >= amount){
            var newAmount:Nat= senderAmount-amount;
            balances.put(msg.caller,newAmount);

            var receiverAmount=await balanceOf(to);
            balances.put(to,(receiverAmount + amount));
            return "succsess";
        }
        else{
            return "Insufficient Amount";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);   
        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        }
    };
}