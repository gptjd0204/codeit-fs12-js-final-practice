import { deleteExpense, getExpenseList } from "../api.js";
import * as main from "../main.js";

const expensesListEl = document.querySelector("#expenses-list");

export async function renderExpenseList(sort) {
  // error: 계속 error가 발생했는데 async / await을 사용하니 오류 발생 X
  // import로 불러온 getExpenseList를 사용할때 async / await을 사용해야함
  const expensesList = !sort ? await getExpenseList() : await sort;
  expensesListEl.innerHTML = "";

  expensesList.forEach((expense) => {
    const tr = document.createElement("tr");
    const { id, ...expenseData } = expense;
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.textContent = "수정";
    deleteBtn.textContent = "삭제";
    // 지출 내역 나열
    for (const data in expenseData) {
      const dataTh = document.createElement("th");
      dataTh.textContent = expenseData[data];
      tr.appendChild(dataTh);
    }

    const editTh = document.createElement("th");
    const deleteTh = document.createElement("th");
    // 수정 버튼 이벤트 리스너
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // 입력란에 수정할 지출 내역 표시
      main.dateInput.value = expense.date;
      main.categoryInput.value = expense.category;
      main.descriptionInput.value = expense.description;
      main.amountInput.value = expense.amount;
      // 수정할 지출 내역 id 설정
      main.submitBtn.dataset.id = id;
      main.submitBtn.textContent = "수정";
      main.submitBtn.classList.add("patch");
    });

    // 삭제 버튼 이벤트 리스너
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      deleteExpense(id);
    });
    editTh.appendChild(editBtn);
    deleteTh.appendChild(deleteBtn);

    tr.appendChild(editTh);
    tr.appendChild(deleteTh);

    expensesListEl.appendChild(tr);
  });

  console.log("지출 목록 조회 성공 했습니다.");
}
