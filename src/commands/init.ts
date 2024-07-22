import { Command } from "commander"

export const init = new Command().command("init").description("initialize a new cli").action(() => {
    console.log("init");
});