# cloudflare-kv

Thin wrapper for [Cloudflare Workers KV](https://developers.cloudflare.com/workers/kv/)

## Installation

### Requirements

- Node.js 8 and up

`npm i cloudflare-kv` **or** `yarn add cloudflare-kv`

## Usage

```js
const CloudflareKV = require("cloudflare-kv");

const kv = new CloudflareKV({
  accountId: "<Cloudflare-Account-Id>",
  email: "<Cloudflare-Email>",
  key: "<Cloudflare-API-Key>",
  namespaceId: "<Cloudflare-Workers-KV-Namespace-Id>"
});

await kv.put("key", { workers: "kv" });

const value = await kv.get("key");
// { workers: "kv" }

await kv.delete("key");
```

## Development

```
yarn
yarn test --watch
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/Zertz/cloudflare-kv/blob/master/license)
