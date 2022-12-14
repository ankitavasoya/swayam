
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

const Documentation = (props: any, getJobById: any) => {
  const [data, setData] = useState()
  const [documentation, setDocumentation] = useState()


  useEffect(() => {
    if (props.setDocumentationData !== undefined) {
      setData((props.setDocumentationData))
    }
  }, [props.setDocumentationData])

  useEffect(() => {
    if (props.getJobById !== undefined) {
      setData(props.getJobById)
    }
  }, [props.getJobById])



  // const Documentationdata = [
  //   {
  //     text: "Proof of Caste: Caste Certificate*"
  //   },
  //   {
  //     text: "Proof of Income (Must have): Income Certificate (Family)*"
  //   },
  //   {
  //     text: "Hospital Expenses Estimate (Must have): Hospital Expenses Estimate Certificate*"
  //   },
  // ]

  return (
    <>
      {data &&
        <pre className='documentation'>
          {ReactHtmlParser(data)}
        </pre>
      }

      {
        documentation &&
        <pre className='documentation'>
          {ReactHtmlParser(documentation)}
        </pre>
      }


      {/* {
        Documentationdata.map((item) => (
          <div className='documentation'>
            <h3>{item.text}</h3>
          </div>
        ))
      } */}
    </>
  )
}

export default Documentation



// color: #D01124;
//     font-family: Lato;
//     font-size: 20px;
//     font-weight: bold;
//     letter-spacing: 0;
//     line-height: 32px;
//     margin-bottom: 0px;