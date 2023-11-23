import React, { useState, useEffect } from "react";

function Node({val}) {
  const [values, setValues] = useState(null);

  useEffect(() => {
    fetch("/getvalue/" + val)
      .then(response => response.text())
      .then(data => {
        setValues(data);
      })
      .catch(error => {
        console.error("Error fetching values:", error);
      });
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      <p>{values}</p>
    </div>
  );
}

export default Node;