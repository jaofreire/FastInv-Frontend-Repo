import { fetchMainInfos } from "@/api/api-main-info";
import { MainInfoType } from "@/types/api-response-types/main-info/main-info-type";

export const getMainInfos = async(companyId: string) : Promise<MainInfoType> =>{
    const response = await fetchMainInfos(companyId);
    return response;
}