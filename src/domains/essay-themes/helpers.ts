export const formatThemeTitle = (theme_title: string) => theme_title
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();

export function getKeyFromS3Url(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
}
