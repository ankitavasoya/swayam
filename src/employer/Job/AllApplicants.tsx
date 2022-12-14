import React from 'react'
import { Row, Table } from "react-bootstrap";
import eyes from "../../assets/img/Shape@2x.png";
import click from "../../assets/img/Shape-1.png";

const AllApplicants = () => {

    const tableData = [
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
        {
            Name: "Ritika Jadhav",
            mNum: "1023567890",
            loc: "Mumbai",
            date: "19-03-2022",
            role: "Nursing",
            img1: eyes,
            img2: click,
        },
    ]
    return (
        <>
            <div className='all_applicants' style={{ marginTop: "80px" }}>
                <Table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Location </th>
                            <th>Date of Application</th>
                            <th>Role Applied</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((item) => (
                                <tr className=''>
                                    <td>{item.Name}</td>
                                    <td>{item.mNum}</td>
                                    <td>{item.loc}</td>
                                    <td>{item.date}</td>
                                    <td>{item.role}</td>
                                    <td className='pt-3 '>
                                        <div className='d-flex justify-content-around'>
                                            <img src={item.img1} alt="" className='me-auto' style={{ height: "10.91px", width: " 16px", }} />
                                            <img src={item.img2} alt="" className='' />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default AllApplicants