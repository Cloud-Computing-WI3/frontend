import {Box} from "@mui/material";
import CircularProgress, {
    circularProgressClasses
} from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";

export default function LoadingScreen(props) {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0, 0.2)"
        }}>
            <Box sx={{ position: "relative"}}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={100}
                    thickness={4}
                    {...props}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={100}
                    thickness={4}
                    {...props}
                />
                {props.message && <Typography sx={{textAlign: "center"}}>{props.message}</Typography>}
            </Box>
        </Box>
    )
}