import IPC from "node-ipc";
import { IncomingMessage } from "http";
import blokConf from "./blok-conf.json";

/**
 *
 */
class Hook<T> {

	/**
	 * 
	 */
	public name: string;

	/**
	 *
	 */
	private callbacks: ((data: T) => void)[] = [];

	/**
	 *
	 */
	public constructor(name: string) {
		this.name = name;
	}

	/**
	 *
	 */
	public link(callback: ((data: T) => void)): void {
		const bundle: IPCHookLinkMessage = {
			blokName: blokConf.name,
			hookName: this.name,
		}
		IPC.of["boksi-hook-ipc"].emit("boksi-hook-ipc-link", JSON.stringify(bundle));
		this.callbacks.push(callback);
	}

	/**
	 *
	 */
	public fire(data: any): void {
		const bundle: IPCHookMessage = {
			data,
			hookName: this.name,
			blokName: blokConf.name,
		}
		IPC.of["boksi-hook-ipc"].emit("boksi-hook-ipc-fire", JSON.stringify(bundle));
	}

	/**
	 *
	 */
	public triggerCallbacks(data: any): void {
		this.callbacks.forEach(cb => cb(data));
	}
}

/**
 *
 */
class Boksi {

	/**
	 *
	 */
	public hooks: BoksiHooks;

	/**
	 *
	 */
	public constructor(_: void) {
		IPC.config.id = "boksi-hook-ipc-client";
		IPC.config.retry = 1500;
		IPC.config.silent = true;
		IPC.connectTo("boksi-hook-ipc");
		this.hooks = {
			native: {
				launch: new Hook<void>("launch"),
				request: new Hook<IncomingMessage>("request"),
			},
			custom: {},
		}
		IPC.of["boksi-hook-ipc"].on("boksi-hook-ipc-fire", (request: string) => {
			const requestBundle: IPCHookMessage = JSON.parse(request);
			if (blokConf.name === requestBundle.blokName) {
				return;
			}
			if (this.hooks.native[requestBundle.hookName]) {
				this.hooks.native[requestBundle.hookName].triggerCallbacks(requestBundle.data);
			} else if (this.hooks.custom[requestBundle.hookName]) {
				this.hooks.custom[requestBundle.hookName].triggerCallbacks(requestBundle.data);
			}
		});
	}

	/**
	 *
	 */
	public createHook<T>(name: string): void {
		this.hooks.custom[name] = new Hook<T>(name);
		const bundle: IPCHookCreationMessage = {
			hookName: name,
		}
		IPC.of["boksi-hook-ipc"].emit("boksi-hook-ipc-create", JSON.stringify(bundle));
	}
}

interface BoksiHooks {
	native: {
		launch: Hook<void>;
		request: Hook<IncomingMessage>;
		[name: string]: Hook<any>;
	},
	custom: {
		[name: string]: Hook<any>;
	}
}

/**
 *
 */
interface IPCHookLinkMessage {

	/**
	 *
	 */
	hookName: string;

	/**
	 *
	 */
	blokName: string;
}

/**
 *
 */
interface IPCHookMessage {

	/**
	 *
	 */
	hookName: string;

	/**
	 *
	 */
	blokName: string;

	/**
	 *
	 */
	data: any;
}

/**
 *
 */
interface IPCHookCreationMessage {

	/**
	 *
	 */
	hookName: string;
}

export default new Boksi();
