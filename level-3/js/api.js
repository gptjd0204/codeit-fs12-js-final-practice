import { showMessage } from "./render/ui.js";

const BASE_URL = "http://localhost:4000/expenses";

// READ : 지출 목록 조회
export async function getExpenseList() {
  try {
    const response = await fetch(BASE_URL);

    const expenseList = await response.json();
    console.log("지출 목록 조회 성공 => ", expenseList);
    showMessage("success", "지출 목록 조회!");
    return expenseList;
  } catch (error) {
    showMessage("error", error);
    console.error("지출 목록 조회에 실패했습니다.");
  }
}

// CREATE : 지출 내용 추가
export async function createExpense(date, category, description, amount) {
  const newExpense = {
    date,
    category,
    description,
    amount,
  };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    const expense = await response.json();
    console.log("지출 내역 추가 성공 => ", expense);
    showMessage("success", "지출 내역 추가!");
  } catch (error) {
    showMessage("error", error);
    console.error("지출 내역 추가에 실패했습니다.");
  }
}

// UPDATE : 지출 내용 수정
export async function updateExpense(id, date, category, description, amount) {
  const patchExpense = {
    date,
    category,
    description,
    amount,
  };

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchExpense),
    });
    const updatedExpense = await response.json();
    console.log("지출 내역 수정 성공 => ", updatedExpense);
    showMessage("success", "지출 내역 수정!");
  } catch (error) {
    showMessage("error", error);
    console.error("지출 내역 수정에 실패했습니다.");
  }
}

// DELETE : 지출 내용 삭제
export async function deleteExpense(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const deletedExpense = await response.json();
    console.log("지출 내역 삭제 성공 => ", deletedExpense);
    showMessage("success", "지출 내역 삭제!");
  } catch (error) {
    showMessage("error", error);
    console.error("지출 내역 삭제에 실패했습니다.");
  }
}
