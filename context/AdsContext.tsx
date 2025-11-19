// import React, { createContext, useState, ReactNode } from "react";


export type Ad = {

    id: string;
    title: string;
    description: string;
    price: string;
    image: string[] ;
    contacts: string;
    category: string;

}

interface LoginProps {
    username: string;
    password: string;
}