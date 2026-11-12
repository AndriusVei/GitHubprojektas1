"use client";

import { useState, type FormEvent } from "react";
import { add, type Calculation } from "../lib/calculator";

const formatter = new Intl.NumberFormat("lt-LT", { maximumSignificantDigits: 15 });

export default function Home() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState<Calculation | null>(null);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(add(first, second));
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
            <div><span className="section-label">KALKULIATORIUS</span><h2 id="calculator-title">Sudėkime</h2></div>
            <span className="operation">+<span>Sumavimas</span></span>
          </div>

          <form onSubmit={calculate} noValidate>
            <div className="inputs">
              <div className="field"><label htmlFor="first">Pirmas skaičius</label><input id="first" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 12,5" value={first} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => { setFirst(event.target.value); setResult(null); }} /></div>
              <span className="plus" aria-hidden="true">+</span>
              <div className="field"><label htmlFor="second">Antras skaičius</label><input id="second" type="text" inputMode="decimal" autoComplete="off" placeholder="pvz., 7,5" value={second} aria-invalid={result?.ok === false} aria-describedby={result?.ok === false ? "calculation-error" : "number-hint"} onChange={event => { setSecond(event.target.value); setResult(null); }} /></div>
            </div>
            <p className="hint" id="number-hint">Tinka ir neigiami skaičiai. Trupmenoms naudokite kablelį arba tašką.</p>
            <button className="submit" type="submit">Sudėti skaičius <span aria-hidden="true">↗</span></button>

            <div className={`result ${result?.ok ? "calculated" : ""}`} aria-live="polite" aria-atomic="true">
              <span className="section-label">REZULTATAS</span>
              {result?.ok === false ? <p className="error" id="calculation-error">{result.error}</p> : <><output className="answer">{result?.ok ? formatter.format(result.value) : "—"}</output><p className="result-caption">{result?.ok ? `${first.trim()} + ${second.trim()}` : "Jūsų atsakymas pasirodys čia"}</p></>}
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
