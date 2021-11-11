import React, {useState} from "react";
import { useMutation } from '@apollo/client';
import { register } from '../../graphql/mutations';
import Router from "next/router";

import Link from "next/link";

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

function Register() {

  const [emailInput, setEmailInput] = useState("");
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorPasswordInput, setErrorPasswordInput] = useState(false);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorConfirmPasswordInput, setErrorConfirmPasswordInput] = useState(false);
  const [errorExitsUser, setErrorExitsUser] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const [registerMutation] = useMutation(register, {
    onCompleted({ register }) {
      if (register.statusCode === 200) {
        const response = JSON.parse(register.response);
        saveStorage(response);
        Router.push("/seller/dashboard");
      }else if (register.statusCode === 201) {
        setErrorExitsUser(register.message);
      }else{
        setErrorRegister("Error al realizar registro")
      }
    },
    onError(error) {},
  });

  const submitRegister = () =>{
    console.log("registrarme")
    setErrorExitsUser("");
    setErrorRegister("");
    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;

    console.log(emailInput);
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
    if (confirmPasswordInput === ""){
      setErrorConfirmPasswordInput(true);
      confirmPasswordError = true;
    }else{
      setErrorConfirmPasswordInput(false);
    }
    
    if(!emailError && !passwordError && !confirmPasswordError){
      const input = {
        email: emailInput,
        password: passwordInput,
      };      
      registerMutation({  variables: { input }  });
    }
  }

  const onChangeEmail = (value) =>{
    setEmailInput(value)
  }
  const onChangePassword = (value) =>{
    setPasswordInput(value)
  }
  
  const onChangeConfirmPassword = (value) =>{
    setConfirmPasswordInput(value)
  }

  const saveStorage = (response)=>{
    localStorage.setItem('role', response.role)
    localStorage.setItem('name', response.name)
    localStorage.setItem('id', response.id)
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Correo"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => onChangeEmail(`${e.target.value}`)}
                    invalid={errorEmailInput}
                  />
                  <FormFeedback>{"El campo correo es requerido"}</FormFeedback>
                </InputGroup>
                <Col style={{textAlign: "left"}}>
                    <span className="text-red" >
                      {errorExitsUser}
                    </span>
                  </Col>
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirmar password"
                    type="password"
                    autoComplete="new-password"
                    invalid={errorConfirmPasswordInput}
                    onChange={(e) => onChangeConfirmPassword(`${e.target.value}`)}
                  />
                  <FormFeedback>{"El campo confirmar password es requerido"}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <Col style={{textAlign: "center"}}>
                <span className="text-red" >
                  {errorRegister}
                </span>
              </Col>
              <Row className="my-4">
                <Col xs="12">
                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="button" onClick={submitRegister}>
                      REGISTRARME
                    </Button>
                  </div>
                </Col>
                <Col xs="12">
                  <div className="text-center mt-4">
                  <Link href="/auth/login">
                      <NavLink className="nav-link-icon">
                        <span className="nav-link-inner--text">Iniciar sesión</span>
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

Register.layout = Auth;

export default Register;
