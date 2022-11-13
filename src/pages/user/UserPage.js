import {TextField, Typography} from "@mui/material";
import {useProfile} from "../../utils/providers/ProfileProvider";

export default function UserPage() {
    const {user} = useProfile();
    return (
        <>
        <Typography variant="h1">User</Typography>
            <TextField value={user.first_name} label="First name" />
            <TextField value={user.last_name} label="Last name" />
        </>
    )
}