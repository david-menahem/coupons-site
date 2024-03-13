import { CompanyModel } from "./UserModel";

class CouponModel{

    public id?: number;
    public company: CompanyModel;
    public category: string;
    public title: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public amount: number;
    public price: number;
    public imageFile?: File | FileList;
    public image?: Blob;
}
export default CouponModel;