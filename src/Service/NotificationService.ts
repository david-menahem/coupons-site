import { Notyf } from "notyf";

class NotificationService{

    private notify = new Notyf({ duration: 4000, position: {x: "center",y: "top"} });

    public success(message: string): void{
        this.notify.success(message);
    }

    public error(err: any): void{
        const message = this.extractErrorMessage(err);
        this.notify.error(message)
    }

    private extractErrorMessage(err : any): string{
        if(typeof err === "string") return err;

        if(typeof err.response?.data === "string") return err.response.data;

        if(Array.isArray(err.response?.data)) return err.response.data[0];

        if(typeof err.message === "string") return err.message;

        console.log(err);
        
        return "Some error occurred, please try again";
    }
}

const notificationService = new NotificationService();
export default notificationService;