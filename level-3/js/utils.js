import { getExpenseList } from "./api.js";

// 카테고리별 필터 및
// 최신순 / 오래된순 / 높은금액순 / 낮은금액순 정렬
export async function getSortList(category, type) {
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
export async function getTotalAmount() {
  const expenseList = await getExpenseList();
  if (!expenseList) {
    console.error("목록 조회에 실패했습니다!");
    return;
  }

  // error: sum + cur.amount를 사용하였을 때, 제대로 된 값이 나오지 않았다.
  // 지출 내역을 추가할 때 입력한 금액은 문자열로 저장되어 있기 때문에
  // Number()를 활용해야 정상적인 값이 나온다.
  const total = expenseList.reduce((sum, cur) => {
    return sum + Number(cur.amount);
  }, 0);

  console.log("지출 총합 => ", total);
  return total;
}

// 카테고리별 총합 계산
export async function getCategoryAmount() {
  const expenseList = await getExpenseList();
  const categories = ["식비", "교통", "쇼핑", "문화", "기타"];

  let allCategoryAmount;
  categories.forEach((category) => {
    const categoryFilter = expenseList.filter(
      (expense) => category === expense.category,
    );

    const categoryTotal = categoryFilter.reduce((sum, cur) => {
      return sum + Number(cur.amount);
    }, 0);

    // []를 사용하면 객체의 key를 인자값으로 설정 가능 (대괄호 표기법)
    const categoryAmount = {
      [category]: categoryTotal,
    };

    allCategoryAmount = { ...allCategoryAmount, ...categoryAmount };
  });

  console.log("카테고리 총합 계산 완료 => ", allCategoryAmount);
  return allCategoryAmount;
}

// 평균 지출 계산
export async function getAvgAmount() {
  const expenseList = await getExpenseList();
  const totalAmount = await getTotalAmount();

  console.log(
    "평균 지출 계산 완료 => ",
    (totalAmount / expenseList.length).toFixed(0),
  );
  return (totalAmount / expenseList.length).toFixed(0);
}

// 카테고리별 평균 지출 계산
export async function getCategoryAvgAmount(category) {
  const expenseList = await getExpenseList();
  const categoryAmount = await getCategoryAmount();

  const categoryFilter = expenseList.filter(
    (expense) => category === expense.category,
  );

  const categoryTotal = categoryAmount[category];
  console.log(
    "카테고리 평균 지출 계산 완료 => ",
    (categoryTotal / categoryFilter.length).toFixed(0),
  );
  return (categoryTotal / categoryFilter.length).toFixed(0);
}
