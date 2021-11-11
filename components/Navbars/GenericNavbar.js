import React, {useState} from "react";
import Link from "next/link";
import Router from "next/router";
// reactstrap components
import {
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NavbarBrand,
  CardImg
} from "reactstrap";

function GenericNavbar({ showImage }) {
  const [actionModal, setactionModal] = useState(false);
  const navigateToLogin = () =>{
    Router.push("/auth/login");
  }
  const navigateToRegister = () =>{
    Router.push("/auth/register");
  }
  const showModal = () =>{
    setactionModal(true);
  }
  const hiddenModal = () =>{
    setactionModal(false);
  }
  
  return (
    <>
      <div>
        <Modal toggle={hiddenModal} isOpen={actionModal}>
          <ModalHeader
            close={<button className="close" onClick={hiddenModal}>×</button>}
            toggle={hiddenModal}
          >
            Crear una cuenta
          </ModalHeader>
          <ModalBody>
            Registrate o incia sesión para empezar a agregar productos a tu inventario.
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={navigateToLogin}
            >
              INICIAR SESIÓN
            </Button>
            {' '}
            <Button onClick={navigateToRegister}>
              REGISTRARTE
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
          <NavbarBrand>
            {
              showImage 
              && 
              <img style={{width: 140}} alt={"..."} className="navbar-brand-img" src={require("assets/img/brand/nextjs_argon_black.png")} />
            }
          </NavbarBrand>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <div style={{ color: 'black' }} onClick={showModal}>iniciar sesión</div>
                  </Media>
                </Media>
              </DropdownToggle>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default GenericNavbar;
