import { Formater } from "../src/formater";
import { Record } from "../types/types";

const formater = new Formater();
const consoleSpy = jest.spyOn(console, "log");

describe("Formater", () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });
  describe("#formatDate", () => {
    it("should turn the date into a correct format", () => {
      const date = "22-03-2023";
      expect(formater.formatDate(date)).toEqual(new Date("2023-03-22"));
    });

    it("should throw an error", () => {
      const invalidInputs = ["03-22-2023", "", " 41w2-3$241/32!", "123", "abc"];
      invalidInputs.forEach((input) => {
        expect(() => formater.formatDate(input)).toThrowError(
          "Action failed: invalid date input"
        );
      });
    });
  });

  describe("#formatRecord", () => {
    it("should print out a deposit record in the correct format", () => {
      const record: Record = {
        id: crypto.randomUUID(),
        date: new Date("2023-03-22"),
        amount: 50,
        action: "deposit",
        balance: 50,
      };
      formater.formatRecord(record);
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "22/03/2023 || 50.00 || || 50.00"
      );
    });

    it("should print out a deposit record in the correct format", () => {
      const record: Record = {
        id: crypto.randomUUID(),
        date: new Date("2023-03-22"),
        amount: 50,
        action: "withdraw",
        balance: 50,
      };
      formater.formatRecord(record);
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "22/03/2023 || || 50.00 || 50.00"
      );
    });
  });
});
