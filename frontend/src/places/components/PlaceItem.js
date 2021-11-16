import React, { useState } from 'react'
import Modal from '../../shared/components/UIElements/Modal'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import './PlaceItem.css'

const PlaceItem = props => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false)
        try {
            await sendRequest(
                `${process.env.REACT_APP_URL}places/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer '
                }
            )
            props.onDelete(props.id)
        } catch (error) { }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure"
                footer="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }>
                <p>Do you want to proced and delete this place? Please note that it
                    can't be undone thereafter. </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={`${props.imageUrl}`} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.name}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button to={`/places/${props.id}`}>
                            EDIT
                        </Button>

                        <Button danger onClick={showDeleteWarningHandler}>
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem