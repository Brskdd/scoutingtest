import React, { useState, useEffect } from "react";

function Node({id, name, type, posx1, posy1, posx2, posy2, color, values }) {
    /*const [nodeid, setnodeid] = useState(null);
    const [nodename, setnodename] = useState(null);
    const [nodetype, setnodetype] = useState(null);
    const [nodeposx1, setnodeposx1] = useState(null);
    const [nodeposy1, setnodeposy1] = useState(null);
    const [nodeposx2, setnodeposx2] = useState(null);
    const [nodeposy2, setnodeposy2] = useState(null);
    const [nodecolor, setnodecolor] = useState(null);*/
    const [nodevalues, setnodevalues] = useState(null);
    let offsetx = +posx1*20 + +window.innerWidth / 2;
    let offsety = +posy1*20 + +window.innerHeight / 2;
    const divStyle = {
        position: "fixed",
        backgroundColor: "#" + color,
        top: offsety + "px",
        left: offsetx + "px",
        width: posx2*20 + "px",
        height: posy2*20 + "px",
        // Add any other styles as needed
    };
    /*useEffect(() => {
        fetch("/getnodeid/" + nodeid)
            .then(response => response.text())
            .then(data => {
                setnodeid(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodename/" + nodename)
            .then(response => response.text())
            .then(data => {
                setnodename(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodetype/" + nodetype)
            .then(response => response.text())
            .then(data => {
                setnodetype(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodeposx1/" + nodeposx1)
            .then(response => response.text())
            .then(data => {
                setnodeposx1(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodeposy1/" + nodeposy1)
            .then(response => response.text())
            .then(data => {
                setnodeposy1(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodeposx2/" + nodeposx2)
            .then(response => response.text())
            .then(data => {
                setnodeposx2(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodeposy2/" + nodeposy2)
            .then(response => response.text())
            .then(data => {
                setnodeposy2(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    useEffect(() => {
        fetch("/getnodecolor/" + nodecolor)
            .then(response => response.text())
            .then(data => {
                console(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);*/ //why did i add these?????

    useEffect(() => {
        //REWORK ME TO FETCH FOR EACH PIECE IN THE LIST AND PUT IT BACK TOGETHER
        fetch("/getvalue/" + values)
            .then(response => response.text())
            .then(data => {
                setnodevalues(data);
            })
            .catch(error => {
                console.error("Error fetching nodevalues:", error);
            });
    }, []);

    return (
        <div style={divStyle}>
            <p>value: {nodevalues}</p>
            <p>name: {name}</p>
        </div>
    );
}

export default Node;