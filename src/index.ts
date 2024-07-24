#!/usr/bin/env node
import { Command } from "commander"

import { login } from "./commands/login"
import { getPackageInfo } from "./utils/get-package-info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo()
  const program = new Command()
    .name("inch-cli")
    .description("simple make cli tool")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )
  program.addCommand(login)
  program.parse()
}

main()