import Boksi from "../blok_setup/blokFile";

Boksi.hooks.native.request.link(() => {
	console.log("IPC-blok detected request hook fire!");
});

Boksi.hooks.native.launch.link(() => {
	console.log("IPC-blok detected launch hook fire!");
});