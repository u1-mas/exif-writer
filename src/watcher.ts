import { addCallback } from "./settings.ts";
import { logger } from "./logger.ts";

export class DirectoryWatcher {
  watcher: Deno.FsWatcher | null = null;
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async watchStart() {
    if (this.watcher !== null) {
      logger.info("watcher is already running.");
      return;
    }
    logger.info("file watch start.");
    this.watcher = Deno.watchFs(this.path);
    for await (const event of this.watcher) {
      if (event.kind === "create") {
        console.log(event);
      }
    }
  }

  watchStop() {
    if (this.watcher === null) {
      logger.info("watcher is not running.");
      return;
    }
    this.watcher.close();
    logger.info("file watch stop.");
    this.watcher = null;
  }

  isRunning = this.watcher === null;
}
