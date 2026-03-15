import { createExpense, updateExpense } from "./api.js";
import { renderExpenseList } from "./render/list.js";
import { renderStats } from "./render/stats.js";
import { getSortList } from "./utils.js";

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
const categoryFilterSelect = document.querySelector("#category-filter");

// 정렬 버튼 active 초기화
function activeDefault() {
  amountAscBtn.classList.remove("active");
  amountDescBtn.classList.remove("active");
  recentSortBtn.classList.remove("active");
  oldSortBtn.classList.remove("active");
}

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
  } else {
    createExpense(date, category, description, amount);
  }
  dateInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
  amountInput.value = "";
});

// 최신순 정렬 버튼 이벤트 리스너
recentSortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeDefault();
  this.classList.add("active");

  renderExpenseList(getSortList(categoryFilterSelect.value, "recent"));
});

// 오래된순 정렬 버튼 이벤트 리스너
oldSortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeDefault();
  this.classList.add("active");

  renderExpenseList(getSortList(categoryFilterSelect.value, "old"));
});

// 높은금액순 정렬 버튼 이벤트 리스너
amountDescBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeDefault();
  this.classList.add("active");

  renderExpenseList(getSortList(categoryFilterSelect.value, "amountDesc"));
});

// 낮은금액순 정렬 버튼 이벤트 리스너
amountAscBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeDefault();
  this.classList.add("active");

  renderExpenseList(getSortList(categoryFilterSelect.value, "amountAsc"));
});

// 카테고리 필터 이벤트 리스너
categoryFilterSelect.addEventListener("change", function (e) {
  e.preventDefault();
  activeDefault();

  renderExpenseList(getSortList(this.value));
});

// 지출 목록 출력

renderExpenseList();
renderStats();
