export type Calculation = { ok: true; value: number } | { ok: false; error: string };

function parseNumber(input: string): number | null {
  const normalized = input.trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function add(first: string, second: string): Calculation {
  if (!first.trim() || !second.trim()) {
    return { ok: false, error: "Įveskite abu skaičius." };
  }
  const a = parseNumber(first);
  const b = parseNumber(second);
  if (a === null || b === null) {
    return { ok: false, error: "Įveskite tinkamus skaičius, pavyzdžiui, -5 arba 2,5." };
  }
  const sum = a + b;
  if (!Number.isFinite(sum)) {
    return { ok: false, error: "Rezultatas per didelis. Įveskite mažesnius skaičius." };
  }
  // Remove common floating-point display noise, such as 0.1 + 0.2.
  return { ok: true, value: Number(sum.toPrecision(15)) };
}

export function subtract(first: string, second: string): Calculation {
  if (!first.trim() || !second.trim()) {
    return { ok: false, error: "Įveskite abu skaičius." };
  }
  const a = parseNumber(first);
  const b = parseNumber(second);
  if (a === null || b === null) {
    return { ok: false, error: "Įveskite tinkamus skaičius, pavyzdžiui, -5 arba 2,5." };
  }
  const difference = a - b;
  if (!Number.isFinite(difference)) {
    return { ok: false, error: "Rezultatas per didelis. Įveskite mažesnius skaičius." };
  }
  return { ok: true, value: Number(difference.toPrecision(15)) };
}

export function divide(first: string, second: string): Calculation {
  if (!first.trim() || !second.trim()) {
    return { ok: false, error: "Įveskite abu skaičius." };
  }
  const a = parseNumber(first);
  const b = parseNumber(second);
  if (a === null || b === null) {
    return { ok: false, error: "Įveskite tinkamus skaičius, pavyzdžiui, -5 arba 2,5." };
  }
  if (b === 0) {
    return { ok: false, error: "Dalyti iš nulio negalima." };
  }
  const quotient = a / b;
  if (!Number.isFinite(quotient)) {
    return { ok: false, error: "Rezultatas per didelis. Įveskite mažesnius skaičius." };
  }
  return { ok: true, value: Number(quotient.toPrecision(15)) };
}
