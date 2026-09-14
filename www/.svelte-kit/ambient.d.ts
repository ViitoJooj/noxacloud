
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const HISTFILESIZE: string;
	export const XDG_ACTIVATION_TOKEN: string;
	export const KDE_FULL_SESSION: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const LANGUAGE: string;
	export const WARP_HONOR_PS1: string;
	export const USER: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const WARP_PROMPT_NODE_VERSION_ENABLED: string;
	export const BUN_INSTALL: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const npm_config_noproxy: string;
	export const OLDPWD: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const HOME: string;
	export const DESKTOP_SESSION: string;
	export const WARP_CLIENT_VERSION: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_json: string;
	export const WARP_USE_SSH_WRAPPER: string;
	export const GTK_RC_FILES: string;
	export const HOMEBREW_PREFIX: string;
	export const XDG_SEAT_PATH: string;
	export const KDE_SESSION_VERSION: string;
	export const MANAGERPID: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const MAKEFLAGS: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const SYSTEMD_EXEC_PID: string;
	export const npm_config_engine_strict: string;
	export const WARP_SSH_REUSE_CONTROL_MASTER: string;
	export const COLORTERM: string;
	export const COLOR: string;
	export const MAKE_TERMERR: string;
	export const npm_config_metrics_registry: string;
	export const WAYLAND_DISPLAY: string;
	export const INFOPATH: string;
	export const XKB_DEFAULT_LAYOUT: string;
	export const LOGNAME: string;
	export const _: string;
	export const JOURNAL_STREAM: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const npm_config_prefix: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const XDG_SESSION_CLASS: string;
	export const SSH_SOCKET_DIR: string;
	export const TERM: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_cache: string;
	export const WARP_IS_LOCAL_SHELL_SESSION: string;
	export const GTK2_RC_FILES: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const INVOCATION_ID: string;
	export const HOMEBREW_CELLAR: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const XDG_SESSION_PATH: string;
	export const XKB_DEFAULT_MODEL: string;
	export const MAKELEVEL: string;
	export const XDG_RUNTIME_DIR: string;
	export const XDG_MENU_PREFIX: string;
	export const WARP_TERMINAL_SESSION_UUID: string;
	export const ICEAUTHORITY: string;
	export const DISPLAY: string;
	export const WARP_CLI_AGENT_PROTOCOL_VERSION: string;
	export const LANG: string;
	export const HISTSIZE: string;
	export const WARP_PATH_APPEND: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const XAUTHORITY: string;
	export const XDG_SESSION_DESKTOP: string;
	export const TERM_PROGRAM: string;
	export const LS_COLORS: string;
	export const npm_lifecycle_script: string;
	export const SSH_AUTH_SOCK: string;
	export const WARP_FOCUS_URL: string;
	export const SHELL: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const MAKE_TERMOUT: string;
	export const GPG_AGENT_INFO: string;
	export const XDG_VTNR: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const npm_config_globalignorefile: string;
	export const npm_execpath: string;
	export const XDG_DATA_DIRS: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config_global_prefix: string;
	export const HOMEBREW_REPOSITORY: string;
	export const npm_command: string;
	export const MFLAGS: string;
	export const KDE_SESSION_UID: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	export const PUBLIC_BACKEND_URL: string;
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		HISTFILESIZE: string;
		XDG_ACTIVATION_TOKEN: string;
		KDE_FULL_SESSION: string;
		PAM_KWALLET5_LOGIN: string;
		LANGUAGE: string;
		WARP_HONOR_PS1: string;
		USER: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		WARP_PROMPT_NODE_VERSION_ENABLED: string;
		BUN_INSTALL: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		SHLVL: string;
		QT_WAYLAND_RECONNECT: string;
		npm_config_noproxy: string;
		OLDPWD: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		HOME: string;
		DESKTOP_SESSION: string;
		WARP_CLIENT_VERSION: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_json: string;
		WARP_USE_SSH_WRAPPER: string;
		GTK_RC_FILES: string;
		HOMEBREW_PREFIX: string;
		XDG_SEAT_PATH: string;
		KDE_SESSION_VERSION: string;
		MANAGERPID: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		MAKEFLAGS: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		SYSTEMD_EXEC_PID: string;
		npm_config_engine_strict: string;
		WARP_SSH_REUSE_CONTROL_MASTER: string;
		COLORTERM: string;
		COLOR: string;
		MAKE_TERMERR: string;
		npm_config_metrics_registry: string;
		WAYLAND_DISPLAY: string;
		INFOPATH: string;
		XKB_DEFAULT_LAYOUT: string;
		LOGNAME: string;
		_: string;
		JOURNAL_STREAM: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		npm_config_prefix: string;
		MEMORY_PRESSURE_WATCH: string;
		XDG_SESSION_CLASS: string;
		SSH_SOCKET_DIR: string;
		TERM: string;
		XDG_SESSION_ID: string;
		npm_config_cache: string;
		WARP_IS_LOCAL_SHELL_SESSION: string;
		GTK2_RC_FILES: string;
		npm_config_node_gyp: string;
		PATH: string;
		SESSION_MANAGER: string;
		INVOCATION_ID: string;
		HOMEBREW_CELLAR: string;
		NODE: string;
		npm_package_name: string;
		XDG_SESSION_PATH: string;
		XKB_DEFAULT_MODEL: string;
		MAKELEVEL: string;
		XDG_RUNTIME_DIR: string;
		XDG_MENU_PREFIX: string;
		WARP_TERMINAL_SESSION_UUID: string;
		ICEAUTHORITY: string;
		DISPLAY: string;
		WARP_CLI_AGENT_PROTOCOL_VERSION: string;
		LANG: string;
		HISTSIZE: string;
		WARP_PATH_APPEND: string;
		XDG_CURRENT_DESKTOP: string;
		XAUTHORITY: string;
		XDG_SESSION_DESKTOP: string;
		TERM_PROGRAM: string;
		LS_COLORS: string;
		npm_lifecycle_script: string;
		SSH_AUTH_SOCK: string;
		WARP_FOCUS_URL: string;
		SHELL: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		MAKE_TERMOUT: string;
		GPG_AGENT_INFO: string;
		XDG_VTNR: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		npm_config_globalignorefile: string;
		npm_execpath: string;
		XDG_DATA_DIRS: string;
		XDG_CONFIG_DIRS: string;
		npm_config_global_prefix: string;
		HOMEBREW_REPOSITORY: string;
		npm_command: string;
		MFLAGS: string;
		KDE_SESSION_UID: string;
		MEMORY_PRESSURE_WRITE: string;
		INIT_CWD: string;
		EDITOR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_BACKEND_URL: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
