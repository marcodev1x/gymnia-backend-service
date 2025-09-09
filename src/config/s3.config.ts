const {
    BACKBLAZEB2_ACCESS_KEY_ID,
    BACKBLAZEB2_SECRET_ACCESS_KEY,
    BACKBLAZEB2_REGION,
    BACKBLAZEB2_ENDPOINT,
} = process.env;

export const s3Config = {
    bucketEssayHelpersDocsName: 'themes-helpers-docs',
    accessKeyId: BACKBLAZEB2_ACCESS_KEY_ID,
    secretAccessKey: BACKBLAZEB2_SECRET_ACCESS_KEY,
    region: BACKBLAZEB2_REGION,
    endpoint: BACKBLAZEB2_ENDPOINT,
};
