import Boksi from "../blok_setup/blokFile";

console.log("Hello from IPC blok!");

Boksi.hooks.native.request.link(() => {
	console.log("IPC blok detected request");
});

Boksi.hooks.native.launch.link(() => {
	console.log("IPC blok detected launch hook firing!");
});