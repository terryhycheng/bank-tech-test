import { Record } from "../types/types";

export class Formater {
  formatDate(date: string) {
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    if (dateRegex.test(date)) {
      const dateArr = date.split("-");
      const dateObj = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
      return dateObj;
    } else {
      throw new Error("Action failed: invalid date input");
    }
  }

  formatRecord({ date, amount, action, balance }: Record) {
    const formattedDate = date.toLocaleDateString("en-GB");
    console.log(
      `${formattedDate} || ${
        action === "deposit"
          ? `${amount.toFixed(2)} ||`
          : `|| ${amount.toFixed(2)}`
      } || ${balance!.toFixed(2)}`
    );
  }
}
