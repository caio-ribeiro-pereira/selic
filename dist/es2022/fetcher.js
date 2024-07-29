export function get(url, options = {}) {
    return new Promise(async (resolve, reject) => {
        // For Node.js environment
        if (globalThis.process) {
            const { get, Agent } = await import('https');
            const { URL } = await import('url');
            const { hostname, pathname } = new URL(url);
            const agent = new Agent({ keepAlive: true, rejectUnauthorized: false });
            const params = Object.assign({ hostname, path: pathname, port: 443, agent }, options);
            const request = get(params, (response) => {
                let body = '';
                response.on('data', (chunk) => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        return resolve(data);
                    }
                    catch (_a) {
                        return reject(new Error('Parse error'));
                    }
                });
            });
            request.on('error', () => reject(new Error('Request error')));
            request.end();
            return true;
        }
    });
}
//# sourceMappingURL=fetcher.js.map