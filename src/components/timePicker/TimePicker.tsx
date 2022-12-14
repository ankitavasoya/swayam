import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const TimePicker = ({ value, getdata }: { getdata: any; value: string }) => {
    const [state, setState] = useState({
        hours: '',
        minutes: '',
        second: '',
    })

    const onChangeHandle = (e: any, name: any) => {
        if (name === "hours") {
            setState({ ...state, [name]: e.target.value })
        }
        if (name === "minutes" || name === "second") {
            if (Number(e.target.value) <= 60) {
                setState({ ...state, [name]: e.target.value })
            }
        }
    }
    useEffect(() => {
        if (state.hours !== '' && state.minutes !== '' && state.second !== '') {
            getdata(`${state.hours}:${state.minutes}:${state.second}`)
        }
    }, [state])

    useEffect(() => {
        if (value && value !== "00:00:00") {
            setState({ ...state, hours: value.split(":")[0], minutes: value.split(":")[1], second: value.split(":")[2] })
        }
    }, [value])

    return (
        <Col lg={12} className="addpartnercourses">
            <Row>
                <Col lg={4} className='px-2'>
                    <TextField type="number" name="hours" label="Duration hours" onChange={(e: any) => { onChangeHandle(e, 'hours') }} value={state.hours} placeholder="Hours" />
                </Col>
                <Col lg={4} className='px-2'>
                    <TextField type="number" name="minutes" label="Duration minutes" onChange={(e: any) => { onChangeHandle(e, 'minutes') }} value={state.minutes} placeholder="Minutes" />
                </Col>
                <Col lg={4} className='px-2'>
                    <TextField type="number" name="second" label="Duration seconds" onChange={(e: any) => { onChangeHandle(e, 'second') }} value={state.second} placeholder="Seconds" />
                </Col>
            </Row>
        </Col >
    )
}
export default TimePicker