import { Record } from "../types/types";
import { Formater } from "./formater";

export class Statement {
  records: Record[];
  formater: Formater;

  constructor(formater: Formater) {
    this.records = [];
    this.formater = formater;
  }

  addTransaction(
    amount: number,
    date: string,
    action: string,
    id: string = crypto.randomUUID()
  ) {
    const record: Record = {
      id,
      amount: Number(amount.toFixed(2)),
      date: this.formater.formatDate(date),
      action,
    };
    this.records.push(record);
    this.records = this.#sortingRecords(this.records);

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
    this.#sortingRecords(this.records)
      .reverse()
      .forEach((record) => this.formater.formatRecord(record));
  }

  #withdrawChecker(id: string) {
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
}
