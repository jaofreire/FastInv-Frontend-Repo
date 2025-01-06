import AddUserDialogForm from "@/components/all-users/add-user-dialog-form";
import UserCard from "@/components/all-users/user-card";
import ErrorDialog from "@/components/Global/errors/error-dialog";
import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/auth-provider";
import { getUsersByCompanyId } from "@/services/user-service";
import { UserType } from "@/types/api-response-types/user/user-type";
import { FilterX } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AllUsers() {
    const [users, setUsers] = useState<UserType[]>([]);

    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

    const [isFilterMode, setIsFilter] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const { CompanyId } = useContext(AuthContext);

    useEffect(() => {
        const loadUsers = async () => {
            const usersResponse = await getUsersByCompanyId(CompanyId);

            if (usersResponse.isSuccess === false) {
                setError(usersResponse.message);
            }

            if (usersResponse.responseList) {
                setUsers(usersResponse.responseList);
            }
        }

        loadUsers();
    }, []);

    function handleFilterByName(name: string) {
        const filterApplied = users.filter(x => x.name.includes(name));
        setFilteredUsers(filterApplied);

        setIsFilter(true);
    }

    function removeFilters() {
        setFilteredUsers([]);
        setIsFilter(false);
    }

    if (error) {
        return <ErrorDialog errorDescription={error} />
    }

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
                                        <div className="w-full pt-5 pl-10">
                                            <CardTitle className=" text-3xl font-bold">Funci<span className="text-orange-400">onários</span>:</CardTitle>
                                            {isFilterMode && <Button className="w-40 h-5 bg-red-500 opacity-90 text-white font-medium rounded-sm hover:opacity-100 hover:bg-red-600" onClick={removeFilters}><FilterX />Remover filtros</Button>}
                                        </div>
                                        <div className="flex flex-col gap-3 justify-end h-24 w-52 pr-5">
                                            <AddUserDialogForm />
                                        </div>
                                    </div>
                                </CardHeader>
                            </div>
                            <CardContent className="flex flex-col items-center gap-5 w-full h-full justify-start">
                                <Input
                                    className="w-[30%] border-collapse border-black shadow-black"
                                    type="text"
                                    placeholder="Pesquisar funcionários"
                                    onChange={(e) => handleFilterByName(e.target.value)}
                                />
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {(isFilterMode ? filteredUsers : users).map((user) => (
                                        <>
                                            <Link to={'/user-profile/' + user.id}>
                                                <UserCard name={user.name} department={user.department} key={user.id} />
                                            </Link>
                                        </>
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