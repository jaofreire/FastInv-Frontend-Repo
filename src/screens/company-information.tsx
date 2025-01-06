import CompanyCard from "@/components/company-information/company-card";
import SideBar from "@/components/Global/sidebar";
import LoadingCircle from "@/components/loading/loading-circle";
import { AuthContext } from "@/contexts/auth/auth-provider";
import { getCompanyById } from "@/services/company-service";
import { CompanyType } from "@/types/api-response-types/company/company-type";
import { useContext, useEffect, useState } from "react";

function CompanyInformation() {

    const { CompanyId } = useContext(AuthContext);

    const [company, setCompany] = useState<CompanyType>();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCompany = async () => {
            const response = await getCompanyById(CompanyId);
            setCompany(response);
            setIsLoading(false);
        }

        loadCompany();
    }, []);

    if (isLoading) {
        return (<LoadingCircle />)
    }

    return (
        <>
            <SideBar />
            <CompanyCard
                Name={company!.name}
                Cnpj={company!.cnpj}
                CreatedAt={company!.createdAt}
            />
        </>
    )
}

export default CompanyInformation;