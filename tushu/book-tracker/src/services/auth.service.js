// Simplified local auth service (no backend needed)
const userKey = "booktracker_user";

const auth = {
	login(username, password) {
		// Simple local login (no password validation, demo only)
		const user = { 
			username, 
			id: Date.now(),
			email: `${username}@example.com`
		};
		localStorage.setItem(userKey, JSON.stringify(user));
		return user;
	},

	logout() {
		localStorage.removeItem(userKey);
		window.location.href = '/';
	},

	getCurrentUser() {
		try {
			const user = localStorage.getItem(userKey);
			return user ? JSON.parse(user) : null;
		} catch (error) {
			return null;
		}
	},

	getJwt() {
		// Return a mock token
		return "mock-token";
	}
};

export default auth;
