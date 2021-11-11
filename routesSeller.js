var routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      layout: "/seller",
      role:"vendedor"
    },
    {
      path: "/stocktaking",
      name: "Inventario",
      layout: "/seller",
      role:"vendedor"
    },
    {
      path: "/create_product",
      name: "",
      layout: "/seller",
      role:"vendedor"
    },
  ];
  export default routes;
  