import { Account } from "./account";
import { Formater } from "./formater";
import { Statement } from "./statement";

const formater = new Formater();
const statement = new Statement(formater);
const account = new Account(formater, statement);
account.deposit(1000, "10-01-2023");
account.deposit(2000, "13-01-2023");
account.withdraw(500, "14-01-2023");
account.showStatement();
