export class Account {
  // type
  balance: number;

  constructor() {
    this.balance = 0;
  }

  showBalance(): number {
    return this.balance;
  }
}
