import dotenv from "dotenv-safe";
import crypto from "crypto";
import test from "ava";
import CloudflareKV from "./index.mjs";

dotenv.config();

const fakeOptions = {
  accountId: "accountId",
  apiToken: "apiToken",
  namespaceId: "namespaceId",
};

const options = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID,
};

const key = crypto.randomBytes(32).toString("hex");

async function wait(t) {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  t.is(true, true);
}

test("put", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.put(key, { got: "ava" });

  t.is(result, undefined);
});

test("wait (put)", wait);

test("get", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.get(key);

  t.deepEqual(result, { got: "ava" });
});

test("delete", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.delete(key);

  t.is(result, undefined);
});

test("wait (delete)", wait);

test("get 404", async (t) => {
  const kv = new CloudflareKV(options);

  const error = await t.throwsAsync(() => {
    return kv.get(key);
  });

  t.is(error.response.statusCode, 404);
});
