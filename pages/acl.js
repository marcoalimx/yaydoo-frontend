import React from 'react';
import Router from "next/router";
import routes from './../routes';
import routesBuyer from './../routesBuyer';
import routesSeller from './../routesSeller';
import routesPublic from './../routesPublic';

export function Acl (router) {
    var url = JSON.parse(router)?.asPath
    let unauthorizedAccess  = false;
    var urls = [
        ...routes,
        ...routesBuyer,
        ...routesSeller,
        ...routesPublic
    ]
    urls.map((items) =>{
        if(`${items.layout}${items.path}` == url){
            let role=`${localStorage.getItem("role")}`;
            if(items.role != "publico"){
                if(!role.includes(items.role)){
                    unauthorizedAccess = true
                }
            }
        }
    })
    if(unauthorizedAccess){
        Router.push("/auth/login");
    }
}