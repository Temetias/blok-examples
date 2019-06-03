import Boksi from "../blok_setup/blokFile";

/**
 *
 */
const blokBuilder = (() => {
	Boksi.hooks.native.launch.link(() => {
		console.log("Runtime-blok detected launch hook fire!");
	});
	Boksi.hooks.native.request.link(() => {
		console.log("Runtime-blok detected request hook fire!")
	});
});

export default blokBuilder;
