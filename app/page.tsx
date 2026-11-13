"use client";

import { useState, type FormEvent } from "react";
import { add, subtract, divide, multiply, percentage, type Calculation } from "../lib/calculator";

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
  const [result, setResult] = useState<Calculation | null>(null);
  const [operation, setOperation] = useState<Operation>("add");
  const selectedOperation = operations[operation];
  const symbol = selectedOperation.symbol;

  function selectOperation(value: Operation) {
    setOperation(value);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(selectedOperation.calculate(first, second));
  }

  function reset() {
    setFirst("");
    setSecond("");
    setResult(null);
  }

  return (
    <div className="shell">
      <header className="header">
        <a className="brand" href="/" aria-label="Suma — pradžia"><span className="brand-icon">+</span>suma<span className="brand-dot">.</span></a>
        <span className="version"><span />Pirmoji versija</span>
      </header>

      <main>
        <div className="intro">
          <span className="eyebrow">MAŽIAU PASTANGŲ. DAUGIAU AIŠKUMO.</span>
          <h1>Viskas prasideda<br />nuo <span>paprastos sumos.</span></h1>
          <p>Du skaičiai, vienas atsakymas.<br className="mobile-break" /> Visa kita palikite mums.</p>
        </div>

        <section className="calculator" aria-labelledby="calculator-title">
          <div className="card-heading">
            <div><span className="section-label">KALKULIATORIUS</span><h2 id="calculator-title">{selectedOperation.title}</h2></div>
            <span className="operation">{symbol}<span>{selectedOperation.label}</span></span>
          </div>

          <div className="operation-selector" role="group" aria-label="Skaičiavimo veiksmas">
            <button type="button" aria-pressed={operation === "add"} onClick={() => selectOperation("add")}>+ Sudėtis</button>
            <button type="button" aria-pressed={operation === "subtract"} onClick={() => selectOperation("subtract")}>− Atimtis</button>
            <button type="button" aria-pressed={operation === "multiply"} onClick={() => selectOperation("multiply")}>× Daugyba</button>
            <button type="button" aria-pressed={operation === "divide"} onClick={() => selectOperation("divide")}>÷ Dalyba</button>
            <button type="button" aria-pressed={operation === "percentage"} onClick={() => selectOperation("percentage")}>% Procentai</button>
          </div>

          <form onSubmit={calculate} noValidate>
            <div className="inputs">
              <div className="field"><label htmlFor="first">{operation === "percentage" ? "Procentai (%)" : "Pirmas skaičius"}</label><input id="first" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 12,5" value={first} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => { setFirst(event.target.value); setResult(null); }} /></div>
              <span className="plus" aria-hidden="true">{symbol}</span>
              <div className="field"><label htmlFor="second">{operation === "percentage" ? "Nuo skaičiaus" : "Antras skaičius"}</label><input id="second" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 7,5" value={second} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => { setSecond(event.target.value); setResult(null); }} /></div>
            </div>
            <p className="hint" id="number-hint">{operation === "percentage" ? "Pavyzdžiui, 10 % nuo 200 = 20. Trupmenoms naudokite kablelį arba tašką." : "Tinka ir neigiami skaičiai. Trupmenoms naudokite kablelį arba tašką."}</p>
            <button className="submit" type="submit">{selectedOperation.action} <span aria-hidden="true">↗</span></button>

            <div className={`result ${result?.ok ? "calculated" : ""}`} aria-live="polite" aria-atomic="true">
              <span className="section-label">REZULTATAS</span>
              {result?.ok === false ? <p className="error" id="calculation-error">{result.error}</p> : <><output className="answer">{result?.ok ? formatter.format(result.value) : "—"}</output><p className="result-caption">{result?.ok ? `${first.trim()} ${symbol}${operation === "percentage" ? " nuo" : ""} ${second.trim()}` : "Jūsų atsakymas pasirodys čia"}</p></>}
            </div>
            <button className="reset" type="button" onClick={reset}><span aria-hidden="true">↺</span> Išvalyti laukus</button>
          </form>
        </section>

        <p className="privacy"><span aria-hidden="true">◈</span> Skaičiavimai vyksta jūsų naršyklėje.</p>
      </main>
      <footer><span>Sukurta paprastumui.</span><span>Andrius & Ramūnas <span className="footer-plus">+</span></span></footer>
    </div>
  );
}
