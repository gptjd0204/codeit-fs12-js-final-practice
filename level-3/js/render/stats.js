import {
  getAvgAmount,
  getCategoryAmount,
  getTotalAmount,
  getCategoryAvgAmount,
} from "../utils.js";

const totalAmountVal = document.querySelector("#total-amount");
const avgAmountVal = document.querySelector("#avg-amount");
const categoryStatsList = document.querySelector("#category-stats-list");

export async function renderStats() {
  const total = await getTotalAmount();
  const avg = await getAvgAmount();
  const categoryTotal = await getCategoryAmount();

  totalAmountVal.textContent = `${total}원`;
  avgAmountVal.textContent = `${avg}원`;

  for (const [key, value] of Object.entries(categoryTotal)) {
    if (value <= 0) {
      continue;
    }
    const categoryStatsEl = document.createElement("div");
    const categoryEl = document.createElement("span");
    const totalEl = document.createElement("span");
    const avgEl = document.createElement("span");

    categoryStatsEl.classList.add("category-stats");
    categoryEl.classList.add("category-name");

    const categoryAvg = await getCategoryAvgAmount(key);

    categoryEl.textContent = key;
    totalEl.textContent = `${value}원`;
    avgEl.textContent = `${categoryAvg}원`;

    categoryStatsEl.appendChild(categoryEl);
    categoryStatsEl.appendChild(totalEl);
    categoryStatsEl.appendChild(avgEl);

    categoryStatsList.appendChild(categoryStatsEl);
  }
}
