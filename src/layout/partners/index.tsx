import React, { FC } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import '../../partners/Partners.css'


interface Props {
    // any props that come into the component
}

const PartnersLayout: FC<Props> = ({ children, ...props }) => {
    return (
        <div className="main-page">
            <div className="px-0" style={{ height: "100vh", overflow: "hidden" }}>
                <Header />
                <div className='d-flex' style={{ height: "100vh" }} >
                    <div className='sidebar-layout'><Sidebar /></div>
                    <div className="children-main" style={{ marginTop: "90px", paddingBottom: "100px", backgroundColor: "#f0f3f8" }} {...props}>{children}</div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default PartnersLayout