interface Env {
	SHORT_URLS_DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env) {
	  try {
		const url = new URL(request.url);
		if (url.pathname.startsWith('/testwrite')) {
		  return await testWrite(env);
		} else if (url.pathname.startsWith('/testread')) {
		  return await testRead(env);
		} else {
		  return new Response('Choose an action: /testwrite or /testread');
		}
	  } catch (error: any) {
		console.error(error); // Log the error for further debugging
		return new Response(`Error: ${error.message}`, { status: 500 });
	  }
	}
  };
  
  async function testWrite(env: Env) {
	try {
	  console.log("Testing simple insertion");  // Logging
	  const stmt = env.SHORT_URLS_DB.prepare('INSERT INTO urls (short_path, original_url) VALUES (?, ?)').bind('testwrite', 'https://testwrite.com');
	  const result: any = await stmt.run();
	  console.log("Insertion result:", result);  // Logging
  
	  if (result && result.changes > 0) {
		return new Response('Test insertion successful');
	  } else {
		console.error("Test insertion failed");  // Logging
		return new Response('Test insertion failed', { status: 500 });
	  }
	} catch (error: any) {
	  console.error("Test insertion error:", error);  // Logging
	  return new Response(`Test Database Error: ${error.message}`, { status: 500 });
	}
  }
  
  async function testRead(env: Env) {
	try {
	  console.log("Testing simple read");  // Logging
	  const stmt = env.SHORT_URLS_DB.prepare('SELECT original_url FROM urls WHERE short_path = ?').bind('x.com');
	  const result: any = await stmt.run();
	  console.log("Read result:", result);  // Logging
  
	  if (result && result.original_url) {
		return new Response(`Test read successful: ${result.original_url}`);
	  } else {
		console.error("Test read failed");  // Logging
		return new Response('Test read failed', { status: 500 });
	  }
	} catch (error: any) {
	  console.error("Test read error:", error);  // Logging
	  return new Response(`Test Database Error: ${error.message}`, { status: 500 });
	}
  }
