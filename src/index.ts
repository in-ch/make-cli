#!/usr/bin/env node
import { Command } from "commander";

import { listCli } from "@/src/commands/list";
import { imageMessageCli } from "@/src/commands/image-message";
import { getPackageInfo } from "@/src/utils/get-package-info";
import { fixedMessageCli } from "./commands/fixed-message";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name("inch-cli")
    .description("simple make cli tool")
    .version(
      `inch-cli v${packageInfo.version || "1.0.0"}`,
      "-v, --version",
      "display the version number"
    );
  program.addCommand(listCli);
  program.addCommand(imageMessageCli);
  program.addCommand(fixedMessageCli);
  program.parse();
}

main();
