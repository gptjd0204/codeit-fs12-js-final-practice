import { totalAmount } from "../utils.js";

const totalAmountValue = document.querySelector("#total-amount");

export async function renderStats() {
  const total = await totalAmount();
  totalAmountValue.textContent = `${total}원`;
}
