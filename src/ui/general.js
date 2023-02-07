const $cardTitle = document.querySelector("#card-title");
const $cardText = document.querySelector("#card-text");
const $cardDado = document.querySelector("#dado");
const info = "https://api.adviceslip.com/advice";
let operador;

function chargeInfo(id, text) {
  $cardTitle.textContent = `ADVICE # ${id}`;
  $cardText.textContent = `"${text}"`;
  return id;
}

async function awaitInfo() {
  $cardText.textContent = "charge...";
  $cardTitle.textContent = `ADVICE # charge...`;
}

$cardDado.addEventListener("click", async () => {
  await chargeCard();
});

async function callInfo(json) {
  const $chargeInfo = await chargeInfo(json.slip.id, json.slip.advice);
  if (operador !== $chargeInfo) {
    operador = $chargeInfo;
  } else if (operador === $chargeInfo) {
    await awaitInfo();
    await chargeCard();
  }
}

async function chargeCard() {
  const respuesta = await fetch(info);
  const json = await respuesta.json();
  callInfo(json);
}

export function init() {
  chargeCard(info);
}
