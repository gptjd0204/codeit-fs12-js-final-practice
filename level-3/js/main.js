import { createExpense, updateExpense } from "./api.js";
import { renderExpenseList } from "./render/list.js";

export const expenseFormEl = document.getElementById("expense-form");
export const dateInputEl = document.getElementById("date");
export const categoryInputEl = document.getElementById("category");
export const descriptionInputEl = document.getElementById("description");
export const amountInputEl = document.getElementById("amount");
export const submitBtn = document.getElementById("submit-btn");

// 지출 내역 추가 및 수정 버튼 이벤트 리스너
expenseFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = dateInputEl.value;
  const category = categoryInputEl.value;
  const description = descriptionInputEl.value.trim();
  const amount = amountInputEl.value.trim();
  if (!(date && category && description && amount)) {
    return;
  }
  if (submitBtn.classList.contains("patch")) {
    const expenseId = submitBtn.dataset.id;
    updateExpense(expenseId, date, category, description, amount);
    submitBtn.classList.remove("patch");
    console.log("지출 내역 수정 성공!");
  } else {
    createExpense(date, category, description, amount);
    console.log("지출 내역 추가 성공!");
  }
  dateInputEl.value = "";
  categoryInputEl.value = "";
  descriptionInputEl.value = "";
  amountInputEl.value = "";
});

// 지출 목록 출력
renderExpenseList();
