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
		native: {
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
		custom: {

			/**
			 *
			 */
			[ name: string ]: Hook<any>;
		}
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
