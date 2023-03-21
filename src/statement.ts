import { Record } from "../types/types";
import { Formater } from "./formater";

export class Statement {
  // Types
  records: Record[];
  formater: Formater;

  constructor(formater: Formater) {
    this.records = [];
    this.formater = formater;
  }

  addTransaction(
    amount: number,
    date: string,
    action: "deposit" | "withdraw",
    id: string = crypto.randomUUID()
  ) {
    const record: Record = {
      id,
      amount: Number(amount.toFixed(2)),
      date: this.formater.formatDate(date),
      action,
    };
    this.records.push(record);
    this.#sortingRecords();
    this.#addBalance();

    if (action === "withdraw") {
      this.#withdrawChecker(id);
    }
  }

  makeStatement(): void {
    if (!this.records.length) {
      console.log("There is no transaction in this account.");
      return;
    }

    console.log("date || credit || debit || balance");
    this.records
      .reverse()
      .forEach((record) => this.formater.formatRecord(record));
  }

  calculateBalance(): number {
    let total = 0;
    this.records.forEach((record) => {
      record.action === "deposit"
        ? (total += record.amount)
        : (total -= record.amount);
    });
    return total;
  }

  #withdrawChecker(id: string) {
    this.records.forEach((record) => {
      if (record.balance! < 0) {
        this.records = this.records.filter((record) => record.id !== id);
        throw new Error("Transaction failed: not enough balance");
      }
    });
  }

  #sortingRecords() {
    this.records.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
  }

  #addBalance() {
    let total = 0;
    this.records.forEach((record) => {
      record.action === "deposit"
        ? (total += record.amount)
        : (total -= record.amount);
      record.balance = total;
    });
  }
}
