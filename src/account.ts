import { Record } from "../types/types";
import { Formater } from "./formater";
import { Statement } from "./statement";

export class Account {
  // types
  formater: Formater;
  statement: Statement;

  constructor(formater: Formater, statement: Statement) {
    this.formater = formater;
    this.statement = statement;
  }

  calculateBalance(): number {
    let total = 0;
    this.statement.records.forEach((record) => {
      record.action === "deposit"
        ? (total += record.amount)
        : (total -= record.amount);
    });
    return total;
  }

  deposit(amount: number, date: string): void {
    this.#inputChecker(amount);
    this.statement.addTransaction(amount, date, "deposit");
  }

  withdraw(amount: number, date: string): void {
    this.#inputChecker(amount);
    this.statement.addTransaction(amount, date, "withdraw");
  }

  showStatement() {
    this.statement.makeStatement();
  }

  #inputChecker(input: any) {
    if (typeof input !== "number" || input < 0) {
      throw new Error("Action failed: invalid amount input");
    }
  }
}
