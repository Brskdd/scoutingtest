import React, { useState, useEffect } from "react";

function SingleValue({inputs}) {
    const val = String(inputs[0][0]).padStart(4, "0") + String(inputs[0][1]).padStart(4, "0") + inputs[0][2]

    //ok so it gets an envar like 00590006TeleopHighCones find a way to get that key in the envvars for the bank
    return (
        <div>
            <p>envvar input is {val}</p>
        </div>
    )
}
export default SingleValue