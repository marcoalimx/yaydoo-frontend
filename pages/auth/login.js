import React, {useState} from "react";
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { login } from '../../graphql/mutations';
import Router from "next/router";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
  FormFeedback
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorPasswordInput, setErrorPasswordInput] = useState(false);
  const [errorLogin, setErrorLogin] = useState("")

  const [loginMutation] = useMutation(login, {
    onCompleted({ login }) {
      if (login.statusCode === 200) {
        const response = JSON.parse(login.response);
        saveStorage(response);
        if(response.role == "administrador"){
          Router.push("/admin/stocktaking");
        }else if (response.role == "vendedor"){
          Router.push("/seller/dashboard");
        }else if (response.role == "comprador"){
          Router.push("/buyer/stocktaking");
        }
      }else{
        setErrorLogin("Usuario / Contraseña incorrectos")
      }
    },
    onError(error) {},
  });

  const saveStorage = (response)=>{
    localStorage.setItem('role', response.role)
    localStorage.setItem('name', response.name)
    localStorage.setItem('id', response.id)
  }

  const submitLogin = () =>{
    setErrorLogin("")
    let emailError = false;
    let passwordError = false;
    if(emailInput === ""){
      setErrorEmailInput(true)
      emailError = true;
    }else {
      setErrorEmailInput(false)
    }
    if (passwordInput === ""){
      setErrorPasswordInput(true);
      passwordError = true;
    }else{
      setErrorPasswordInput(false);
    }
    if(!emailError && !passwordError){
      const input = {
        email: emailInput,
        password: passwordInput,
      };      
      loginMutation({  variables: { input }  });
    }
  }

  const onChangeEmail = (value) =>{
    setEmailInput(value)
  }
  const onChangePassword = (value) =>{
    setPasswordInput(value)
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => onChangeEmail(`${e.target.value}`)}
                    invalid={errorEmailInput}
                  />
                  <FormFeedback>{"El campo email es requerido"}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    invalid={errorPasswordInput}
                    onChange={(e) => onChangePassword(`${e.target.value}`)}
                  />
                  <FormFeedback>{"El campo password es requerido"}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <Col style={{textAlign: "center"}}>
                <span className="text-red" >
                  {errorLogin}
                </span>
              </Col>
              <Row className="my-4">
                <Col xs="12">
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button" onClick={submitLogin}>
                      Iniciar sesión
                    </Button>
                  </div>
                </Col>
                <Col xs="12">
                  <div className="text-center mt-4">
                  <Link href="/auth/register">
                      <NavLink className="nav-link-icon">
                        <span className="nav-link-inner--text">Registrarme</span>
                      </NavLink>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
