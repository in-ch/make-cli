import { Command } from "commander";
import express from "express";
import { google } from "googleapis";
import puppeteer from "puppeteer";
import fs from 'fs';
import yaml from 'js-yaml';
import chalk from 'chalk';

import boxedMessage from "@/src/utils/boxedMessage";

export const login = new Command().command("login").description("login inch-cli").action(async () => {
    console.log(chalk.bgMagentaBright("login inch-cli"));
    console.log(boxedMessage({ messages: ["Please login with your google account", "Only example.com domain is allowed"], minWidth: 40, minHeight: 5, borderColor: 'magenta', textColor: 'white' }));
    const app = express();

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ]
    });

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    app.get("/callback", async (req, res) => {
        if (req.query.code) {
            try {
                const { tokens } = await oauth2Client.getToken(String(req.query.code));
                oauth2Client.setCredentials(tokens);

                const ticket = await oauth2Client.verifyIdToken({
                    idToken: String(tokens.id_token),
                    audience: process.env.CLIENT_ID
                });
                const payload = ticket.getPayload()!;
                const domain = payload['hd'];

                if (domain === 'example.com') {
                    console.log(chalk.bgMagentaBright("login done"))
                    const inchcliConfig = {
                        code: String(req.query.code)
                    };
                    const yamlString = yaml.dump(inchcliConfig);
                    fs.writeFileSync(`${process.env.HOME}/inchcli.yaml`, yamlString);

                } else {
                    console.log(chalk.red("login failed"))
                }
                await browser.close();
                process.exit(0);
            } catch (error) {
                res.send("login failed");
            }
        } else {
            console.log(chalk.red("login failed"))
            res.send("login failed");
        }
    });

    app.listen(61234, () => { });
});
