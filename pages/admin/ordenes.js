import React from "react";
import Admin from "layouts/Admin.js";

import Header from "components/Headers/Header.js";

const Ordenes = (props) => {
    return (
        <>
            <Header />
            <div>Ordenes screen</div>
        </>
    )
}

Ordenes.layout = Admin;

export default Ordenes;