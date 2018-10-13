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
  constructor(options) {
    this.accountId = options.accountId;
    this.email = options.email;
    this.key = options.key;
    this.namespaceId = options.namespaceId;
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
