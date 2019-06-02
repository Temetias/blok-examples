import { IncomingMessage } from "http";

export interface BoksiHooks {
	
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
	}

	/**
	 *
	 */
	custom: {
		[name: string]: Hook<any>;
	}
}

/**
 *
 */
export interface Hook<T> {

	/**
	 *
	 */
	link(callBack: (() => void)): void;
	
	/**
	 *
	 */
	unlink(callBack: (() => void)): void;
}
