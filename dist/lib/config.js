import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
const CONFIG_PATH = join(homedir(), ".opencode", "openai-codex-auth-config.json");
/**
 * Default plugin configuration
 * CODEX_MODE is enabled by default for better Codex CLI parity
 */
const DEFAULT_CONFIG = {
    codexMode: true,
    max_account_switches: 0,
    switch_on_first_rate_limit: true,
    switch_account_delay_ms: 500,
};
/**
 * Load plugin configuration from ~/.opencode/openai-codex-auth-config.json
 * Falls back to defaults if file doesn't exist or is invalid
 *
 * @returns Plugin configuration
 */
export function loadPluginConfig() {
    try {
        if (!existsSync(CONFIG_PATH)) {
            return DEFAULT_CONFIG;
        }
        const fileContent = readFileSync(CONFIG_PATH, "utf-8");
        const userConfig = JSON.parse(fileContent);
        // Merge with defaults
        return {
            ...DEFAULT_CONFIG,
            ...userConfig,
        };
    }
    catch (error) {
        console.warn(`[openai-codex-plugin] Failed to load config from ${CONFIG_PATH}:`, error.message);
        return DEFAULT_CONFIG;
    }
}
/**
 * Get the effective CODEX_MODE setting
 * Priority: environment variable > config file > default (true)
 *
 * @param pluginConfig - Plugin configuration from file
 * @returns True if CODEX_MODE should be enabled
 */
export function getCodexMode(pluginConfig) {
    // Environment variable takes precedence
    if (process.env.CODEX_MODE !== undefined) {
        return process.env.CODEX_MODE === "1";
    }
    // Use config setting (defaults to true)
    return pluginConfig.codexMode ?? true;
}
/**
 * Get the maximum number of account switches allowed.
 * 0 means unlimited (all accounts will be tried).
 * Priority: environment variable > config file > default (0)
 */
export function getMaxAccountSwitches(pluginConfig) {
    if (process.env.OPENCODE_OPENAI_MAX_ACCOUNT_SWITCHES !== undefined) {
        const parsed = parseInt(process.env.OPENCODE_OPENAI_MAX_ACCOUNT_SWITCHES, 10);
        return Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
    }
    return pluginConfig.max_account_switches ?? 0;
}
/**
 * Whether to switch accounts on the first 429 response.
 * Priority: environment variable > config file > default (true)
 */
export function getSwitchOnFirstRateLimit(pluginConfig) {
    if (process.env.OPENCODE_OPENAI_SWITCH_ON_FIRST_RATE_LIMIT !== undefined) {
        return process.env.OPENCODE_OPENAI_SWITCH_ON_FIRST_RATE_LIMIT === "1";
    }
    return pluginConfig.switch_on_first_rate_limit ?? true;
}
/**
 * Delay in milliseconds before switching accounts.
 * Priority: environment variable > config file > default (500)
 */
export function getSwitchAccountDelayMs(pluginConfig) {
    if (process.env.OPENCODE_OPENAI_SWITCH_ACCOUNT_DELAY_MS !== undefined) {
        const parsed = parseInt(process.env.OPENCODE_OPENAI_SWITCH_ACCOUNT_DELAY_MS, 10);
        return Number.isNaN(parsed) ? 500 : Math.max(0, parsed);
    }
    return pluginConfig.switch_account_delay_ms ?? 500;
}
//# sourceMappingURL=config.js.map