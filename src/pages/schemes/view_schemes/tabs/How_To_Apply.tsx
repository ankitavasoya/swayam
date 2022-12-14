import React, { FC, useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'

const How_To_Apply = (getJobById: any, getOneSchemeData: any) => {

    const [getJobByIdData, setGetJobByIdData] = useState<any[]>([])
    const [getOneScheme, setGetOneScheme] = useState<any[]>([])

    const accordionData = [
        {
            eventKey: "0",
            title: "Application Form",
            body: "",
        },
        {
            eventKey: "1",
            title: "Recommended and Forwarded",
            body: "",
        },
        {
            eventKey: "2",
            title: "Application Process",
            body: "",
        },
        {
            eventKey: "3",
            title: "Medical Superintendent",
            body: "",
        },
        {
            eventKey: "4",
            title: "Hospital Expenses Estimation Certificate",
            body: "",
        },
    ]

    useEffect(() => {
        if (getJobById.getOneSchemeData && getJobById.getOneSchemeData.data) {
            let key = Object.keys(getJobById.getOneSchemeData?.data)
            let tempp: any[] = []
            accordionData.map(item => {
                return key?.find(key => {
                    let newKeys = key.split('_').join(' ').toLowerCase()
                    if (item.title.toLowerCase() === newKeys && getJobById.getOneSchemeData.data[key]) {
                        tempp.push({ ...item, body: getJobById.getOneSchemeData.data[key] })
                        setGetOneScheme(tempp)
                    }
                })
            })
        }
    }, [getJobById.getOneSchemeData])

    useEffect(() => {
        if (getJobById?.getJobById && getJobById?.getJobById?.data) {
            let keys = Object.keys(getJobById.getJobById?.data)
            let temp: any[] = []

            accordionData.map(item => {
                return keys?.find(key => {
                    let newKey = key.split('_').join(' ').toLowerCase()
                    if (item.title.toLowerCase() === newKey && getJobById.getJobById.data[key]) {
                        temp.push({ ...item, body: getJobById.getJobById.data[key] })
                        setGetJobByIdData(temp)
                    }
                })

            })
        }
    }, [getJobById])


    return (
        <>
            <Accordion defaultActiveKey="0" className='mt-3 howtoapply-accordion'>
                {getJobByIdData.map((item) => (
                    <Accordion.Item eventKey={item.eventKey}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                            {item.body}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}

                {getOneScheme.filter((ele) => ele.body !== null).map((item) => (
                    <Accordion.Item eventKey={item.eventKey}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                            {item.body && item.body}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

export default How_To_Apply