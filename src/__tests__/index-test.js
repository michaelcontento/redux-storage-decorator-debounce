import debounce from '../';

const eventMap = {};
global.window = {
    addEventListener(name, cb) {
        eventMap[name] = cb;
    },

    dispatchEvent(name) {
        if (eventMap.hasOwnProperty(name)) {
            eventMap[name]();
        }
    }
};

describe('debounce', () => {
    it('should proxy load to engine.load', async () => {
        const load = sinon.spy();
        const engine = debounce({ load }, 0);

        await engine.load();

        load.should.have.been.called;
    });

    it('should proxy save to engine.save with the right delay', (done) => {
        const save = sinon.stub().resolves();
        const engine = debounce({ save }, 10);

        engine.save({});

        setTimeout(() => { save.should.not.have.been.called; }, 5);
        setTimeout(() => { save.should.have.been.called; done(); }, 15);
    });

    it('should override save with a minimum set', (done) => {
        const save = sinon.stub().resolves();
        const engine = debounce({ save }, 30, 160);

        const saveEngine = () => {
            engine.save({});
        };

        for (let i = 0; i < 300; i += 20) {
            setTimeout(saveEngine, i);
        }

        setTimeout(() => {
            save.should.have.been.calledOnce;
            done();
        }, 170);
    });

    it('should save early on beforeunload', (done) => {
        const save = sinon.stub().resolves();
        const engine = debounce({ save }, 500);

        engine.save({});
        window.dispatchEvent('beforeunload');

        setTimeout(() => {
            save.should.have.been.calledOnce;
            done();
        }, 25);
    });

    it('should not self-trigger save on beforeunload', (done) => {
        const save = sinon.stub().resolves();
        debounce({ save }, 0);

        window.dispatchEvent('beforeunload');

        setTimeout(() => {
            save.should.not.have.been.calledOnce;
            done();
        }, 25);
    });

    it('should not self-trigger save if beforeunload is triggered after timeout is cleared', (done) => {
        const save = sinon.stub().resolves();
        const engine = debounce({ save }, 0);

        engine.save({});

        setTimeout(() => {
            window.dispatchEvent('beforeunload');
            save.should.have.been.calledOnce;
            done();
        }, 25);
    });

    it('should fail if ms is above maxMs', () => {
        const save = sinon.stub().resolves();
        const setup = () => debounce({ save }, 2, 1);

        setup.should.throw(Error);
    });

    it('should not fail if window is missing', () => {
        const oldWindow = global.window;
        delete global.window;

        debounce({ save: sinon.spy() }, 0);

        global.window = oldWindow;
    });

    it('should reject waiting save calls if another comes in', async () => {
        const save = sinon.stub().resolves();
        const engine = debounce({ save }, 10);

        const call1 = engine.save({});
        const call2 = engine.save({});

        await call1.should.be.rejected;
        await call2.should.eventually.be.fulfilled;
    });

    it('should resolve with the response from engine.save', () => {
        const save = sinon.stub().resolves(42);
        const engine = debounce({ save }, 0);

        return engine.save({}).should.become(42);
    });

    it('should reject with the error from engine.save', () => {
        const save = sinon.stub().rejects(24);
        const engine = debounce({ save }, 0);

        return engine.save({}).should.be.rejectedWith(24);
    });
});
