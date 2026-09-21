import type { PluginConfig } from "./types.js";
/**
 * Load plugin configuration from ~/.opencode/openai-codex-auth-config.json
 * Falls back to defaults if file doesn't exist or is invalid
 *
 * @returns Plugin configuration
 */
export declare function loadPluginConfig(): PluginConfig;
/**
 * Get the effective CODEX_MODE setting
 * Priority: environment variable > config file > default (true)
 *
 * @param pluginConfig - Plugin configuration from file
 * @returns True if CODEX_MODE should be enabled
 */
export declare function getCodexMode(pluginConfig: PluginConfig): boolean;
/**
 * Get the maximum number of account switches allowed.
 * 0 means unlimited (all accounts will be tried).
 * Priority: environment variable > config file > default (0)
 */
export declare function getMaxAccountSwitches(pluginConfig: PluginConfig): number;
/**
 * Whether to switch accounts on the first 429 response.
 * Priority: environment variable > config file > default (true)
 */
export declare function getSwitchOnFirstRateLimit(pluginConfig: PluginConfig): boolean;
/**
 * Delay in milliseconds before switching accounts.
 * Priority: environment variable > config file > default (500)
 */
export declare function getSwitchAccountDelayMs(pluginConfig: PluginConfig): number;
//# sourceMappingURL=config.d.ts.map