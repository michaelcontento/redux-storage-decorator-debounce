export default (engine, ms, maxWait = null) => {
    let lastTimeout;
    let maxTimeout;
    let lastReject;

    return {
        ...engine,

        save(state) {
            clearTimeout(lastTimeout);

            if (lastReject) {
                lastReject(Error('Debounced, newer action pending'));
                lastReject = null;
            }

            return new Promise((resolve, reject) => {
                const doSave = () => {
                    clearTimeout(lastTimeout);
                    clearTimeout(maxTimeout);
                    lastReject = null;
                    engine.save(state).then(resolve).catch(reject);
                };

                lastReject = reject;
                lastTimeout = setTimeout(doSave, ms);

                if (maxWait !== null && !maxTimeout) {
                    maxTimeout = setTimeout(doSave, maxWait);
                }
            });
        }
    };
};
