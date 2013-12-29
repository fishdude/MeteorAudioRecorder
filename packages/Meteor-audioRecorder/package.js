Package.describe({
	summary: "Web audio recorder for meteor"
});

Package.on_use(function (api) {
	api.use(["jquery"], ["client"]);
	api.use(["bootstrap"], ["client"]);

	api.add_files(["recorder.js"], ["client"]);
	api.add_files(["recorderWorker.js"], ["client"]);
	api.add_files(["audioRecorder.js"], ["client"]);
});
