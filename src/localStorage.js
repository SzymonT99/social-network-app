export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        const state = JSON.parse(serializedState);
        if (serializedState === null) {
            return undefined;
        }
        return state;
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log('error')
    }
}