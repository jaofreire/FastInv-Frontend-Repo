import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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
            <Card className="w-full max-w-sm cursor-pointer">
                <CardContent className="flex items-center space-x-4 p-4">
                    <Avatar>
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs text-muted-foreground">{department}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default UserCard;