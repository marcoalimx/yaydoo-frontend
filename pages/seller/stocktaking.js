import React, {useState, useEffect} from "react";
import Router from "next/router";
import {Acl} from "./../acl";
import { useMutation } from '@apollo/client';
import { getProductsSeller } from '../../graphql/mutations';

import {
  Container,
  Table,
  Button
} from "reactstrap";
// layout for this page
import Seller from "layouts/Seller.js";
import Header from "components/Headers/Header.js";

const Stocktaking = (props) => {
  const [listProducts, setListProducts] = useState([]);
  const [idSeller, setIdSeller] = useState(0)

  const [getProductsSellerMutation] = useMutation(getProductsSeller, {
    onCompleted({ getProductsSeller }) {
      if (getProductsSeller.statusCode === 200) {
        setListProducts(JSON.parse(getProductsSeller.response));
      }
    },
    onError(error) {},
  });
  
  useEffect(function() {
    setIdSeller(localStorage.getItem("id"))
  },[]);

  useEffect(function() {
    if(idSeller > 0){
      getProductsSellerMutation({variables: {idSeller: Number(idSeller)} })
    }
  },[idSeller]);

  const submitCreateProduct = () =>{
    Router.push("/seller/create_product");
  }
  
  Acl(JSON.stringify(Router.router))
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div style={{float: 'right'}}>
            <Button className="mb-4" type="button" onClick={submitCreateProduct}>
                CREAR
            </Button>
        </div>
        <Table responsive className=" align-items-center">
            <thead className=" thead-light">
                <tr>
                    <th className=" sort" data-sort="name" scope="col">
                    Nombre del producto
                    </th>
                    <th className=" sort" data-sort="budget" scope="col">
                    SKU
                    </th>
                    <th className=" sort" data-sort="status" scope="col">
                    Cantidad
                    </th>
                </tr>
            </thead>
            <tbody className=" list">
                {listProducts.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.sku}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </Container>
    </>
  );
};

Stocktaking.layout = Seller;

export default Stocktaking;
