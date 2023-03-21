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
});
