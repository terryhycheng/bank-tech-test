export type Record = {
  date: string;
  amount: number;
  action: string;
};

export class Account {
  // type
  balance: number;
  records: Record[];

  constructor() {
    this.balance = 0;
    this.records = [];
  }

  showBalance(): number {
    return this.balance;
  }

  showStatement(): string | void {
    if (this.records.length === 0) {
      return "There is no transaction in this account.";
    } else {
      console.log("date || credit || debit || balance");
    }
  }

  deposit(amount: number, date: string): void {
    this.balance += amount;
    this.#addTransaction(amount, date, "deposit");
  }

  withdraw(amount: number, date: string): void {
    this.balance -= amount;
    this.#addTransaction(amount, date, "withdraw");
  }

  #addTransaction(amount: number, date: string, action: string) {
    const record: Record = {
      amount,
      date,
      action,
    };
    this.records.push(record);
  }
}
