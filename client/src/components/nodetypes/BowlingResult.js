import React, { useState, useEffect } from "react"
function BowlingResult({ list }) {

    return (
        <div>
            {list.map((item, index) => (
                <p
                    key={index}
                    style={{
                        display: "inline-block",
                        margin: "2px",
                        color: item.val === 0 ? "red" : "green",
                    }}
                >
                    <strong>{item.val === 0 ? "🟥" : "🟩"}</strong>
                </p>
            ))}
        </div>
    )
}

export default BowlingResult