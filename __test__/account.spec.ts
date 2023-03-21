import { Account } from "../src/account";

let account: Account;
let consoleSpy: jest.SpyInstance;

describe("Account", () => {
  beforeEach(() => {
    account = new Account();
    consoleSpy = jest.spyOn(console, "log");
    consoleSpy.mockReset();
  });

  describe("default setting", () => {
    it("should return 0 when the account was created", () => {
      expect(account.balance).toEqual(0);
    });

    it("should print out a empty statement message", () => {
      account.showStatement();
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "There is no transaction in this account."
      );
    });
  });

  describe("#deposit", () => {
    it("should add the correct deposit to the balance", () => {
      account.deposit(50, "18-03-2023");
      expect(account.balance).toEqual(50);
    });
  });

  describe("#withdraw", () => {
    it("should deduct the correct amount from the balance", () => {
      account.deposit(100, "20-03-2023");
      account.withdraw(50, "21-03-2023");
      expect(account.balance).toEqual(50);
    });
  });

  describe("#showStatement", () => {
    it("should print out the statement in a reverse order", () => {
      account.deposit(100, "20-03-2023");
      account.withdraw(50, "21-03-2023");
      account.showStatement();
      expect(consoleSpy.mock.calls[0][0]).toBe(
        "date || credit || debit || balance"
      );
      expect(consoleSpy.mock.calls[1][0]).toBe(
        "21/03/2023 || || 50.00 || 50.00"
      );
      expect(consoleSpy.mock.calls[2][0]).toBe(
        "20/03/2023 || 100.00 || || 100.00"
      );
    });
  });

  describe("edge cases", () => {
    it("should throw an error when the date format is incorrect", () => {
      expect(() => account.deposit(50, "03-20-2023")).toThrowError(
        "Action failed: invalid date input"
      );
      expect(() => account.deposit(50, "-142!241njqwkr")).toThrowError(
        "Action failed: invalid date input"
      );
      expect(() => account.deposit(50, "")).toThrowError(
        "Action failed: invalid date input"
      );
    });

    it("should remain unchanged and print out an error message if the amount is larger than the balance", () => {
      expect(() => account.withdraw(50, "21-03-2023")).toThrowError(
        "Transaction failed: not enough balance"
      );
    });

    it("should return an error message if the user passes a non-integer intput", () => {
      const wrongInput = ["123", true, null];
      wrongInput.forEach((input) => {
        expect(() => account.deposit(input as any, "20-03-2023")).toThrowError(
          "Action failed: invalid amount input"
        );
        expect(() => account.withdraw(input as any, "20-03-2023")).toThrowError(
          "Action failed: invalid amount input"
        );
      });
    });

    it("should return an error message if the user passes a negative integer intput", () => {
      expect(() => account.deposit(-1, "20-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
      expect(() => account.withdraw(-10, "20-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
    });

    it("should prevent users to add an invalid transaction to the records", () => {
      account.deposit(100, "20-03-2023");
      expect(account.balance).toEqual(100);
      expect(() => account.withdraw(50, "18-03-2023")).toThrowError(
        "Transaction failed: not enough balance"
      );
      account.deposit(50, "16-03-2023");
      account.withdraw(50, "18-03-2023");
      expect(account.balance).toEqual(100);
    });
  });
});
