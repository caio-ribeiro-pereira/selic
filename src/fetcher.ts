export async function get(url: string, options: object): Promise<any> {
  // For Node.js environment
  if (globalThis.process) {
    console.log('Running Node.js environment')
    return new Promise(async (resolve, reject) => {
      const { get } = await import('https');
      const { URL } = await import('url');
      const { hostname, pathname } = new URL(url);
      const params = { hostname, path: pathname, ...options };
      console.log(`https.get ${JSON.stringify(params)}`)
      const request = get(params, (response) => {
        let body = '';
  
        response.on('data', (chunk) => {
          body += chunk;
        });
  
        response.on('end', () => {
          try {
            const data = JSON.parse(body);
            console.log(data);
            resolve(data);
          } catch {
            reject(new Error('Parse error'));
          }
        });
      });
  
      request.on('error', () => reject(new Error('Request error')));
  
      request.end();
    });
  }

  // For Deno environment
  if (globalThis.Deno) {
    console.log('Running Node.js environment')
    return new Promise(async (resolve, reject) => {
      let response = null;
      try {
        console.log(`fetch ${url} | ${JSON.stringify(options)}`)
        response = await fetch(url, options);
      } catch {
        return reject(new Error('Request error'));
      }
      console.log(response);
      console.log('==============');
      if (response.ok) {
        try {
          const data = await response.json();
          console.log(data);
          return resolve(data);
        } catch (err) {
          console.log('!!!!')
          console.log(err);
          return reject(new Error('Parse error'));
        }
      }
      return reject(Error('Request error'));
    });
  }
}
