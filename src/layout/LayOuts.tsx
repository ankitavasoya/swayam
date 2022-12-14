import React from 'react'
import { FC, useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from './headerSecond/Header';


interface Props {
    // any props that come into the component
}

const LayOuts: FC<Props> = ({ children, ...props }) => {
    return (
        <>
            <div className="main-page">
                <div className="px-0">
                    <Header />
                    <div className="children-page" {...props}>{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LayOuts