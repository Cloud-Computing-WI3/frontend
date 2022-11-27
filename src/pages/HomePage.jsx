import { Link, Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";

// static test data
const dummyData = [
    {
        headline: "A Destabilizing Hack-and-Leak Operation Hits Moldova",
        extract: "Plus: Google's location snooping ends in a $391 million settlement, Russian code sneaks into US government apps, and the World Cup apps set off alarms.",
        imgSrc: "https://media.wired.com/photos/637823b284f5d2572f8d0ad0/191:100/w_1280,c_limit/Moldova-Election-Hack-Security-1401716620.jpg",
        alt: "",
        primaryLinkTxt: "Read Article",
        secondaryLinkTxt: "",
        primaryLink: "#",
        secondaryLink: "#"
    },
    {
        headline: "Samsung Galaxy Watch 5 Pro vs. Apple Watch Ultra: Which flagship watch is best?",
        extract: "The Apple Watch Ultra is far more of a \"pro\" device for athletes and outdoorsmen than the Galaxy Watch 5 Pro, but it's extreme price makes it harder to recommend.",
        imgSrc: "https://cdn.mos.cms.futurecdn.net/9QSzDsikrSZhbkh6KrFgbg-1200-80.jpg",
        alt: "",
        primaryLinkTxt: "Read Article",
        secondaryLinkTxt: "",
        primaryLink: "#",
        secondaryLink: "#",
    },
    {
        headline: "I too quit Twitter this week – and have never been more relieved | Bidisha Mamata",
        extract: "Elon Musk’s latest acquisition once turned an innocuous trip to the cinema into something more disturbingLast month, Elon Musk walked into Twitter and then all the good people left. I quit, too. It was a time-sink, a brain drain and an eye strain.In 12 years,…",
        imgSrc: "https://i.guim.co.uk/img/media/ffcc872456ef4fa4ee569e9123ed41a4ec3895d5/0_155_4000_2399/master/4000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tb3BpbmlvbnMucG5n&enable=upscale&s=103004481b213ec9f9342ed5386464a5",
        alt: "",
        primaryLinkTxt: "Read Article",
        secondaryLinkTxt: "",
        primaryLink: "#",
        secondaryLink: "#"
    }
]

export default function HomePage() {
    return (
        <>
            <Link to="user">Go to user</Link>
            <Typography variant="h1" sx={{ m: 2 }}>Top Articles</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    dummyData.map(data =>
                        <Grid item xs={12} sm={6} md={3} key={data.headline}>
                            <MediaCard key={data.id} {...data}></MediaCard>
                        </Grid>)
                }
            </Grid>
        </>
    )
}