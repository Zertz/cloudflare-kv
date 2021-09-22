import dotenv from "dotenv-safe";
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

async function wait(t) {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  t.is(true, true);
}

test("delete 400", async (t) => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.delete("kv");
  });

  t.is(error.response.statusCode, 400);
});

test("get 400", async (t) => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.get("kv");
  });

  t.is(error.response.statusCode, 400);
});

test("put 400", async (t) => {
  const kv = new CloudflareKV(fakeOptions);

  const error = await t.throwsAsync(() => {
    return kv.put("kv", { got: "ava" });
  });

  t.is(error.response.statusCode, 400);
});

test("put", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.put("kv", { got: "ava" });

  t.is(result, undefined);
});

test("wait (put)", wait);

test("get", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.get("kv");

  t.deepEqual(result, { got: "ava" });
});

test("delete", async (t) => {
  const kv = new CloudflareKV(options);

  const result = await kv.delete("kv");

  t.is(result, undefined);
});

test("wait (delete)", wait);

test("get 404", async (t) => {
  const kv = new CloudflareKV(options);

  const error = await t.throwsAsync(() => {
    return kv.get("kv");
  });

  t.is(error.response.statusCode, 404);
});
