import cloneDeep from 'lodash/cloneDeep'
import React, { useState } from "react";
import { ConfirmDialog } from 'components/shared'
import useMarchant from 'utils/hooks/useMerchant';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Alert } from 'components/ui';
import toast from 'components/ui/toast';
import Notification from 'components/ui/Notification';


const UpdateStatusMethod = (props) => {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useTimeOutMessage();

    const { updateMerchantStatus } = useMarchant()

    const { dialogOpen, onDialogClose, status, userID, onSuccess } = props

    const updateStatus = async () => {

        try {
            setLoading(true);
            await updateMerchantStatus(userID, status);
            toast.push(
                <Notification
                    title={"User Status Updated"}
                    type={"success"}
                >
                    You have successfully updated the status of the user.
                </Notification>
            )
            onSuccess()
            setLoading(false);
        }
        catch (e) {
            setLoading(false);
            setMessage(e.message);
        }

    }



    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Update user status"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={updateStatus}
            loading={loading}

        >
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}


            <p> Are you sure you want to update the status of user from {!status === true ? "active" : "deactive"} to {status === true ? "active" : "deactive"}? </p>
        </ConfirmDialog>
    )
}

export default UpdateStatusMethod
