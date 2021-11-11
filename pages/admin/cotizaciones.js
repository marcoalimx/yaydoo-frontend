import React from "react";
import Admin from "layouts/Admin.js";

import Header from "components/Headers/Header.js";

const Cotizaciones = (props) => {
    return (
        <>
            <Header />
            <div>Cotizaciones screen</div>
        </>
    )
}

Cotizaciones.layout = Admin;

export default Cotizaciones;