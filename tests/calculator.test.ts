import test from "node:test";
import assert from "node:assert/strict";
import { add } from "../lib/calculator.ts";

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
