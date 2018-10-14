require("dotenv-safe").config();

import test from "ava";
import CloudflareKV from "./";

const {
  CLOUDFLARE_ACCOUNT_ID: accountId,
  CLOUDFLARE_EMAIL: email,
  CLOUDFLARE_KEY: key,
  CLOUDFLARE_NAMESPACE_ID: namespaceId
} = process.env;

const fakeOptions = {
  accountId: "accountId",
  email: "email",
  key: "key",
  namespaceId: "namespaceId"
};

const options = {
  accountId,
  email,
  key,
  namespaceId
};

async function wait(t) {
  await new Promise(resolve => setTimeout(resolve, 5000));

  t.is(true, true);
}

test("delete 400", async t => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.delete("kv");
  });

  t.is(error.statusCode, 400);
});

test("get 400", async t => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.get("kv");
  });

  t.is(error.statusCode, 400);
});

test("put 400", async t => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.put("kv", { got: "ava" });
  });

  t.is(error.statusCode, 400);
});

test("put", async t => {
  const kv = new CloudflareKV(options);

  const result = await kv.put("kv", { got: "ava" });

  t.is(result, true);
});

test("wait (put)", wait);

test("get", async t => {
  const kv = new CloudflareKV(options);

  const result = await kv.get("kv");

  t.deepEqual(result, { got: "ava" });
});

test("delete", async t => {
  const kv = new CloudflareKV(options);

  const result = await kv.delete("kv");

  t.is(result, true);
});

test("wait (delete)", wait);

test("get 404", async t => {
  const kv = new CloudflareKV(options);

  const error = await t.throwsAsync(() => {
    return kv.get("kv");
  });

  t.is(error.statusCode, 404);
});

test("delete 404", async t => {
  const kv = new CloudflareKV(options);

  const error = await t.throwsAsync(() => {
    return kv.delete("kv");
  });

  t.is(error.statusCode, 404);
});
