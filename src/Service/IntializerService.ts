import axios from "axios";
import appConfig from "../Utils/Config";
import { promises } from "dns";

class IntializerService{
    public async check_data(): Promise<Boolean>{
       return await axios.get(appConfig.initilizerUrl);
    }
    public async fillDatabase(): Promise<void>{
        await axios.get(appConfig.adminUrl + "fill");
    }
}
const intializerService = new IntializerService();
export default intializerService;