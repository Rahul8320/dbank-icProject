import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank{
  stable var accountBalance:Float = 300; // for mutable variable that store the state after deploy
  // accountBalance := 300; // asign new value

  let id = 232323232; // for constatnt or immutable variable
  stable var startTime = Time.now();
  // startTime := Time.now();

  Debug.print(debug_show(accountBalance)); // print the value on terminal

  public func topUp(amount: Float) {
    accountBalance += amount;
    Debug.print(debug_show(accountBalance));
  };

  public func withdraw(amount: Float) {
    if(accountBalance >= amount) {
      accountBalance -= amount;
      Debug.print(debug_show(accountBalance));
    }else{
      Debug.print("Insufficent Balance!.");
    }
  };

  public query func checkBalance(): async Float {
    return accountBalance;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsed = (currentTime - startTime) / 1000000000;
    accountBalance := accountBalance * (1.0000001 ** Float.fromInt(timeElapsed));
    startTime := currentTime;
  };

};
