type Protocol = 'http' | 'https' | 'ws' | 'wss';
export function serverUrl(
    path: string = '',
    protocol: Protocol = 'http'
): string {
    return (
        protocol +
        '://' +
        (import.meta.env.SERVER_URL || 'localhost:8080/') +
        path
    );
}
