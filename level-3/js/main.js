import { createExpense, updateExpense } from "./api.js";
import { renderExpenseList } from "./render/list.js";
import { sortList } from "./utils.js";

export const expenseForm = document.getElementById("expense-form");
export const dateInput = document.getElementById("date");
export const categoryInput = document.getElementById("category");
export const descriptionInput = document.getElementById("description");
export const amountInput = document.getElementById("amount");
export const submitBtn = document.getElementById("submit-btn");
const recentSortBtn = document.querySelector("#recent-sort");
const oldSortBtn = document.querySelector("#old-sort");
const amountDescBtn = document.querySelector("#amount-desc");
const amountAscBtn = document.querySelector("#amount-asc");

// 지출 내역 추가 및 수정 버튼 이벤트 리스너
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = dateInput.value;
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();
  const amount = amountInput.value.trim();
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
  dateInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
  amountInput.value = "";
});

recentSortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.add("active");
  oldSortBtn.classList.remove("active");
  amountAscBtn.classList.remove("active");
  amountDescBtn.classList.remove("active");

  renderExpenseList(sortList("recent"));
});

oldSortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.add("active");
  recentSortBtn.classList.remove("active");
  amountAscBtn.classList.remove("active");
  amountDescBtn.classList.remove("active");

  renderExpenseList(sortList("old"));
});

amountDescBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.add("active");
  amountAscBtn.classList.remove("active");
  recentSortBtn.classList.remove("active");
  oldSortBtn.classList.remove("active");

  renderExpenseList(sortList("amountDesc"));
});

amountAscBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.add("active");
  amountDescBtn.classList.remove("active");
  recentSortBtn.classList.remove("active");
  oldSortBtn.classList.remove("active");

  renderExpenseList(sortList("amountAsc"));
});

// 지출 목록 출력
renderExpenseList();
