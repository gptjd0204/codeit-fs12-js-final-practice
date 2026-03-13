import { getCategoryAmount, getTotalAmount } from "../utils.js";

const totalAmountVal = document.querySelector("#total-amount");
const categoryTotalList = document.querySelector("#category-total-list");

export async function renderStats() {
  const total = await getTotalAmount();
  const categoryTotal = await getCategoryAmount();

  totalAmountVal.textContent = `${total}원`;

  for (const [key, value] of Object.entries(categoryTotal)) {
    if (value <= 0) {
      continue;
    }
    const categoryTotalEl = document.createElement("li");
    categoryTotalEl.textContent = `${key} : ${value}원`;
    categoryTotalList.appendChild(categoryTotalEl);
  }
}
