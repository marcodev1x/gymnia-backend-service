import '../setup';
import { createServer } from 'http';
import { appConfig } from '~/config/app.config';
import app from '~/app';

describe('Api launch test', () => {

    test('Api should be running in correct port', done => {
        expect(appConfig.port).toBeDefined();

        const server = createServer(app);

        server.listen(appConfig.port, () => {
            server.close();
            done();
        });
    });

});
