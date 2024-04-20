import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addExpense, incrementCountActionPerformed, setIncome } from "store/expense/expense-slice";

export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
  // predicate: (action) => {
  //   return action.type === "expenseSlice/addExpense" || action.type === "expenseSlice/setIncome";
  // },
  matcher: isAnyOf(addExpense, setIncome),
  effect: async (action, listenerAPI) => {
    listenerAPI.dispatch(incrementCountActionPerformed());
  },
});
