import React, {useState, useEffect} from "react";
import Router from "next/router";
import {Acl} from "./../acl";
import { useQuery } from '@apollo/client';
import { getProductsAdmin, getListProviders } from '../../graphql/queries';
import {
  NavLink,
  FormGroup,
  Label,
  Input,
  Badge,
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg
} from "reactstrap";
import Buyer from "layouts/Buyer.js";
import Header from "components/Headers/Header.js";

const Stocktaking = (props) => {
  const styles = {
    marginTop: '1rem',
    marginBottom: '1rem',
    border: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.2)'
  }
  const cardStyle = { width: "18rem" };
  
  const [listProducts, setListProducts] = useState([]);
  const [listProductsStatic, setListProductsStatic] = useState([]);
  const [listProviders, setListProviders] = useState([]);
  const [badgeFilter, setBadgeFilter] = useState([]);

  const getProductsResponse = (dat) => {
    const response = JSON.parse(dat.getProductsAdmin.response)
    setListProducts(response);
    setListProductsStatic(response);
  };
  const getProductsData = useQuery(getProductsAdmin, {
    onCompleted: (data) => getProductsResponse(data),
    onError: (error) => console.log("error =>", error)
  });

  Acl(JSON.stringify(Router.router))

  const getProvidesResponse = (dat) => {
    const response = JSON.parse(dat.getListProviders.response)
    setListProviders(response);
  };
  const getProvidersData = useQuery(getListProviders, {
    onCompleted: (data) => getProvidesResponse(data),
    onError: (error) => console.log("error =>", error)
  });

  const clear = () =>{
    setListProducts(listProductsStatic);
    setBadgeFilter([]);
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for(var iterator=0; iterator<= checkboxes.length; iterator++) {
      if(checkboxes[iterator]?.checked)
        checkboxes[iterator].checked= false;
    }  
  }

  

  const filterVendor = () =>{
    var arrayFilter = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
        arrayFilter.push(checkboxes[i].value)
    }
    let listProdructsTemp = listProductsStatic.filter((item) =>{
        let find = arrayFilter.find((element) => {
            if(element == item.provider){
                return element;
            }
        });
        if(find){
            return item
        }
    });
    setListProducts(listProdructsTemp);
    setBadgeFilter(arrayFilter)
    if(arrayFilter.length == 0)
      setListProducts(listProductsStatic);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="2">
          </Col>
          <Col className="mb-5 mb-xl-0" xl="5">
            {badgeFilter.map((name) => (
                 <Badge
                    color="primary"
                    href="#"
                    className="mr-2"
                 >
                    {name}
                </Badge>
            ))}
          </Col>
        </Row>        
        <Row>
          <Col className="mb-5 mb-xl-0" xl="2">
          </Col>
          <Col className="mb-5 mb-xl-0" xl="10">
            <hr style={styles} />
          </Col>
        </Row>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="2">
            <Row>
              <Col xl="7">Filtros</Col>
              <Col>
                <NavLink
                  onClick={clear}
                  className='text-red p-0 text-right'
                >
                    Borrar
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xl="8">Proveedor</Col>
            </Row>
            <Row>
              <Col xl="8">
                <div className="">
                    {listProviders.map((item) => (
                        <FormGroup check key={item.id}>
                            <Input 
                                type="checkbox"
                                value={item.name}
                                onChange={filterVendor}
                            />
                            <Label check>
                                {item.name}
                            </Label>
                        </FormGroup>
                    ))}
                     
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="9">
            <Row>
               {listProducts.map((item) => (
                <Col xl="3" key={item.id} className="mb-3">
                  <CardDeck>
                    <Card style={cardStyle} >
                      <CardImg
                        alt="..."
                        src={require("assets/img/theme/img-1-1000x600.jpg")}
                        top
                      ></CardImg>
                      <CardBody>
                        <CardText>
                          <h4 style={{textAlign:'center'}}>{item.name}</h4>
                          <h4 style={{textAlign:'center'}}>{item.sku}</h4>
                          <h4 style={{textAlign:'center'}}>${item.price}</h4>
                        </CardText>
                      </CardBody>
                    </Card>
                  </CardDeck>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Stocktaking.layout = Buyer;

export default Stocktaking;
