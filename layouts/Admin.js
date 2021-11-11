import React from "react";
import { useRouter } from "next/router";
import GenericNavbar from "components/Navbars/GenericNavbar.js";
import routes from "routes.js";

function Admin(props) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <GenericNavbar {...props} brandText={getBrandText()} showImage={true} />
        {props.children}
      </div>
    </>
  );
}

export default Admin;
