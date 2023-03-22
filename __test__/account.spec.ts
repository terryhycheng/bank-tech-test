import { Account } from "../src/account";
import { Formater } from "../src/formater";
import { Statement } from "../src/statement";

jest.mock("../src/formater");
jest.mock("../src/statement");

let account: Account;
let formater: Formater;
let statement: Statement;
const formaterMock = Formater as jest.MockedClass<typeof Formater>;
const statementMock = Statement as jest.MockedClass<typeof Statement>;

describe("Account", () => {
  beforeEach(() => {
    formater = new formaterMock();
    statement = new statementMock(formater);
    account = new Account(formater, statement);
  });

  describe("#showBalance", () => {
    it("should call calculateBalance once", () => {
      const spy = jest.spyOn(statement, "calculateBalance");
      account.showBalance();
      expect(spy).toBeCalledTimes(1);
    });

    it("should return a number from calculateBalance", () => {
      const spy = jest.spyOn(statement, "calculateBalance");
      spy.mockReturnValueOnce(200);
      expect(account.showBalance()).toEqual(200);
    });
  });

  describe("#deposit", () => {
    it("should call addTransaction once", () => {
      const spy = jest.spyOn(statement, "addTransaction");
      account.deposit(50, "22-03-2023");
      expect(spy).toHaveBeenCalledWith(50, "22-03-2023", "deposit");
    });

    it("should throw an error", () => {
      expect(() => account.deposit(-50, "22-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
      expect(() => account.deposit("123" as any, "22-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
    });
  });

  describe("#withdraw", () => {
    it("should call addTransaction once", () => {
      const spy = jest.spyOn(statement, "addTransaction");
      account.withdraw(50, "22-03-2023");
      expect(spy).toHaveBeenCalledWith(50, "22-03-2023", "withdraw");
    });

    it("should throw an error", () => {
      expect(() => account.withdraw(-50, "22-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
      expect(() => account.withdraw("123" as any, "22-03-2023")).toThrowError(
        "Action failed: invalid amount input"
      );
    });
  });

  describe("#showStatement", () => {
    it("should call makeStatement once", () => {
      const spy = jest.spyOn(statement, "makeStatement");
      account.showStatement();
      expect(spy).toBeCalledTimes(1);
    });
  });
});
