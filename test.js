require("dotenv-safe").config();

import test from "ava";
import CloudflareKV from "./";

const {
  CLOUDFLARE_ACCOUNT_ID: accountId,
  CLOUDFLARE_AUTH_EMAIL: email,
  CLOUDFLARE_AUTH_KEY: key,
  CLOUDFLARE_NAMESPACE_ID: namespaceId
} = process.env;

test("delete", async t => {
  const kv = new CloudflareKV({
    accountId,
    email,
    key,
    namespaceId
  });

  const result = await kv.delete("kv");

  t.is(result, true);
});

test("get", async t => {
  const kv = new CloudflareKV({
    accountId,
    email,
    key,
    namespaceId
  });

  const value = await kv.get("kv");

  t.deepEqual(value, { got: "ava" });
});

test("put", async t => {
  const kv = new CloudflareKV({
    accountId,
    email,
    key,
    namespaceId
  });

  const result = await kv.put("kv", { got: "ava" });

  t.is(result, true);
});
