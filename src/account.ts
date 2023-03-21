import { Record } from "../types/types";

export class Account {
  // type
  balance: number;
  records: Record[];

  constructor() {
    this.balance = 0;
    this.records = [];
  }

  showStatement(): void {
    if (!this.records.length) {
      console.log("There is no transaction in this account.");
      return;
    }

    console.log("date || credit || debit || balance");
    this.#sortingRecords(this.records).forEach((record) =>
      this.#formatRecord(record)
    );
  }

  deposit(amount: number, date: string): void {
    if (!this.#inputChecker(amount)) {
      throw new Error("Action failed: invalid amount input");
    }

    this.balance += amount;
    this.#addTransaction(crypto.randomUUID(), amount, date, "deposit");
  }

  withdraw(amount: number, date: string): void {
    if (!this.#inputChecker(amount)) {
      throw new Error("Action failed: invalid amount input");
    }

    if (this.balance < amount) {
      throw new Error("Transaction failed: not enough balance");
    }

    const id = crypto.randomUUID();
    this.#addTransaction(id, amount, date, "withdraw");
    const newRecords = this.#sortingRecords(this.records);

    newRecords.forEach((record) => {
      if (record.balance! < 0) {
        this.records = this.records.filter((record) => record.id !== id);
        throw new Error("Transaction failed: not enough balance");
      }
    });

    this.balance -= amount;
    this.records = newRecords;
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
    return records.reverse();
  }

  #addTransaction(id: string, amount: number, date: string, action: string) {
    const record: Record = {
      id,
      amount: Number(amount.toFixed(2)),
      date: this.#formatDate(date),
      action,
    };
    this.records.unshift(record);
  }

  #formatRecord({ date, amount, action, balance }: Record) {
    const formattedDate = date.toLocaleDateString("en-GB");
    console.log(
      `${formattedDate} || ${
        action === "deposit"
          ? `${amount.toFixed(2)} ||`
          : `|| ${amount.toFixed(2)}`
      } || ${balance?.toFixed(2)}`
    );
  }

  #formatDate(date: string) {
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    if (dateRegex.test(date)) {
      const dateArr = date.split("-");
      const dateObj = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
      return dateObj;
    } else {
      throw new Error("Action failed: invalid date input");
    }
  }

  #inputChecker(input: any) {
    return typeof input === "number" && input > 0;
  }
}
