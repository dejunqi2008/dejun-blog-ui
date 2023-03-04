import React from "react";
import { Typography, Box} from "@mui/material";
import { Avatar, Grid } from "../../node_modules/@mui/material/index";
import { SocialIcon } from "react-social-icons";
import './homepage.css';

export const UserIntro = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <section className="profile">
                        <Avatar alt="Dejun Qi" src="https://previews.dropbox.com/p/thumb/AB3INiSiq1RG1P4fCF4KOSHgekKLaFSjjYZqgA8jVlvouXJMJk8raBgXixN8sbWg1F5PZFqXv42S6gdysiXVIGsRXU4ERW9jH2j17sf_1XBSbnxE4mFyh2qAKvk-Fd5VY4HFfwgcQPDoNDv1tNR8t5rfpFD6jQm5AOlQ2CgRIVusCJQ5245dMZqANidynJo1LgffIwDNCJGP45Sz0JvJ4A59faPQVagV2iicBSfEFztKanI388OnlUiTAHWL73BWnvWLBhVfd4bvccthPs8ex5t3vHEvBo2yTCuXOV9yipoYQDBmqQNeDsHlnoyFgDl8jETx8_4O27IL2wWFuo3EqqvVouu1MDXniusSfTVBnLUqvEXxoRl0DnFB0BLcQxZIaJk/p.jpeg" sx={{ width: 150, height: 150 }} />
                    </section>

                    <Grid container spacing={2} wrap="wrap">
                        <Grid item xs={4}>
                            <SocialIcon url="https://www.linkedin.com/in/dejun-qi-132a2865/" />
                        </Grid>
                        <Grid item xs={4}>
                            <SocialIcon url="https://github.com/dejunqi2008" />
                        </Grid>
                        <Grid item xs={4}>
                            <SocialIcon url="mailto:dejunqi2008@gmail.com" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Typography paragraph={true} variant="body1" gutterBottom={true}>
                    My name is <i><b>Dejun Qi</b></i> and I am a fullstack software engineer, My primary responsibility is to design, develop, and maintain software applications. I use my expertise in programming languages, software development methodologies, and problem-solving skills to create efficient and effective software solutions. 
                    </Typography>
                    <Typography paragraph={true} variant="body1" gutterBottom={true}>
                    I work closely with PM and designer to understand their needs and requirements and translate them into functional software. I collaborate with other software engineers, project managers, and quality assurance professionals to ensure that the software meets the necessary standards for functionality, reliability, and security.
                    </Typography>
                    <Typography variant="body1" gutterBottom={true} paragraph={true}>
                    As a software engineer, I am also responsible for staying up-to-date with the latest trends and technologies in the field. This involves continuous learning and professional development to keep my skills and knowledge relevant and up-to-date.
                    </Typography>
                    <Typography variant="body1" gutterBottom={true} paragraph={true}>
                    Ultimately, my goal as a software engineer is to use my expertise to create innovative and practical software solutions that improve the lives of people and businesses around the world.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}