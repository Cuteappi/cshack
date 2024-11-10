import * as React from "react";

interface EmailTemplateProps {
    otp: number;
}

interface EmailTemplateProps2 {
    ip: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ otp }) => (
    <div>
        <h1>Welcome, user!</h1>
        <h3>For you my beloved</h3>
        <h5>otp</h5>
        <h6>{otp}</h6>
    </div>
);

export const UnAuthEmail: React.FC<Readonly<EmailTemplateProps2>> = ({ ip }) => (
    <div>
        <h1>hello, user!</h1>
        <h3>Someone logged tried to login with your email!!</h3>
        <h5>Their ip {ip} pls DDOS</h5>
    </div>
);
