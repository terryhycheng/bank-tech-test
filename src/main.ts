import { Account } from "./account";

const account = new Account();
account.deposit(1000, "10-01-2023");
account.deposit(2000, "13-01-2023");
account.withdraw(500, "14-01-2023");
account.showStatement();
