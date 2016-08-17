export default (engine, ms, maxWait = null) => {
    let lastTimeout;
    let maxTimeout;
    let lastReject;
    let lastState;

    let hasWindow = false;
    try {
        hasWindow = !!window;
    } catch (err) {
        // ignore error
    }
    if (hasWindow && window.addEventListener) {
        window.addEventListener('beforeunload', () => {
            if (!lastTimeout) {
                return;
            }

            clearTimeout(lastTimeout);
            clearTimeout(maxTimeout);
            lastTimeout = null;
            maxTimeout = null;
            lastReject = null;
            engine.save(lastState);
        });
    }

    return {
        ...engine,

        save(state) {
            lastState = state;
            clearTimeout(lastTimeout);
            lastTimeout = null;

            if (lastReject) {
                lastReject(Error('Debounced, newer action pending'));
                lastReject = null;
            }

            return new Promise((resolve, reject) => {
                const doSave = () => {
                    clearTimeout(lastTimeout);
                    clearTimeout(maxTimeout);
                    lastTimeout = null;
                    maxTimeout = null;
                    lastReject = null;
                    lastState = null;
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
