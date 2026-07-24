import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the marketplace homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>BuildFleet — Construction equipment marketplace<\/title>/i,
  );
  assert.match(html, /The right equipment\./);
  assert.match(html, /Verified suppliers\./);
  assert.match(html, /Business documents reviewed/);
  assert.match(html, /href="\/request"/);
  assert.match(html, /marketplace-hero-desktop/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("server-renders each primary experience", async () => {
  const routes = [
    ["/request", /Equipment/],
    ["/buyer", /Good morning, Arjun/],
    ["/buyer/quotes", /Compare quotations/],
    ["/supplier", /Finish your first machine profile/],
    ["/supplier/quote", /Create quotation/],
    ["/rental", /Backhoe loader rental/],
    ["/admin", /Marketplace control centre/],
  ];

  for (const [path, expected] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});
