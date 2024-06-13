import { initSettings, setting } from "./settings.ts";
import { logger } from "./logger.ts";
import { DirectoryWatcher } from "./watcher.ts";
import { buildSettingUi } from "./setting_ui.tsx";
import { startSystray } from "./systray.ts";

try {
  await initSettings();
  const watcher = new DirectoryWatcher(setting.input);
  const ui = buildSettingUi();
  startSystray(ui, watcher);
} catch (err) {
  console.log(err);
  logger.error(err);
}
