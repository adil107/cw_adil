import toast from 'components/ui/toast';
import Notification from 'components/ui/Notification';


export const openNotification = (type='success', message) => {
    toast.push(
        <Notification
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            type={type}
        >
            {message}
        </Notification>
    );
};