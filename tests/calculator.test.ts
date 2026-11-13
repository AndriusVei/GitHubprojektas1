import test from "node:test";
import assert from "node:assert/strict";
import { add, subtract, divide, multiply } from "../lib/calculator.ts";

test("adds whole, negative and decimal numbers", () => {
  for (const [a, b, expected] of [["2", "3", 5], ["-8", "3", -5], ["0", "0", 0], [" 1,5 ", "2.5", 4], ["0.1", "0.2", 0.3]] as const) {
    assert.deepEqual(add(a, b), { ok: true, value: expected });
  }
});

test("rejects missing, malformed and infinite values", () => {
  for (const [a, b] of [["", "1"], [" ", "1"], ["abc", "2"], ["1,2,3", "2"], ["0x10", "2"], ["Infinity", "2"], ["9".repeat(310), "1"]]) {
    assert.equal(add(a, b).ok, false);
  }
  const large = "1" + "0".repeat(308);
  assert.equal(add(large, large).ok, false);
});

test("subtracts whole, negative and decimal numbers in input order", () => {
  for (const [a, b, expected] of [["8", "3", 5], ["3", "8", -5], ["-8", "-3", -5], ["3", "-8", 11], ["0", "0", 0], [" 1,5 ", "2.5", -1], ["0.3", "0.1", 0.2]] as const) {
    assert.deepEqual(subtract(a, b), { ok: true, value: expected });
  }
});

test("subtraction rejects invalid inputs and overflow", () => {
  for (const [a, b] of [["", "1"], ["1", " "], ["abc", "2"], ["1", "1,2,3"], ["0x10", "2"], ["Infinity", "2"], ["9".repeat(310), "1"]]) {
    assert.equal(subtract(a, b).ok, false);
  }
  const large = "1" + "0".repeat(308);
  assert.equal(subtract(large, `-${large}`).ok, false);
});

test("divides whole, negative and decimal numbers in input order", () => {
  for (const [a, b, expected] of [["8", "2", 4], ["2", "8", 0.25], ["-8", "2", -4], ["-8", "-2", 4], ["0", "5", 0], [" 1,5 ", "0.5", 3], ["0.3", "0.1", 3], ["1", "3", 0.333333333333333]] as const) {
    assert.deepEqual(divide(a, b), { ok: true, value: expected });
  }
});

test("division rejects zero denominators including negative and decimal zero", () => {
  for (const zero of ["0", "-0", "0,0", " 0.0 "]) {
    for (const numerator of ["5", "0"]) {
      assert.deepEqual(divide(numerator, zero), { ok: false, error: "Dalyti iš nulio negalima." });
    }
  }
});

test("division rejects invalid inputs and overflow", () => {
  for (const [a, b] of [["", "1"], ["1", " "], ["abc", "2"], ["1", "1,2,3"], ["0x10", "2"], ["Infinity", "2"], ["9".repeat(310), "1"]]) {
    assert.equal(divide(a, b).ok, false);
  }
  const large = "1" + "0".repeat(308);
  assert.equal(divide(large, "0.1").ok, false);
});

test("multiplies whole, negative and decimal numbers, including zero", () => {
  for (const [a, b, expected] of [["6", "7", 42], ["-3", "4", -12], ["-3", "-4", 12], ["0", "9", 0], ["9", "0", 0], [" 1,5 ", "2.5", 3.75], ["0.1", "0.2", 0.02]] as const) {
    assert.deepEqual(multiply(a, b), { ok: true, value: expected });
  }
});

test("multiplication rejects invalid inputs and overflow", () => {
  for (const [a, b] of [["", "1"], ["1", " "], ["abc", "2"], ["1", "1,2,3"], ["0x10", "2"], ["Infinity", "2"], ["9".repeat(310), "1"]]) {
    assert.equal(multiply(a, b).ok, false);
  }
  const large = "1" + "0".repeat(308);
  assert.equal(multiply(large, "2").ok, false);
});
