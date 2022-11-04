import {Link, Typography} from "@mui/material";

export default function HomePage() {
    return (
        <>
        <Typography variant="h1">Home</Typography>
            <Link to="user">Go to user</Link>
        </>
    )
}