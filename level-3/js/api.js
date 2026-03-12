const BASE_URL = "http://localhost:4000/expenses";

// READ : 지출 목록 조회
export async function getExpenseList() {
  try {
    const response = await fetch(BASE_URL);
    // if (!response.ok) {
    //   console.error("서버 연결에 실패했습니다.");
    //   return;
    // }

    const expenseList = await response.json();
    console.log("지출 목록 조회 성공 => ", expenseList);
    return expenseList;
  } catch (error) {
    console.error("서버 연결에 실패했습니다.");
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
  } catch (error) {
    console.error("서버 연결에 실패했습니다.");
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
  } catch (error) {
    console.error("서버 연결에 실패했습니다.");
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
  } catch (error) {
    console.error("서버 연결에 실패했습니다.");
  }
}
