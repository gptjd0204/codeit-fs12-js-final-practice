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
export async function createExpense(params) {}

// UPDATE : 지출 내용 수정
export async function updateExpense(params) {}

// DELETE : 지출 내용 삭제
export async function deleteExpense(params) {}
