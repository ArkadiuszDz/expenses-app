export interface ExpenseItemType {
  amount: number;
  title: string;
}

export interface ExpenseItemResponseType extends ExpenseItemType {
  id: string;
}