import { getExpenseList } from "./api.js";

export async function dateSort(type) {
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
  } else {
    const sortList = copiedExpenseList.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    console.log("오래된순으로 정렬 => ", sortList);
    return sortList;
  }
}
