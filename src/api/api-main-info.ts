import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { MainInfoType } from "@/types/api-response-types/main-info/main-info-type"

export const fetchMainInfos = async (companyId: string): Promise<MainInfoType> => {
    const data = await api.get<ApiResponse<MainInfoType>>('/Main/company/' + companyId)
        .then((response) => {
            const responseData = response.data;
            return responseData.response;
        })

    return data;
}