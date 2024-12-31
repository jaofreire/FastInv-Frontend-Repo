import { Avatar, AvatarFallback } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"

function UserCard({
    name,
    department,
}: {
    name: string;
    department: string;
}) {
    return (
        <>
            <Card className="w-full max-w-sm cursor-pointer" >
                <CardContent className="flex items-center space-x-4 p-4 bg-orange-500 rounded-lg">
                    <Avatar>
                        <AvatarFallback className="bg-black text-white">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs">{department}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default UserCard;