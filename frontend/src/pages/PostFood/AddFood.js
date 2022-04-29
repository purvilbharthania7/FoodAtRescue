import React from "react";
import NavigationBar from "../NavigationBar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Select } from "@mui/material";
import { TextField, Box, Paper, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "antd";
import { ROUTES } from "../../common/constants";
import axios_api from "../../common/axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/userContext";
import Food from "../../assets/images/postFood.jpeg";
import { Row, Column } from "../PostFood/PostFood.style";

const { Title } = Typography;

const AddFood = () => {
    const values = {
        name: "",
        type: "",
        servings: "",
        imageURL: "",
        pickUpLocation: "",
        ownerId: "",
        customerId: "",
        foodStatus: "Available",
        bookingStatus: "Confirmation Pending",
    };

    const [formErrors, setFormErrors] = useState(values);
    const [formValues, setFormValues] = useState(values);
    const [isSubmit, setIsSubmit] = useState(false);
    const [fileData, setFileData] = useState();

    const navigate = useNavigate();

    const {
        state: { userId, authenticated },
    } = useContext(AppContext);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleUpload = (e) => {
        setFileData(e.target.files[0]);
    };
    const handleClick = (e) => {
        if (!authenticated) {
            toast.error("You need to login first!!!");
            navigate(ROUTES.LOGIN);
        } else {
            e.preventDefault();
            setFormErrors(validate(formValues));
            setFormValues(formValues);
            setIsSubmit(true);
            const newFormValues = { ...formValues, ownerId: userId };
            const data = new FormData();
            data.append("image", fileData);
            if (fileData) {
                axios_api
                    .post("/food/uploadImage", data)
                    .then((response) => {
                        const path = response.data;
                        const post = { ...newFormValues, imageURL: path };
                        setFormValues(post);

                        axios_api
                            .post("/food/addFood", post)
                            .then((res) => res.json())
                            .then((result) => setFormValues(result.rows))
                            .catch((formErrors) => console.log("error"));

                        toast.success("Post Added successfully");
                        navigate(ROUTES.HOMEPAGE);
                    })
                    .catch((err) => {
                        console.log(err?.response?.data?.message);
                    });
            } else {
                axios_api
                    .post("/food/addFood", newFormValues)
                    .then((res) => res.json())
                    .then((result) => setFormValues(result.rows))
                    .catch((formErrors) => console.log("error"));

                navigate(ROUTES.HOMEPAGE);
            }
        }
    };

    const REGEX = {
        NAME: /^[a-zA-Z ,.'-]+$/,
        SERVINGS: /^([0-9])+$/,
    };

    const validate = (value) => {
        const errors = {};
        if (!value.name) {
            errors.name = "Food Name is Required!";
        } else if (!REGEX.NAME.test(value.name)) {
            errors.name = "Enter valid Food Name";
        }
        if (!value.servings) {
            errors.servings = "Servings is Required!";
        } else if (!REGEX.SERVINGS.test(value.servings)) {
            errors.servings = "Enter valid Servings";
        }
        if (!value.type) {
            errors.type = "Food Type is Required!";
        }
        if (!value.pickUpLocation) {
            errors.pickUpLocation = "Food Pick Up Location is Required!";
        }
        return errors;
    };

    return (
        <div>
            <NavigationBar />
            <img src={Food} width="100%" height="350px" />
            <Box
                textAlign="center"
                sx={{
                    marginTop: "20px",
                }}
            >
                <Title level={1} className="title">
                    Add Food Details
                </Title>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    width: "60%",
                    marginTop: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Box
                    textAlign="center"
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70%",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "20px",
                        marginBottom: "50px",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            fullWidth
                            required
                            name="name"
                            id="outlined-required"
                            label="Food Name"
                            placeholder="Enter Food Name"
                            margin="normal"
                            value={formValues.name}
                            onChange={handleChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name ? formErrors.name : ""}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                                Food Type
                            </InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="type"
                                label="Food Type"
                                placeholder="Food Type"
                                margin="normal"
                                value={formValues.type}
                                onChange={handleChange}
                                error={!!formErrors.type}
                                helperText={formErrors.type ? formErrors.type : ""}
                            >
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem> */}
                                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                                <MenuItem value="Vegan">Vegan</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="servings"
                            label="Servings"
                            placeholder="Enter Servings"
                            margin="normal"
                            value={formValues.servings}
                            onChange={handleChange}
                            error={!!formErrors.servings}
                            helperText={formErrors.servings ? formErrors.servings : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="pickUpLocation"
                            label="Food Pick-Up Location"
                            placeholder="Enter Pick Up Location"
                            margin="normal"
                            value={formValues.pickUpLocation}
                            onChange={handleChange}
                            error={!!formErrors.pickUpLocation}
                            helperText={
                                formErrors.pickUpLocation ? formErrors.pickUpLocation : ""
                            }
                        />
                        {/* <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                            <Typography component="body1" variant="subtitle1">
                                Select Image:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9} sx={{ marginTop: 1 }}>
                            <div><input type="file" name="image" onChange={handleUpload} /></div>
                        </Grid> */}
                        <Box
                            textAlign="left"
                            sx={{
                                marginTop: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            <Row>
                                <Column>
                                    <Typography component="body1" variant="subtitle1">
                                        Select Image:
                                    </Typography>
                                </Column>
                                <Column>
                                    <div>
                                        <input type="file" name="image" onChange={handleUpload} />
                                    </div>
                                </Column>
                            </Row>
                        </Box>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                        >
                            Post Food
                        </Button>
                    </div>
                </Box>
            </Paper>
            <Footer />
        </div>
    );
};

export default AddFood;
