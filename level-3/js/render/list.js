import { getExpenseList } from "../api.js";

const expensesListEl = document.querySelector("#expenses-list");

export async function renderExpenseList() {
  // error: 계속 error가 발생했는데 async / await을 사용하니 오류 발생 X
  // import로 불러온 getExpenseList를 사용할때 async / await을 사용해야함
  const expensesList = await getExpenseList();

  expensesList.forEach((expense) => {
    const tr = document.createElement("tr");
    const { id, ...expenseData } = expense;
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.textContent = "수정";
    deleteBtn.textContent = "삭제";

    for (const data in expenseData) {
      const dataTh = document.createElement("th");
      dataTh.textContent = expenseData[data];
      tr.appendChild(dataTh);
    }
    const editTh = document.createElement("th");
    const deleteTh = document.createElement("th");

    editTh.appendChild(editBtn);
    deleteTh.appendChild(deleteBtn);

    tr.appendChild(editTh);
    tr.appendChild(deleteTh);

    expensesListEl.appendChild(tr);
  });

  console.log("지출 목록 조회 성공 했습니다.");
}
