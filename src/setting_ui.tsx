import { WebUI } from "webui";
import { logger } from "./logger.ts";
import { pickDirectory } from "@ayonli/jsext/dialog";
import { updateSettings } from "./settings.ts";

export const buildSettingUi = () => {
  const window = new WebUI();
  window.setSize(520, 400);
  window.bind("MyID", (e) => {
    logger.info("called MyID:", e);
  });
  window.bind("Input", async () => {
    const dirname = await pickDirectory();
    await updateSettings({ input: dirname?.toString() });
  });
  window.bind("Output", async () => {
    const dirname = await pickDirectory();
    await updateSettings({ output: dirname?.toString() });
  });
  return window;
};
