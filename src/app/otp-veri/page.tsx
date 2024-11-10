"use client";
import { useState } from "react";

export default function () {
    const [otp, setOtp] = useState("");
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
            <label>Enter otp</label>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="otp"
            />

            <br />
            <button type="submit">submit</button>
        </form>
    );
}
