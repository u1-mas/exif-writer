import { existsSync } from "@std/fs/exists";
import { logger } from "./logger.ts";

export type Settings = {
  input: string;
  output: string;
};
const settingPath = `${Deno.cwd()}/settings.json`;
export let setting: Settings = {
  input: "",
  output: "",
};
export const initSettings = async () => {
  if (!existsSync(settingPath)) {
    logger.info("settings.json not found.");
    await updateSettings();
    logger.info("setting.json created");
  } else {
    logger.info("setting found!");
    setting = JSON.parse(await Deno.readTextFile(settingPath));
    logger.info("loaded setting:", setting);
  }
};
export const updateSettings = async (newSettings?: Partial<Settings>) => {
  setting = {
    ...setting,
    ...newSettings,
  };
  await Deno.writeTextFile(settingPath, JSON.stringify(setting, null, 2));
  logger.info("Settings update:", setting);
  for (const callback of updateCallbacks) {
    callback();
  }
};
const updateCallbacks: Array<() => void> = [];
export const addCallback = (cb: () => void) => {
  updateCallbacks.push(cb);
};
