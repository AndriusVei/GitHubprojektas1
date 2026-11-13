"use client";

import { useState } from "react";
import { add, subtract, divide, multiply, percentage } from "../lib/calculator";

const formatter = new Intl.NumberFormat("lt-LT", { maximumSignificantDigits: 15 });

const operations = {
  add: { calculate: add, symbol: "+", title: "Sudėkime", label: "Sumavimas", action: "Sudėti skaičius" },
  subtract: { calculate: subtract, symbol: "−", title: "Atimkime", label: "Atimtis", action: "Atimti skaičius" },
  multiply: { calculate: multiply, symbol: "×", title: "Dauginkime", label: "Daugyba", action: "Dauginti skaičius" },
  divide: { calculate: divide, symbol: "÷", title: "Padalykime", label: "Dalyba", action: "Padalyti skaičius" },
  percentage: { calculate: percentage, symbol: "%", title: "Apskaičiuokime procentus", label: "Procentai", action: "Skaičiuoti procentus" },
};

type Operation = keyof typeof operations;

export default function Home() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operation, setOperation] = useState<Operation>("add");
  const selectedOperation = operations[operation];
  const symbol = selectedOperation.symbol;
  const result = first.trim() && second.trim()
    ? selectedOperation.calculate(first, second)
    : null;

  function selectOperation(value: Operation) {
    setOperation(value);
  }

  function reset() {
    setFirst("");
    setSecond("");
  }

  return (
    <div className="shell">
      <header className="header">
        <a className="brand" href="/" aria-label="Suma — pradžia"><span className="brand-icon">+</span>suma<span className="brand-dot">.</span></a>
        <span className="version"><span />Mažiau pastangų. Daugiau aiškumo.</span>
      </header>

      <main>
        <div className="intro">
          <span className="eyebrow"><span /> TAVO KASDIENIAMS SKAIČIAMS</span>
          <h1>Maži veiksmai.<br /><span>Didelis aiškumas.</span></h1>
          <p>Sudėk, atimk, daugink ar dalyk.<br />Du skaičiai ir atsakymas — be jokių rūpesčių.</p>
          <div className="symbol-art" aria-hidden="true">
            <span className="art-plus">+</span><span className="art-minus">−</span>
            <span className="art-times">×</span><span className="art-divide">÷</span>
          </div>
          <div className="intro-note"><span>01 — 04</span> Keturi veiksmai. Viena vieta.</div>
        </div>

        <section className="calculator" data-operation={operation} aria-labelledby="calculator-title">
          <div className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>suma / kalkuliatorius</span><span aria-hidden="true">↗</span></div>
          <div className="calculator-body">
          <div className="card-heading">
            <div><span className="section-label">KALKULIATORIUS</span><h2 id="calculator-title">{selectedOperation.title}</h2></div>
            <span className="operation">{symbol}<span>{selectedOperation.label}</span></span>
          </div>

          <div className="operation-selector" role="group" aria-label="Skaičiavimo veiksmas">
            <button type="button" data-operation="add" aria-pressed={operation === "add"} onClick={() => selectOperation("add")}><span aria-hidden="true">+</span>Sudėtis</button>
            <button type="button" data-operation="subtract" aria-pressed={operation === "subtract"} onClick={() => selectOperation("subtract")}><span aria-hidden="true">−</span>Atimtis</button>
            <button type="button" data-operation="multiply" aria-pressed={operation === "multiply"} onClick={() => selectOperation("multiply")}><span aria-hidden="true">×</span>Daugyba</button>
            <button type="button" data-operation="divide" aria-pressed={operation === "divide"} onClick={() => selectOperation("divide")}><span aria-hidden="true">÷</span>Dalyba</button>
            <button type="button" aria-pressed={operation === "percentage"} onClick={() => selectOperation("percentage")}>% Procentai</button>
          </div>

          <form onSubmit={event => event.preventDefault()} noValidate>
            <div className="inputs">
              <div className="field"><label htmlFor="first">{operation === "percentage" ? "Procentai (%)" : "Pirmas skaičius"}</label><input id="first" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 12,5" value={first} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => setFirst(event.target.value)} /></div>
              <span className="plus" aria-hidden="true">{symbol}</span>
              <div className="field"><label htmlFor="second">{operation === "percentage" ? "Nuo skaičiaus" : "Antras skaičius"}</label><input id="second" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 7,5" value={second} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => setSecond(event.target.value)} /></div>
            </div>
            <p className="hint" id="number-hint">{operation === "percentage" ? "Pavyzdžiui, 10 % nuo 200 = 20. Trupmenoms naudokite kablelį arba tašką." : "Tinka ir neigiami skaičiai. Trupmenoms naudokite kablelį arba tašką."}</p>

            <div className={`result ${result?.ok ? "calculated" : ""}`} aria-live="polite" aria-atomic="true">
              <span className="section-label">REZULTATAS</span>
              {result?.ok === false ? <p className="error" id="calculation-error">{result.error}</p> : <><output className="answer">{result?.ok ? formatter.format(result.value) : "—"}</output><p className="result-caption">{result?.ok ? `${first.trim()} ${symbol}${operation === "percentage" ? " nuo" : ""} ${second.trim()}` : "Jūsų atsakymas pasirodys čia"}</p></>}
            </div>
            <button className="reset" type="button" onClick={reset}><span aria-hidden="true">↺</span> Išvalyti laukus</button>
          </form>
          <p className="privacy"><span aria-hidden="true">◈</span> Skaičiavimai lieka tik tavo naršyklėje.</p>
          </div>
        </section>

      </main>
      <footer><span>Paprastumas visada susideda.</span><span>Andrius & Ramūnas <span className="footer-plus">+</span></span></footer>
    </div>
  );
}
