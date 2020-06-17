// Get the API root URL
const path = 'https://worksdomain.nl/public' + process.env.NODE_ENV + window.location.pathname;
const parts = path.split('/');
const adminIndex = parts.indexOf('admin');
const apiRootPath = parts.slice(0, adminIndex).join('/') + '/';

// Default state
export default {
	hydrated: false,
	hydratingError: null,
	latency: [],
	currentUser: {},
	bookmarks: [],
	sidebars: {
		nav: false,
		info: false
	},
	queue: [],
	currentProjectKey: null,
	projects: null,
	apiRootPath
};
