import { ReactNode } from "react";

export interface userLogin {
    userName: string,
    password: string
}

export interface INewUser {
    userName: string,
    password: string,
    email: string,
    uroleId: number,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,

}

export interface IContact {
    userName: string,
    email: string,
    requestDetails: string

}

export interface usersProfile {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
}

export interface order {
    orderId: string,
    officesId: string,
    userId: string,
    orderDate: string,
}

interface event {
    id: number;
    start: moment.MomentInput; // or moment.MomentInput
    end: moment.MomentInput;   // or moment.MomentInput
}


export interface office {
    officeId: any;
    id: string,
    officeName: string,
    location: string,
    capacity: string,
    rent_price: string,
    picture: string

}

export interface cartItem {

    id: string,
    quantity: number,
    office: office
}

