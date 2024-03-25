const waiting = async (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});
export default waiting;