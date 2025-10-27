function expectErrorBeenCalled(mock?: jest.Mock, expectedErrorInstance?: Error, errorCode?: number) {
    if (!mock) {
        throw new Error('Mock não fornecido. Teste mal configurado.');
    }

    expect(mock).toHaveBeenCalled();

    if (!expectedErrorInstance) {
        logger.warn('Instância de erro esperada não fornecida. Verificando apenas se o mock foi chamado.');
        return;
    }

    if (mock.mock.calls.length === 0) {
        throw new Error('Mock foi chamado, mas sem argumentos (mock.mock.calls está vazio).');
    }

    const receivedError = mock.mock.calls[0][0];

    if (errorCode) {
        expect(mock.mock.calls[0][0].errorCode).toBe(errorCode);
    }

    expect(receivedError).toBeInstanceOf(Error);
    expect(receivedError).toBeInstanceOf(expectedErrorInstance.constructor as new (...args: any[]) => Error);
    expect(receivedError.message).toBe(expectedErrorInstance.message);
}

export default expectErrorBeenCalled;
