export const SET_VALUE = 'mainBudget:setValue';

export function setValue(property, value) {
    return {
        type: SET_VALUE,
        payload: {
            property,
            value
        }
    };
}
