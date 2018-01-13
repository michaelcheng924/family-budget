export const SET_VALUE = 'mainBudget:setValue';
export const STORE_MAIN_BUDGET = 'mainBudget:storeMainBudget';
export const STORE_SAVINGS = 'mainBudget:storeSavings';

export function setValue(property, value) {
    return {
        type: SET_VALUE,
        payload: {
            property,
            value
        }
    };
}

export function storeMainBudget(rows) {
    return {
        type: STORE_MAIN_BUDGET,
        payload: {
            rows
        }
    };
}

export function storeSavings(rows) {
    return {
        type: STORE_SAVINGS,
        payload: {
            rows
        }
    };
}
