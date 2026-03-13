import { getExpenseList } from "./api.js";

// 카테고리별 필터 및
// 최신순 / 오래된순 / 높은금액순 / 낮은금액순 정렬
export async function sortList(category, type) {
  const expenseList = await getExpenseList();
  if (!expenseList) {
    console.error("목록 조회에 실패했습니다!");
    return;
  }

  const copiedExpenseList = [...expenseList];
  let categoryFilterList = copiedExpenseList;

  // 카테고리별 필터링
  if (category === "all") {
    console.log(`카테고리 "전체" 필터 성공 => `, categoryFilterList);
  } else {
    categoryFilterList = copiedExpenseList.filter((expense) => {
      return category === expense.category;
    });
    console.log(`카테고리 "${category}" 필터 성공 => `, categoryFilterList);
  }

  // 최신순 / 오래된순 / 높은금액순 / 낮은금액순 정렬
  if (type === "recent") {
    const sortList = categoryFilterList
      .sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      })
      .reverse();

    console.log("최신순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "old") {
    const sortList = categoryFilterList.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    console.log("오래된순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "amountDesc") {
    const sortList = categoryFilterList.sort((a, b) => b.amount - a.amount);

    console.log("높은 금액순으로 정렬 => ", sortList);
    return sortList;
  } else if (type === "amountAsc") {
    const sortList = categoryFilterList.sort((a, b) => a.amount - b.amount);

    console.log("낮은 금액순으로 정렬 => ", sortList);
    return sortList;
  } else {
    return categoryFilterList;
  }
}

// 총합 계산
export async function totalAmount() {
  const expenseList = await getExpenseList();
  if (!expenseList) {
    console.error("목록 조회에 실패했습니다!");
    return;
  }

  const copiedExpenseList = [...expenseList];

  // error: sum + cur.amount를 사용하였을 때, 제대로 된 값이 나오지 않았는데
  // 지출 내역을 추가할 때 입력한 금액은 문자열로 저장되어 있기 때문에
  // Number()를 활용해야 정상적인 값이 나온다.
  const total = copiedExpenseList.reduce((sum, cur) => {
    return sum + Number(cur.amount);
  }, 0);

  console.log("지출 총합 => ", total);
  // console.log("지출 총합 => ", typeof total);
  return total;
}
