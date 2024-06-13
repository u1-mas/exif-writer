import { cache } from "cache";
import SysTray, { Menu, MenuItem } from "systray";
import { logger } from "./logger.ts";
import { WebUI } from "webui";
import { DirectoryWatcher } from "./watcher.ts";

async function getIconUrl() {
  const { os } = Deno.build;
  const iconUrl =
    "https://raw.githubusercontent.com/wobsoriano/deno-systray/master/example";

  let iconName;

  switch (os) {
    case "windows":
      iconName = `${iconUrl}/icon.ico`;
      break;
    case "darwin":
    case "linux":
      iconName = `${iconUrl}/icon.png`;
      break;
    default:
      throw new Error(`Unsupported operating system: ${os}`);
  }

  const icon = (await cache(iconName)).path;

  return icon;
}

const icon = await getIconUrl();

interface MenuItemClickable extends MenuItem {
  click?: () => void;
  items?: MenuItemClickable[];
}

interface CustomMenu extends Menu {
  items: MenuItemClickable[];
}

export const startSystray = (window: WebUI, watcher: DirectoryWatcher) => {
  const menu: CustomMenu = {
    icon,
    isTemplateIcon: Deno.build.os === "darwin",
    title: "Title",
    tooltip: "Tooltip",
    items: [
      {
        title: "Settings",
        tooltip: "Open setting",
        async click() {
          logger.info("setting clicked");
          if (!window.isShown) {
            window.show("dist/index.html");
            await WebUI.wait();
          }
        },
      },
      SysTray.separator,
      {
        title: "Start",
        tooltip: "Start file watcher",
        async click() {
          await watcher.watchStart();
        },
      },
      {
        title: "Stop",
        tooltip: "Stop file watcher",
        click() {
          watcher.watchStop();
        },
      },
      SysTray.separator,
      {
        title: "Exit",
        tooltip: "Exit the tray menu",
        click() {
          systray.kill();
        },
      },
    ],
  };

  const systray = new SysTray({
    menu,
    debug: true,
    directory: "bin",
  });

  systray.on("ready", () => {
    logger.info("systray ready!");
  });

  systray.on("click", (action) => {
    if ((action.item as MenuItemClickable).click) {
      (action.item as MenuItemClickable).click!();
    }
  });

  systray.on("exit", (d) => {
    logger.info("systray exit:", d);
  });

  systray.on("error", (e) => {
    logger.error("systray error:", e);
  });
};
