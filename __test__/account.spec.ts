import { Account } from "../src/account";

let account: Account;

describe("Account", () => {
  beforeEach(() => {
    account = new Account();
  });

  describe("default setting", () => {
    it("should return 0 when the account was created", () => {
      expect(account.balance).toEqual(0);
    });

    it("should print out a empty statement message", () => {
      expect(account.showStatement()).toEqual(
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
      account.withdraw(50, "20-03-2023");
      expect(account.balance).toEqual(50);
    });
  });

  describe("#showStatement", () => {
    it("should print out the statement in a reverse order", () => {
      const consoleSpy = jest.spyOn(console, "log");
      account.deposit(100, "20-03-2023");
      account.withdraw(50, "20-03-2023");
      account.showStatement();
      expect(consoleSpy).toHaveBeenCalledWith(
        "date || credit || debit || balance"
      );
    });
  });
});
