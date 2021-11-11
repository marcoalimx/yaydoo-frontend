import React, {useState, useEffect} from "react";
import Router from "next/router";
import { useMutation } from '@apollo/client';
import { create_product } from '../../graphql/mutations';
import {Acl} from "./../acl";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  FormFeedback
} from "reactstrap";

// layout for this page
import Seller from "layouts/Seller.js";
import Header from "components/Headers/Header.js";

const CreateProduct = (props) => {
  Acl(JSON.stringify(Router.router))
  const [nameInput, setNameInput] = useState("");
  const [skuInput, setSkuInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const [errorNameInput, setErrorNameInput] = useState(false);
  const [errorSkuInput, setErrorSkuInput] = useState(false);
  const [errorQuantityInput, setErrorQuantityInput] = useState(false);
  const [errorPriceInput, setErrorPriceInput] = useState(false);
  const [idSeller, setIdSeller] = useState(0)

  const [response, setResponse] = useState("");

  useEffect(function() {
    setIdSeller(localStorage.getItem("id"))
  },[]);

  const [CreateProductMutation] = useMutation(create_product, {
    onCompleted({ createProduct }) {
      if (createProduct.statusCode === 200) {
        setResponse("Producto creado exitosamente");
      }else{
        setResponse("Se ha generado un error");
      }
    },
    onError(error) {
      setResponse("Se ha generado un error");
    },
  });

  const submitCreateProduct = () =>{
    let nameError = false;
    let skuError = false;
    let quantityError = false;
    let priceError = false;
    if(nameInput === ""){
      setErrorNameInput(true)
      nameError = true;
    }else {
      setErrorNameInput(false)
    }
    if (skuInput === ""){
      setErrorSkuInput(true);
      skuError = true;
    }else{
      setErrorSkuInput(false);
    }
    if (quantityInput === ""){
      setErrorQuantityInput(true);
      quantityError = true;
    }else{
      setErrorQuantityInput(false);
    }
    if (priceInput === ""){
      setErrorPriceInput(true);
      priceError = true;
    }else{
      setErrorPriceInput(false);
    }

    if(!nameError && !skuError && !quantityError && !priceError){
      const input = {
        name: nameInput,
        sku: skuInput,
        quantity: Number(quantityInput),
        price: priceInput,
        fk_user: Number(idSeller)
      };      
      CreateProductMutation({  variables: { input }  });
    }

  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-md-center">
          <Col className="mb-5 mb-xl-0 justify-content-md-center"  lg="5">
            <Card className="border-0">
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <label htmlFor="exampleFormControlInput1">Name</label>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Product name"
                        type="text"
                        onChange={(e) => setNameInput(`${e.target.value}`)}
                        invalid={errorNameInput}
                      />
                      <FormFeedback>{"El campo no puede quedar vacío"}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="SKU"
                        type="text"
                        onChange={(e) => setSkuInput(`${e.target.value}`)}
                        invalid={errorSkuInput}
                      />
                      <FormFeedback>{"El campo no puede quedar vacío"}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <label htmlFor="exampleFormControlInput1">Cantidad</label>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Cantidad"
                        type="number"
                        onChange={(e) => setQuantityInput(`${e.target.value}`)}
                        invalid={errorQuantityInput}
                      />
                      <FormFeedback>{"El campo no puede quedar vacío"}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <label htmlFor="exampleFormControlInput1">Precio</label>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Precio"
                        type="number"
                        onChange={(e) => setPriceInput(`${e.target.value}`)}
                        invalid={errorPriceInput}
                      />
                      <FormFeedback>{"El campo no puede quedar vacío"}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <Row className="my-4">
                    <Col xs="12">
                      <div style={{float: 'right'}}>
                        <Button className="mt-4" type="button" onClick={submitCreateProduct}>
                          CREAR
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  {response}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

CreateProduct.layout = Seller;

export default CreateProduct;
