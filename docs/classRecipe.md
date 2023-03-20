# Class Design Recipe

## Account

```js
class Account {
  constructor() {
    this.balance = 0;
    this.records = [];
  }

  deposit(amount) {
    // amount is an integer
    // adds the amount to balance and a record to the records
  }

  withdraw(amount) {
    // amount is an integer
    // deduct the amount from balance and add a record to the records
  }

  showStatement() {
    // prints out all records
  }

  private;

  formatStatement(record) {
    // record is an record object
    // returns a string in certain format
  }
}
```
