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
      this.records.forEach((record) => this.#formatRecord(record));
    }
  }

  deposit(amount: number, date: string): void {
    if (this.#inputChecker(amount)) {
      this.balance += amount;
      this.#addTransaction(amount, date, "deposit");
    } else {
      throw new Error("Action failed: invalid input");
    }
  }

  withdraw(amount: number, date: string): void {
    if (this.#inputChecker(amount)) {
      if (this.balance >= amount) {
        this.balance -= amount;
        this.#addTransaction(amount, date, "withdraw");
      } else {
        console.log("There is no transaction in this account.");
      }
    } else {
      throw new Error("Action failed: invalid input");
    }
  }

  #addTransaction(amount: number, date: string, action: string) {
    const record: Record = {
      amount: amount.toFixed(2),
      date: this.#formatDate(date),
      action,
      balance: this.balance.toFixed(2),
    };
    this.records.unshift(record);
  }

  #formatRecord({ date, amount, action, balance }: Record) {
    const formattedDate = date.toLocaleDateString("en-GB");
    console.log(
      `${formattedDate} || ${
        action === "deposit" ? `${amount} ||` : `|| ${amount}`
      } || ${balance}`
    );
  }

  #formatDate(date: string) {
    const dateArr = date.split("-");
    const dateObj = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
    return dateObj;
  }

  #inputChecker(input: any) {
    return typeof input === "number" && input > 0;
  }
}
