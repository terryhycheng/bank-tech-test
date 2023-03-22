import { Formater } from "../src/formater";
import { Statement } from "../src/statement";

jest.mock("../src/formater");

let statement: Statement;
let formater: Formater;
const consoleSpy = jest.spyOn(console, "log");
const formaterMock = Formater as jest.MockedClass<typeof Formater>;

describe("Statement", () => {
  beforeEach(() => {
    formater = new formaterMock();
    statement = new Statement(formater);
    consoleSpy.mockClear();
  });

  describe("#addTransaction", () => {
    it("should add a deposit record to the array", () => {
      const spy = jest.spyOn(formater, "formatDate");
      statement.addTransaction(50, "22-03-2023", "deposit");
      expect(spy).toHaveBeenCalledWith("22-03-2023");
      expect(statement.records.length).toEqual(1);
      expect(statement.records[0].amount).toEqual(50);
      expect(statement.records[0].action).toEqual("deposit");
    });

    it("should add a withdraw record to the array", () => {
      const spy = jest.spyOn(formater, "formatDate");
      spy.mockReturnValue(new Date("2023-03-22"));
      statement.addTransaction(50, "22-03-2023", "deposit");
      statement.addTransaction(30, "22-03-2023", "withdraw");
      expect(statement.records.length).toEqual(2);
      expect(statement.records[1].action).toEqual("withdraw");
    });

    it("should throw an 'not enough balance' error", () => {
      expect(() =>
        statement.addTransaction(30, "22-03-2023", "withdraw")
      ).toThrowError("Transaction failed: not enough balance");
      expect(statement.records.length).toEqual(0);
    });
  });

  describe("#makeStatement", () => {
    it("should print out a 'no transaction' message", () => {
      statement.makeStatement();
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "There is no transaction in this account."
      );
    });

    it("should handle a record correctly", () => {
      // SETUP
      const formatRecordSpy = jest.spyOn(formater, "formatRecord");
      const formatDateSpy = jest.spyOn(formater, "formatDate");
      formatDateSpy.mockReturnValueOnce(new Date("2023-03-22"));

      // ACT
      statement.addTransaction(50, "22-03-2023", "deposit", "id");
      statement.makeStatement();

      // ASSERT
      expect(formatRecordSpy).toHaveBeenCalledWith({
        id: "id",
        amount: 50,
        date: new Date("2023-03-22"),
        action: "deposit",
        balance: 50,
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "date || credit || debit || balance"
      );
    });
  });

  describe("#calculateBalance", () => {
    it("should return 0 when the class was created", () => {
      expect(statement.calculateBalance()).toEqual(0);
    });

    it("should calculate the balance correctly", () => {
      const formatDateSpy = jest.spyOn(formater, "formatDate");
      formatDateSpy.mockReturnValue(new Date("2023-03-22"));
      statement.addTransaction(50, "22-03-2023", "deposit");
      statement.addTransaction(30, "22-03-2023", "withdraw");
      expect(statement.calculateBalance()).toEqual(20);
    });
  });
});
