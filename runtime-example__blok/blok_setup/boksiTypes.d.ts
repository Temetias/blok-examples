import { IncomingMessage } from "http";

/**
 *
 */
export default interface Boksi {

	/**
	 *
	 */
	hooks: {

		/**
		 *
		 */
		launch: Hook<void>;

		/**
		 *
		 */
		request: Hook<IncomingMessage>;
	},

	/**
	 *
	 */
	API: {

	}
}

/**
 *
 */
interface Hook<T> {

	/**
	 *
	 */
	link(callBack: (() => void)): void;
	
	/**
	 *
	 */
	unlink(callBack: (() => void)): void;
}
