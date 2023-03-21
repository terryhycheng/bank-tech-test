import { Record } from "../types/types";
import { Formater } from "./formater";

export class Account {
  // types
  records: Record[];
  formater: Formater;

  constructor(formater: Formater) {
    this.records = [];
    this.formater = formater;
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

  showStatement(): void {
    if (!this.records.length) {
      console.log("There is no transaction in this account.");
      return;
    }

    console.log("date || credit || debit || balance");
    this.#sortingRecords(this.records)
      .reverse()
      .forEach((record) => this.formater.formatRecord(record));
  }

  deposit(amount: number, date: string): void {
    if (!this.#inputChecker(amount)) {
      throw new Error("Action failed: invalid amount input");
    }

    this.#addTransaction(crypto.randomUUID(), amount, date, "deposit");
  }

  withdraw(amount: number, date: string): void {
    if (!this.#inputChecker(amount)) {
      throw new Error("Action failed: invalid amount input");
    }

    const id = crypto.randomUUID();
    this.#addTransaction(id, amount, date, "withdraw");

    this.records.forEach((record) => {
      if (record.balance! < 0) {
        this.records = this.records.filter((record) => record.id !== id);
        throw new Error("Transaction failed: not enough balance");
      }
    });
  }

  #sortingRecords(records: Record[]): Record[] {
    records.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    let total = 0;
    records.forEach((record) => {
      record.action === "deposit"
        ? (total += record.amount)
        : (total -= record.amount);
      record.balance = total;
    });
    return records;
  }

  #addTransaction(id: string, amount: number, date: string, action: string) {
    const record: Record = {
      id,
      amount: Number(amount.toFixed(2)),
      date: this.formater.formatDate(date),
      action,
    };
    this.records.push(record);
    this.records = this.#sortingRecords(this.records);
  }

  #inputChecker(input: any) {
    return typeof input === "number" && input > 0;
  }
}
