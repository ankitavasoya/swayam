import React, { useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import AcquireCard from '../../common/AcquireCard'
import ReactHtmlParser from 'react-html-parser'
import NoDataFound from '../../common/NoDataFound'
import { log } from 'console'


interface Props {
    show: boolean,
    handleClose: any,
    data: any
    heding: string
}
const Drawer: React.FC<Props> = ({ show, handleClose, data, heding }) => {
    return (
        <div>
            <div className='drawer-canvas'>
                <Offcanvas show={show} onHide={handleClose} placement={"end"} className='px-0' style={{ width: '480px' }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{heding}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='px-0'>
                        <div className='' style={{ overflow: 'auto', height: '85vh' }}>
                            {data ? data.map((item: any, index: number) => {
                                return (
                                    <div className='px-4 py-3' key={index}>
                                        <AcquireCard
                                            img={item?.thumbnail}
                                            title={item?.name}
                                            text={ReactHtmlParser(item?.detail)}
                                            btntext={"Read More"}
                                            link="link"
                                            navigateTo={item.navigateTo}
                                            isShowRating={false}
                                            imgShow={false}
                                            type={item.type}
                                            saveArticle={true}
                                        // save={"true"}
                                        />
                                    </div>
                                )
                            }) : <NoDataFound text={`${heding} data not found`} />}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )
}

export default Drawer