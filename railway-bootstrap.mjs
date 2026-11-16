// Sets the Actual server password once, on the first boot of a new instance.
// It never prints the password. If the server is already set up, it does nothing.
const password = process.env.ACTUAL_PASSWORD || '';
const port = process.env.ACTUAL_PORT || process.env.PORT || '5006';
const base = `http://127.0.0.1:${port}`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  if (!password) {
    console.log('[railway] ACTUAL_PASSWORD is empty: set the server password in the browser on first visit.');
    return;
  }
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`${base}/account/needs-bootstrap`);
      if (res.ok) {
        const body = await res.json();
        if (body?.data?.bootstrapped) {
          console.log('[railway] Server already set up; ACTUAL_PASSWORD is not applied again (change the password in Actual\'s settings).');
          return;
        }
        const boot = await fetch(`${base}/account/bootstrap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const result = await boot.json().catch(() => ({}));
        if (boot.ok && result.status === 'ok') {
          console.log('[railway] Server password set from ACTUAL_PASSWORD.');
        } else {
          console.log(`[railway] Could not set the server password: ${result.reason || boot.status}`);
        }
        return;
      }
    } catch {
      // server not listening yet
    }
    await sleep(1000);
  }
  console.log('[railway] Server did not answer within 120 s; password not set.');
}

main();
