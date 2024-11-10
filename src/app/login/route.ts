import { Resend } from "resend";
import { EmailTemplate, UnAuthEmail } from "../emailotp";
import { NextApiRequest, NextApiResponse } from "next";

const users = [
    {
        email: "solomonrajkumar43@gmail.com",
        password: "123",
    },
];

const resend = new Resend("re_WETBEUZt_DPEU4V2E4V6o2Sw9cHbqXTtc");

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

    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "solomonrajkumar43@gmail.com",
            pass: "Nigga_1131",
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
                subject: "U R very very bad bad.",
                html: (
                    <div>
                        <h1>Welcome, user!</h1>
                        <h3>For you my beloved</h3>
                        <h5>otp</h5>
                        <h6>{otp}</h6>
                    </div>
                ),
            };

            if (error) {
                console.log(error);
                return Response.json({ error }, { status: 500 });
            }

            return Response.json(data);
        } catch (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }
    } else {
        // Step 4: If password is incorrect, log the failed attempt and send a notification email
        const timestamp = new Date().toISOString();
        const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0]; // Log failed attempt to JSON file
        try {
            const { data, error } = await resend.emails.send({
                from: "solomonrajkumar42069@gmail.com",
                to: "solomonrajkumar43@gmail.com",
                subject: "U R very very bad bad.",
                react: UnAuthEmail(ip),
            });

            if (error) {
                console.log(error);
                return Response.json({ error }, { status: 500 });
            }

            return Response.json(data);
        } catch (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }
    }
}
