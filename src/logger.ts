import { Logger } from "@deno-lib/logger";

const logger = new Logger();
await logger.initFileLogger("./log");
logger.info("Logger setup.");

export { logger };
