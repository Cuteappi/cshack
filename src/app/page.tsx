"use client";
import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleOnClick(e) {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password, // Replace with actual IP logic or leave it as is for testing
            }),
        });
    }
    return (
        <form
            onSubmit={handleOnClick}
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                justifyItems: "center",
            }}
        >
            <label>email</label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <label>password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button type="submit">submit</button>
        </form>
    );
}
