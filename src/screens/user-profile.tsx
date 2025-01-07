import { AuthContext } from "@/contexts/auth/auth-provider";
import { useContext, useEffect, useState } from "react";
import SideBar from "@/components/Global/sidebar";
import UserProfileCard from "@/components/Global/user-profile-card";
import { useParams } from "react-router-dom";
import { deleteExistingUser, getUserById } from "@/services/user-service";
import LoadingCircle from "@/components/loading/loading-circle";
import ErrorDialog from "@/components/Global/errors/error-dialog";

function UserProfile() {

    const { id } = useParams();
    const authContext = useContext(AuthContext);

    const [userName, setUserName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (id && isLoading === true) {
            loadUser(id);
            console.log(userName);
            setIsLoading(false);
        }

        {/* Não era pra ter essa lógica, pois não era para o componente renderizar 2 vezes seguidas, só fez o codigo ficar mais complexo */ }
        if (isLoading === true) {
            setUserDataFromAuthContext();
            console.log('',userName);
            setIsLoading(false);
        }
    })

    async function loadUser(id: string) {
        const userResponse = await getUserById(id);

        if (userResponse.isSuccess === false) {
            setError(userResponse.message);
        }

        setUserName(userResponse.response.name);
        setDepartment(userResponse.response.department);
        setEmail(userResponse.response.email);
        setPhoneNumber(userResponse.response.phoneNumber);
        setRole(userResponse.response.role);
        setCreatedAt(userResponse.response.createdAt);
    }

    function setUserDataFromAuthContext() {
        setUserName(authContext.UserName);
        setDepartment(authContext.Department);
        setEmail(authContext.Email);
        setPhoneNumber(authContext.PhoneNumber);
        setRole(authContext.Role);
        setCreatedAt(authContext.CreatedAt);
    }

    async function deleteUser() {
        if (id) {
            const response = await deleteExistingUser(id);

            if (response.isSuccess === false) {
                setError(response.message);
                return;
            }

            window.history.back();
        }

    }

    if (isLoading) {
        return <LoadingCircle />
    }

    if (error) {
        return <ErrorDialog errorDescription={error} />
    }

    return (
        <>
            <SideBar />
            <UserProfileCard
                Id={id ? id : authContext.Id}
                UserName={userName}
                Role={role}
                Department={department}
                Email={email}
                PhoneNumber={phoneNumber}
                CreatedAt={createdAt}

                displayDeleteUserButton={id ? true : false}

                onClickConfirmDeleteUserButton={() => deleteUser()}
            />
        </>
    );
}

export default UserProfile;