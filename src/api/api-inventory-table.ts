import api from "./api"

export const fetchInventoryTablesByCompanyId = async (companyId : string) =>{
    var data = await api.get('/InventoryTable/company/' + companyId)
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => console.log(error));

    return data;
}

export const fetchInventoryTableById = async () =>{
    
}