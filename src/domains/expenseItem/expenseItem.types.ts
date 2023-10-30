export interface ExpenseItemType {
  amountPLN: string;
  title: string;
}

export interface ExpenseItemResponseType extends ExpenseItemType {
  id: string;
}