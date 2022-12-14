import { TableBody, Table, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Modal, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NoDataFound from '../../common/NoDataFound'
import { getAllJobApplications } from '../../redux/actions/jobApplicationAction'

const JonApplicationModal = ({ jobId, show, onHide }: any) => {
    const dispatch = useDispatch()

    const [pageNo, setPageNo] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)

    const getAllJobApplicationsData = useSelector((state: any) => state.jobApplicationData.getAllJobApplication)

    useEffect(() => {
        dispatch(getAllJobApplications(perPage, pageNo, "", jobId, "", '', ""))
    }, [perPage, pageNo, jobId])

    const viewAll = () => {
        setPerPage(getAllJobApplicationsData.data.page_count)
    }
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter" setLoginType
                centered
                className="loginmodal p-3"
            >
                <Modal.Header closeButton className='title-name'>Apllicants</Modal.Header>
                <Modal.Body>
                    <div className='deshboard-main all_applicants' style={{ overflow: "auto" }}>
                        <div className='top_job_table'>
                            <Table sx={{ minWidth: 650 }} className={getAllJobApplicationsData && getAllJobApplicationsData?.data?.data?.length > 0 ? "" : 'd-block'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell >Phone</TableCell>
                                        <TableCell >Email</TableCell>
                                        <TableCell >Experience</TableCell>
                                        <TableCell >State</TableCell>
                                        <TableCell >Town</TableCell>
                                        <TableCell >Shifts</TableCell>
                                        <TableCell >Type</TableCell>
                                        <TableCell >salary</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={getAllJobApplicationsData && getAllJobApplicationsData?.data?.data?.length > 0 ? "text-center" : 'd-block'}>
                                    {getAllJobApplicationsData && getAllJobApplicationsData.data && getAllJobApplicationsData.data.data && getAllJobApplicationsData.data.data.length > 0 ? getAllJobApplicationsData.data.data.map((item: any, index: number) => (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell >{item.user_details.name}</TableCell>
                                            <TableCell >{item.job_details.phone}</TableCell>
                                            <TableCell >{item.job_details.email}</TableCell>
                                            <TableCell >{item.experience}</TableCell>
                                            <TableCell >{item.job_details.state.name}</TableCell>
                                            <TableCell >{item.job_details.town}</TableCell>
                                            <TableCell >{item.job_details.shifts}</TableCell>
                                            <TableCell >{item.job_details.type}</TableCell>
                                            <TableCell >{item.job_details.salary}</TableCell>
                                        </TableRow>
                                    )) : <NoDataFound text="Job application no found" />}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    {getAllJobApplicationsData?.data?.page_count > perPage ?
                        <div className='text-center mt-3 mb-3'>
                            <button className='view_all_btn' onClick={() => viewAll()}>View all apliction</button>
                        </div> : ""}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JonApplicationModal