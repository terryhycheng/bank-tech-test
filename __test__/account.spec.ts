import { Account } from "../src/account";

let account: Account;

describe("Account", () => {
  beforeEach(() => {
    account = new Account();
  });
  describe("#showBalance", () => {
    it("should return 0 when the account was created", () => {
      expect(account.showBalance()).toEqual(0);
    });
  });

  describe("#showStatement", () => {
    it("should print out a empty statement message", () => {
      expect(account.showStatement()).toEqual(
        "There is no transaction in this account."
      );
    });
  });

  describe("#deposit", () => {
    it("should add the correct deposit to the balance", () => {
      account.deposit(50, "18-03-2023");

      expect(account.showBalance()).toEqual(50);
    });
  });
});
