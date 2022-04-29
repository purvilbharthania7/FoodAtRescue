import React, { useEffect, useState, useContext } from "react";
import NavigationBar from "../NavigationBar/Navbar";
import { Container, Box, CssBaseline, Grid } from "@mui/material";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import axios_api from "../../common/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AppContext } from "../../context/userContext";
import { ROUTES } from "../../common/constants";

const ViewReservedFood = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState(null);
    const {
        state: { userId, authenticated },
    } = useContext(AppContext);

    useEffect(async () => {
        if (!authenticated) {
            toast.error("You need to Login first!!!");
            navigate(ROUTES.LOGIN);
        } else {
            await axios_api
                .get(`/food/getMyFood/${userId}`)
                .then((response) => {
                    if (response.data.success) {
                        setFoods(response.data.data.Items);
                    }
                })
                .catch((err) => {
                    setFoods([]);
                });
        }
    }, []);

    return (
        <>
            <NavigationBar />
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {foods
                                ? foods.length > 0
                                    ? foods.map((food) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={food.imageURL}
                                                    alt="property image"
                                                />
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                        textOverflow="ellipsis"
                                                        overflow="hidden"
                                                        whiteSpace="nowrap"
                                                    >
                                                        {food.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        textOverflow="ellipsis"
                                                        overflow="hidden"
                                                        whiteSpace="nowrap"
                                                    >
                                                        {food.pickUpLocation}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        marginTop="5px"
                                                        textOverflow="ellipsis"
                                                        overflow="hidden"
                                                        whiteSpace="nowrap"
                                                    >
                                                        Status: {food.bookingStatus}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                    : "No results Found"
                                : " Fetching food Details"}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default ViewReservedFood;
