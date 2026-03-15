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
    const editIcon = document.createElement("img");
    const deleteIcon = document.createElement("img");
    editIcon.src = "./img/edit-icon.png";
    editIcon.alt = "수정 아이콘";
    editIcon.classList.add("btn-icon");
    deleteIcon.src = "./img/delete-icon.png";
    deleteIcon.alt = "삭제 아이콘";
    deleteIcon.classList.add("btn-icon");
    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);
    // editBtn.textContent = "수정";
    // deleteBtn.textContent = "삭제";
    editBtn.classList.add("edit-btn");
    deleteBtn.classList.add("edit-btn");
    // 지출 내역 나열
    for (const data in expenseData) {
      const dataTd = document.createElement("td");
      dataTd.textContent = expenseData[data];
      tr.appendChild(dataTd);
    }

    const editTd = document.createElement("td");

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

    editTd.appendChild(editBtn);
    editTd.appendChild(deleteBtn);

    tr.appendChild(editTd);

    expensesListEl.appendChild(tr);
  });
}
