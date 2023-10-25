interface Env {
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env) {
		console.log(`request.cf?.colo: ${JSON.stringify(request.cf?.colo)}`);
	
		const statement = env.DB.prepare("SELECT ContactName FROM Customers WHERE CompanyName = ?");

		const start = Date.now();
		let { results: partialResults1 } = await statement.bind("Alfreds Futterkiste").all();
		let { results: partialResults2 } = await statement.bind("Around the Horn").all();
		let { results: partialResults3 } = await statement.bind("Bs Beverages").all();
		const latency = Date.now() - start;
		const results = [...partialResults1, ...partialResults2, ...partialResults3];

		console.log(`latency: ${latency}`);
		return new Response(JSON.stringify(results));
	},
};
