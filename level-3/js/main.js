import { createExpense } from "./api.js";
import { renderExpenseList } from "./render/list.js";

const expenseFormEl = document.querySelector("#expense-form");
const dateInputEl = document.querySelector("#date");
const categoryInputEl = document.querySelector("#category");
const descriptionInputEl = document.querySelector("#description");
const amountInputEl = document.querySelector("#amount");
const submitBtn = document.querySelector("#submit-btn");

expenseFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = dateInputEl.value;
  const category = categoryInputEl.value;
  const description = descriptionInputEl.value.trim();
  const amount = amountInputEl.value.trim();
  if (date && category && description && amount) {
    createExpense(date, category, description, amount);
    dateInputEl.value = "";
    categoryInputEl.value = "";
    descriptionInputEl.value = "";
    amountInputEl.value = "";
    console.log("지출 내역 추가 성공!");
  }
});

renderExpenseList();
