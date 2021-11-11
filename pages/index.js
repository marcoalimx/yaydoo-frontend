import React, { Component } from "react";
import Router from "next/router";

export default function Index() {
  React.useEffect(() => {
    //Router.push("/auth/register");
    Router.push("/public/dashboard");
  });




  // AQUI ESTA DONDE SE INDICA DONDE INCIA   

  return <div />;
}
