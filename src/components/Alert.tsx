import { toast } from "react-toastify";

interface AlertProps {
    isError: Boolean
    setError: (open: boolean) => boolean | void;
   
    isSuccess: Boolean;
    children: React.ReactNode;
}
console.log('Alert');

const Alert: React.FC<AlertProps> = ({ isError, isSuccess,setError, children }) => {
    return (
        <>
            {
                isError ?
                    toast.error("err Notification")
                    :
                    ""
            }
            {
                isSuccess ?
                    toast.success("Success Notification !")
                    :
                    ""
            }
        </>
    );
};

export default Alert;

