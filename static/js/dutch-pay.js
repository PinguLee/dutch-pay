document.getElementById('calculator-btn').addEventListener('click', () => {
  const getValue = (id) => parseInt(document.getElementById(id).value);

  const mainFood = getValue('main-food');
  const totalPeople = getValue('total-people');
  const alcoholPeople = getValue('alcohol-people');
  const alcoholCost = getValue('alcohol-cost');
  const drinkPeople = getValue('drink-people');
  const drinkCost = getValue('drink-cost');

  if ([mainFood, totalPeople, alcoholPeople, alcoholCost, drinkPeople, drinkCost].some((value) => value < 0)) {
    alert('음수 값을 입력할 수 없습니다.');
    return;
  }

  const calculateShare = (cost, people) => cost / people;
  const roundToNearestTen = (value) => Math.round(value / 10) * 10;

  const mainCost = mainFood / totalPeople;
  const alcoholShare = calculateShare(alcoholCost, alcoholPeople);
  const drinkShare = calculateShare(drinkCost, drinkPeople);

  const mainAlcohol = mainCost + alcoholShare;
  const mainDrink = mainCost + drinkShare;

  const mainAlcoholRound = roundToNearestTen(mainAlcohol);
  const mainDrinkRound = roundToNearestTen(mainDrink);

  const resultText = `
  각각 부담할 금액 :
  - 술 마신 사람 : ${mainAlcoholRound} 원
  - 음료 마신 사람 : ${mainDrinkRound} 원`;

  const newWindow = window.open();
  newWindow.document.write(
    `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>더치페이 결과</title>
      <link rel="stylesheet" href="/static/css/resultStyle.css">
    </head>
    <body>
      <div id="root">
        <div>
          <pre>
          ${resultText}
          </pre>
        </div>
        <form id="result">
          <label for="bank-select">은행 선택:</label>
          <select id="bank-select">
            <!-- 여기에 은행 목록 추가 -->
          </select><br />

          <label for="account-number">은행 계좌:</label>
          <input type="text" id="account-number" placeholder="은행 계좌 입력" /><br />

          <input type="button" id="send-kakao-btn" value="전송">
        </form>
      </div>
    </body>
    </html>
    `
  );
});
