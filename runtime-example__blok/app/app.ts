import Boksi from "../blok_setup/blokFile";

/**
 *
 */
const blokBuilder = (() => {
	Boksi.hooks.launch.link(() => {
		console.log("Hello from runtime-blok!");
	});
});

export default blokBuilder;