import { Response } from 'express';

import { expectCallWithArgs } from './validate-spied-call.helper';

function responseMockAssertWith({ response, expectedStatus, expectedJson }: {
    response: Response;
    expectedStatus?: number;
    expectedJson?: Record<string, any>;
}) {

    if (expectedStatus) {
        expectCallWithArgs(
            {
                spy: response.status as jest.Mock,
                args: [expectedStatus],
            },
        );
    }

    if (expectedJson) {
        expectCallWithArgs(
            {
                spy: response.json as jest.Mock,
                args: [expectedJson],
            },
        );
    }
}

export default responseMockAssertWith;
