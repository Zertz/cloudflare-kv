# cloudflare-kv

> Thin wrapper for [Cloudflare Workers KV](https://developers.cloudflare.com/workers/learning/how-kv-works)

## Installation

> Requires Node.js 14 and up

`npm install cloudflare-kv` **or** `yarn add cloudflare-kv`

## Usage

### Environment variables

```
CLOUDFLARE_ACCOUNT_ID=<Cloudflare-Account-Id>
CLOUDFLARE_TOKEN=<Cloudflare-API-Token>
CLOUDFLARE_NAMESPACE_ID=<Cloudflare-Workers-KV-Namespace-Id>
```

```js
import CloudflareKV from "cloudflare-kv";

const kv = new CloudflareKV();
```

### Local variables

```js
const CloudflareKV = require("cloudflare-kv");

const kv = new CloudflareKV({
  accountId: "<Cloudflare-Account-Id>",
  apiToken: "<Cloudflare-API-Token>",
  namespaceId: "<Cloudflare-Workers-KV-Namespace-Id>",
});
```

### Writing, reading and deleting data

```js
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
