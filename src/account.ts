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
    if (this.records.length === 0) {
      console.log("There is no transaction in this account.");
    } else {
      console.log("date || credit || debit || balance");
      this.records.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
      let total = 0;
      this.records.forEach((record) => {
        record.action === "deposit"
          ? (total += record.amount)
          : (total -= record.amount);
        record.balance = total;
      });
      this.records.reverse();
      this.records.forEach((record) => this.#formatRecord(record));
    }
  }

  deposit(amount: number, date: string): void {
    if (this.#inputChecker(amount)) {
      this.balance += amount;
      this.#addTransaction(amount, date, "deposit");
    } else {
      throw new Error("Action failed: invalid amount input");
    }
  }

  withdraw(amount: number, date: string): void {
    if (this.#inputChecker(amount)) {
      if (this.balance >= amount) {
        this.balance -= amount;
        this.#addTransaction(amount, date, "withdraw");
      } else {
        throw new Error("Transaction failed: not enough balance");
      }
    } else {
      throw new Error("Action failed: invalid amount input");
    }
  }

  #addTransaction(amount: number, date: string, action: string) {
    const record: Record = {
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
