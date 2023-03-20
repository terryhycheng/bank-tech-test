# Class Design Recipe

## Account

### Class Design

```js
class Account {
  constructor() {
    this.balance = 0;
    this.records = [];
  }

  showBalance() {
    // reutrns a integer of the balance
  }

  deposit(amount, date) {
    // amount is an integer
    // 1. adds the amount to balance
    // 2. adds a record to the records
  }

  withdraw(amount, date) {
    // amount is an integer
    // 1. deduct the amount from balance
    // 2. add a record to the records
  }

  showStatement() {
    // prints out all records
  }

  private;

  formatStatement(record) {
    // record is an record object
    // returns a string in certain format
  }

  addTransaction(amount, date, action) {
    // forms an object and pushes to the array
  }
}
```

### Record object design

```js
const records = [
  {
    date: "10-01-2023",
    amount: 1000,
    action: "deposit",
  },
  {
    date: "13-01-2023",
    amount: 2000,
    action: "deposit",
  },
  {
    date: "14-01-2023",
    amount: 500,
    action: "withdraw",
  },
];
```

### Test Design

#### Normal cases

```js
// should return 0 when the account was created
const account = new Account();
account.showBalance(); // #=> 0.00

// should print out a empty statement message when the account was created
const account = new Account();
account.showStatement(); // #=> "There is no transaction in this account."

// should add the correct deposit to the balance
const account = new Account();
account.deposit(50, "20-03-2023");
account.showBalance(); // #=> 50.00

// should deduct the correct amount from the balance
const account = new Account();
account.deposit(100, "20-03-2023");
account.withdraw(50, "20-03-2023");
account.showBalance(); // #=> 50.00

// should print out the statement in a reverse order
const account = new Account();
account.deposit(100, "18-03-2023");
account.withdraw(50, "20-03-2023");
account.showStatement();
// #=> date || credit || debit || balance
// #=> 18/03/2023 || || 50.00 || 50.00
// #=> 20/03/2023 || 100.00 || || 100.00

// should set today as the date by default
const account = new Account();
account.deposit(100);
account.withdraw(50);
account.showStatement();
// #=> date || credit || debit || balance
// #=> 20/03/2023 || || 50.00 || 50.00
// #=> 20/03/2023 || 100.00 || || 100.00
```

#### Edge cases

```js
// should remain unchanged and print out an error message if the amount is larger than the balance
const account = new Account();
account.withdraw(50); // #=> "Transaction failed: not enough balance"
account.showBalance(); // #=> 0.00
account.showStatement(); // #=> "There is no transaction in this account."

// should return an error message if the user passes a non-integer intput
const account = new Account();
account.deposit("123"); // #=> "Action failed: invalid input"
account.deposit(true); // #=> "Action failed: invalid input"
account.deposit(null); // #=> "Action failed: invalid input"
account.withdraw("123"); // #=> "Action failed: invalid input"
account.withdraw(true); // #=> "Action failed: invalid input"
account.withdraw(null); // #=> "Action failed: invalid input"

// should return an error message if the user passes a negative integer intput
const account = new Account();
account.deposit(-1); // #=> "Action failed: amount cannot be a negative value"
account.withdraw(-10); // #=> "Action failed: amount cannot be a negative value"

// should prevent users to add an invalid transaction to the records
const account = new Account();
account.deposit(100, "20-03-2023");
account.showBalance(); // #=> 100.00
account.withdraw(50, "18-03-2023"); // #=> "Transaction failed: not enough balance"
account.deposit(50, "16-03-2023");
account.withdraw(50, "18-03-2023");
account.showBalance(); // #=> 100.00
```
