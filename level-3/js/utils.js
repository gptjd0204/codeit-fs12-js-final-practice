import { getExpenseList } from "./api.js";

export async function sortList(type) {
  const expenseList = await getExpenseList();
  const copiedExpenseList = [...expenseList];
  if (!expenseList) {
    console.log("목록 조회를 실패했습니다!");
    return;
  }

  if (type === "recent") {
    const sortList = copiedExpenseList
      .sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      })
      .reverse();

    console.log("최신순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "old") {
    const sortList = copiedExpenseList.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    console.log("오래된순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "amountDesc") {
    const sortList = copiedExpenseList.sort((a, b) => b.amount - a.amount);

    console.log("높은 금액순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "amountAsc") {
    const sortList = copiedExpenseList.sort((a, b) => a.amount - b.amount);

    console.log("낮은 금액순으로 정렬 => ", sortList);
    return sortList;
  } else {
    return copiedExpenseList;
  }
}
