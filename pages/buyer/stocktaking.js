import React, {useState, useEffect} from "react";
import Router from "next/router";
import {Acl} from "./../acl";
import { useQuery } from '@apollo/client';
import { getProducts } from '../../graphql/queries';
import {
  NavLink,
  Form,
  FormGroup,
  Input,
  InputGroup,
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
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const Stocktaking = (props) => {
  const styles = {
    marginTop: '1rem',
    marginBottom: '1rem',
    border: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.2)'
  }

  const cardStyle = { width: "18rem" };

  const [rangeSlider, setRangeSlider] = useState(50);
  const [rangeSliderMinValue, setRangeSliderMinValue] = useState(0);
  const [rangeSliderMaxValue, setRangeSliderMaxValue] = useState(100);
  const [listProducts, setListProducts] = useState([]);
  const [listProductsStatic, setListProductsStatic] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const getProductsResponse = (dat) => {
    const response = JSON.parse(dat.getProducts.response)
    setListProducts(response);
    setListProductsStatic(response);
  };
  const getProductsData = useQuery(getProducts, {
    onCompleted: (data) => getProductsResponse(data),
    onError: (error) => console.log("error =>", error)
  });

  Acl(JSON.stringify(Router.router))

  const keyUpFilter = () => {
    let filter = ''+filterInput;
    let listProdructsTemp = listProductsStatic.filter((item) =>{
      let name = ''+item.name;
      let sku = ''+item.sku;
      if(name.toUpperCase().includes(filter.toUpperCase()) || sku.toUpperCase().includes(filter.toUpperCase())){
        return item;
      }
    });
    setListProducts(listProdructsTemp);
  }

  const clear = () =>{
    setListProducts(listProductsStatic);
  }

  const getMinMaxPrice = ()=>{
    let arrayPrice = [];
    listProductsStatic.map((item)=>{
      arrayPrice.push(item.price);
    });
    setRangeSliderMinValue(Number(Math.min(...arrayPrice)));
    setRangeSliderMaxValue(Number(Math.max(...arrayPrice)))
    setRangeSlider(Number(Math.max(...arrayPrice)) / 2)
  }

  const filterPrice = (value) =>{
    setRangeSlider(value)
    let listProdructsTemp = listProductsStatic.filter((item) =>{
      let price = Number(item.price);
      if(price >= Number(rangeSlider) && price <= rangeSliderMaxValue){
        return item;
      }
    });
    setListProducts(listProdructsTemp);
  }

  useEffect(() => {
    if(listProductsStatic.length > 0)
      getMinMaxPrice();
  }, [listProductsStatic])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="2">
          </Col>
          <Col className="mb-5 mb-xl-0" xl="5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Buscar por nombre y/o SKU"
                    type="email"
                    xl="2"
                    onKeyUp={keyUpFilter}
                    onChange={(e) => setFilterInput(`${e.target.value}`)}
                    // invalid={errorEmailInput}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
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
              <Col xl="8">Precios</Col>
              <Col>
                <NavLink
                  href=""
                  // onClick={closeCollapse}
                  className='text-primary p-0'
                >
                    {"$"+rangeSlider}
                </NavLink>
              </Col>
            </Row>
            <RangeSlider
              value={rangeSlider}
              max={rangeSliderMaxValue}
              min={rangeSliderMinValue}
              onChange={e => filterPrice(e.target.value)}
            />
            <Row>
              <Col xl="8">
                <NavLink
                  href=""
                  // onClick={closeCollapse}
                  className='p-0'
                >
                    {"$"+rangeSliderMinValue}
                </NavLink>
              </Col>
              <Col>
                <NavLink
                  href=""
                  // onClick={closeCollapse}
                  className='p-0'
                >
                    {"$"+rangeSliderMaxValue}
                </NavLink>
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
