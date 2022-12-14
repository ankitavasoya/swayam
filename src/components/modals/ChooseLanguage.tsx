import { log } from 'console';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { Item } from 'react-bootstrap/lib/Breadcrumb';
import { Translation, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiGet } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import { allScheme } from '../../redux/actions/schemesAction';
interface langdata {
    name: string,
    id: string
}

const ChooseLanguage = ({ show, onHide }: any) => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const [selectedLanguage, setSelectedLanguage] = useState<string | null>();
    const [langdata, setLangdata] = useState<langdata[]>([])

    useEffect(() => {
        if (show) {
            ApiGet(`language/getLanguage`).then((res: any) => {
                if (res?.data?.length) {
                    setLangdata(res.data)
                }
            })
        }
    }, [show])

    useEffect(() => {
        setSelectedLanguage(AuthStorage.getStorageData(STORAGEKEY.language ?? ''))
    }, [langdata])

    const onSubmit = () => {
        let selected = langdata.find(item => item.id === selectedLanguage)?.name.slice(0, 2).toLowerCase()
        AuthStorage.setStorageData(STORAGEKEY.language, selectedLanguage, true);
        AuthStorage.setStorageData(STORAGEKEY.lang, selected, true);
        i18next.changeLanguage(selected)
        // navigate(-1)
        onHide();
    }

    const handleChange = (e: string) => {
        setSelectedLanguage(e);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="choose-language-modal"
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className="mt-3 choose-language-data">
                    <p className=''>{t("chooseLanguageModel.title")}</p>
                    {
                        langdata && langdata.map((item: any, i: number) =>
                            <>
                                <Form.Group className="ckeckbox-label-div d-flex" key={i}>
                                    <Form.Check
                                        checked={selectedLanguage === item.id}
                                        onChange={(e: any) => handleChange(e.target.id)}
                                        type="checkbox"
                                        className='checkbox me-2'
                                        id={item.id}
                                        name="english"
                                    />
                                    <label htmlFor="english">{t(`Header.${item.name?.toLowerCase()}`)}</label>
                                </Form.Group>
                                <br />
                            </>
                        )
                    }
                    <Button onClick={() => onSubmit()}>{t("chooseLanguageModel.done")}</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ChooseLanguage