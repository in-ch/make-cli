import { Command } from "commander";
import express from "express";
import { google } from "googleapis";
import puppeteer from "puppeteer";
import fs from 'fs';
import yaml from 'js-yaml';
import chalk from 'chalk';

export const login = new Command().command("login").description("login inch-cli").action(async () => {
    console.log(chalk.bgMagentaBright("로그인을 진행합니다......"));
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

                if (domain === 'neofect.com') {
                    console.log(chalk.bgMagentaBright("로그인이 완료되었습니다."))
                    const inchcliConfig = {
                        code: String(req.query.code)
                    };
                    const yamlString = yaml.dump(inchcliConfig);
                    fs.writeFileSync(`${process.env.HOME}/inchcli.yaml`, yamlString);

                } else {
                    console.log(chalk.red("로그인에 실패했습니다."))
                }
                await browser.close();
                process.exit(0);
            } catch (error) {
                res.send("로그인에 실패했습니다!");
            }
        } else {
            console.log(chalk.red("로그인에 실패했습니다."))
            res.send("로그인에 실패했습니다!");
        }
    });

    app.listen(61234, () => { });
});
