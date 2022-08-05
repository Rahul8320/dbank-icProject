import { dbank } from "../../declarations/dbank";

const currentBalance = async () => {
  const balance = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(balance * 10000) / 10000;
}

window.addEventListener("load", async () => {
  currentBalance();
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const topupAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  const button = document.getElementById("submit-btn");

  if (topupAmount || withdrawAmount) {
    button.disabled = true;
    button.value = "Please wait ....";
    if (topupAmount) {
      await dbank.topUp(topupAmount);
      document.getElementById("input-amount").value = "";
    }
    if (withdrawAmount) {
      await dbank.withdraw(withdrawAmount);
      document.getElementById("withdrawal-amount").value = "";
    }
    await dbank.compound();
    button.disabled = false;
    button.value = "Finalise Transaction";
    currentBalance();
  }
  else {
    alert("Please enter any amount!");
    return;
  }
});