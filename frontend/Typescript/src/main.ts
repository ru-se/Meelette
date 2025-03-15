import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>みーれっと</h1>
    <div class="card">
     
       <button type="button">Start</button>
       
    </div>
    <h2><使い方></h2>
    <h3>①スタートボタンを押してルーレットを選択</h3>
     <h3>②地名・カテゴリ・ジャンルを選択</h3>
  </div>
`

// <button id="counter" type="button"></button>
//初期設定のカウンターボタン

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
