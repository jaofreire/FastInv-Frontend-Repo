import UserCard from "@/components/all-users/user-card";
import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/contexts/auth/auth-provider";
import { getUsersByCompanyId } from "@/services/user-service";
import { UserType } from "@/types/api-response-types/user/user-type";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AllUsers() {
    const [users, setUsers] = useState<UserType[]>([]);

    const { CompanyId } = useContext(AuthContext);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await getUsersByCompanyId(CompanyId);
            setUsers(response);
        }

        loadUsers();
    }, []);


    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full h-full overflow-auto">
                            <div className="flex flex-col">
                                <CardHeader className="flex mb-5 w-full h-28 ">
                                    <div className="flex w-full h-full">
                                        <div className="w-full">
                                            <CardTitle className="pt-5 pl-10 text-3xl font-bold">Funci<span className="text-orange-400">onários</span>:</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                            </div>
                            <CardContent className="flex flex-col items-center gap-5 w-full h-full justify-start">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {users.map((user) => (
                                        <UserCard name={user.name} department={user.department} key={user.id} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AllUsers;