export const STORE_MAIN_BUDGET = 'mainBudget:storeMainBudget';

export function storeMainBudget(rows) {
    return {
        type: STORE_MAIN_BUDGET,
        payload: {
            rows
        }
    };
}
