const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_NOREPLY_FROM,
    EMAIL_NOREPLY_USER,
    EMAIL_NOREPLY_PASS,
}
    = process.env;

export const mailerConfig = {
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_SECURE === 'true',
    auth: {
        user: EMAIL_NOREPLY_USER,
        pass: EMAIL_NOREPLY_PASS,
    },
    from: EMAIL_NOREPLY_FROM,
};
