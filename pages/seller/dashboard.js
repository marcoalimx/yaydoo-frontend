import React from "react";
import Router from "next/router";
import {Acl} from "./../acl";
import {
  Button,
  Card,
  CardBody,
  NavLink,
  CardImg,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Seller from "layouts/Seller.js";
import Header from "components/Headers/Header.js";

const Dashboard = (props) => {
  Acl(JSON.stringify(Router.router))
  const navigateToLogin = () =>{
    Router.push("/seller/create_product");
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-md-center">
          <Col className="mb-5 mb-xl-0 justify-content-md-center"  lg="10">
            <Card className="shadow border-0">
              <CardBody>
              <Row>
                <Col>
                  <Card className="bg-dark text-white border-1">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1000x600.jpg")}
                      style={{ height: 270 }}
                    ></CardImg>
                  </Card>
                </Col>
                <Col md="5">
                  <h1 className="display-3 mb-0">Crea tu</h1>
                  <h1 className="display-3">producto</h1>
                  <p className="h2 mb-0">Organiza de manera</p>
                  <p className="h2">profesional tu inventario</p>
                  <Row className="mt-5">
                    <Col md="6">
                      <NavLink className="text-primary" href="#">
                        Conocer más
                      </NavLink>
                    </Col>
                    <Col className="p-0"> 
                      <Button
                        color="primary"
                        size="sm"
                        onClick={navigateToLogin}
                      >
                        CREAR PRODUCTO
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              </CardBody>
            </Card>
            <NavLink className="text-primary mt-4" style={{textAlign: "center"}} href="#">
              Inicia sesión para poder ver tu inventario.
            </NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Seller;

export default Dashboard;
