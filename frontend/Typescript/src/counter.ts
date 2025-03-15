// export function setupCounter(element: HTMLButtonElement) {
//   // let counter = 0
//   // const setCounter = (count: number) => {
//   //   counter = count
//   //   element.innerHTML = `count is ${counter}`
//   // }
//   // element.addEventListener('click', () => setCounter(counter + 1))
//   // setCounter(0)
// }

  function handleButtonClick() {
    window.location.href = "https://5173/selectPage";
  }
const buttonElement = document.getElementById("myButton");

if (buttonElement) {
  buttonElement.addEventListener("click", handleButtonClick);
}

