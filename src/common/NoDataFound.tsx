import React from 'react'
import Nodatafound from '../assets/img/Search_Engine_Two_Color.png'

const NoDataFound = ({ text }: any) => {
    return (
        <>
            <div className="text-center py-5">
                <img src={Nodatafound} alt="nodatafound" style={{margin:'0 auto'}} />
                <p className='text-center mt-3' style={{ fontWeight: "bold" }}>{text}</p>
            </div>
        </>
    )
}

export default NoDataFound