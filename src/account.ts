export type Record = {
  date: Date;
  amount: string;
  action: string;
  balance: string;
};

export class Account {
  // type
  balance: number;
  records: Record[];

  constructor() {
    this.balance = 0;
    this.records = [];
  }

  showStatement(): string | void {
    if (this.records.length === 0) {
      return "There is no transaction in this account.";
    } else {
      console.log("date || credit || debit || balance");
      this.records.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
      this.records.forEach((record) => this.#formatRecord(record));
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
}
