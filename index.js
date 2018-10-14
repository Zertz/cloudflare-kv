const got = require("got");

function getHeaders(email, key) {
  return {
    "X-Auth-Email": email,
    "X-Auth-Key": key
  };
}

function getUrl(accountId, namespaceId, key) {
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`;
}

class CloudflareKV {
  constructor(options = {}) {
    const {
      CLOUDFLARE_ACCOUNT_ID,
      CLOUDFLARE_EMAIL,
      CLOUDFLARE_KEY,
      CLOUDFLARE_NAMESPACE_ID
    } = process.env;

    this.accountId = options.accountId || CLOUDFLARE_ACCOUNT_ID;
    this.email = options.email || CLOUDFLARE_EMAIL;
    this.key = options.key || CLOUDFLARE_KEY;
    this.namespaceId = options.namespaceId || CLOUDFLARE_NAMESPACE_ID;
  }

  async delete(key) {
    const url = getUrl(this.accountId, this.namespaceId, key);
    const headers = getHeaders(this.email, this.key);

    const response = await got.delete(url, {
      headers,
      json: true
    });

    return response.statusCode === 200;
  }

  async get(key) {
    const url = getUrl(this.accountId, this.namespaceId, key);
    const headers = getHeaders(this.email, this.key);

    const response = await got.get(url, {
      headers,
      json: true
    });

    return response.body;
  }

  async put(key, value) {
    const url = getUrl(this.accountId, this.namespaceId, key);
    const headers = getHeaders(this.email, this.key);

    const response = await got.put(url, {
      body: value,
      headers,
      json: true
    });

    return response.statusCode === 200;
  }
}

module.exports = CloudflareKV;
