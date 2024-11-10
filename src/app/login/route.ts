import { SentMessageInfo } from "./../../../node_modules/@types/nodemailer/index.d";
import { EmailTemplate, UnAuthEmail } from "../emailotp";
import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

const users = [
    {
        email: "solomonrajkumar43@gmail.com",
        password: "123",
    },
];

function getUserByEmail(email: string) {
    if (email === users[0].email) {
        return true;
    }
    return false;
}

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

export async function POST(req: Request, res: Response) {
    const { email, password } = await req.json();

    const transporter = createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "solomonrajkumar42069@gmail.com",
            pass: "zblm blja vsrv fhrr",
        },
        secure: true,
    });

    // Step 1: Check if the user exists
    const user = getUserByEmail(email);

    if (!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    }

    // Step 2: Compare the password hash
    const passwordMatch = password === users[0].password ? true : false;

    if (passwordMatch) {
        // Step 3: If password is correct, generate OTP and send it to the user's email
        const otp = generateOtp();
        try {
            const maildata = {
                from: "solomonrajkumar42069@gmail.com",
                to: "solomonrajkumar43@gmail.com",
                subject: "pls enjoy your otp",
                html: `<div><h1>Welcome, user!</h1><h3>For you my beloved</h3><h5>otp</h5><h6>${otp}</h6></div>`,
            };

            const SentMessageInfo = await transporter.sendMail(maildata);
            if (SentMessageInfo.rejected) {
                console.error(SentMessageInfo.response);
                return Response.json(SentMessageInfo.response);
            } else if (SentMessageInfo.accepted) {
                return Response.json("Email sent: " + SentMessageInfo.response);
            }
        } catch (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }
    } else {
        // Step 4: If password is incorrect, log the failed attempt and send a notification email
        const timestamp = new Date().toISOString();
        const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]; // Log failed attempt to JSON file
        try {
            const maildata = {
                from: "solomonrajkumar42069@gmail.com",
                to: "solomonrajkumar43@gmail.com",
                subject: "U R very very bad bad.",
                html: `<div>
                            <h1>hello, user!</h1>
                            <h3>Someone logged tried to login with your email!!</h3>
                            <h5>Their ip ${ip} pls DDOS</h5>
                        </div>`,
            };

            const SentMessageInfo = await transporter.sendMail(maildata);
            if (SentMessageInfo.rejected) {
                console.error(SentMessageInfo.response);
                return Response.json(SentMessageInfo.response);
            } else if (SentMessageInfo.accepted) {
                return Response.json("Email sent: " + SentMessageInfo.response);
            }
        } catch (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }
    }
}
