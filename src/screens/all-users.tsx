import UserCard from "@/components/all-users/user-card";
import SideBar from "@/components/Global/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const users = [
    { id: 1, name: "Jane Doe", role: "Senior Software Engineer", avatarUrl: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "John Smith", role: "Product Manager", avatarUrl: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Alice Johnson", role: "UX Designer", avatarUrl: "/placeholder.svg?height=40&width=40" },
]

function AllUsers() {
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
                                            <CardTitle className="pt-5 pl-10 text-3xl font-bold">Suas <span className="text-orange-400">Tabelas</span>:</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                            </div>
                            <CardContent className="flex flex-col items-center gap-5 w-full h-full justify-start">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {users.map((user) => (
                                        <UserCard avatar={user.avatarUrl} name={user.name} department={user.role} key={user.id} />
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