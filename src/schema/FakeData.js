import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row, Table } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import "./App.css";


function App() {
    const [show, setShow] = useState(false);
    const [inputVaule, setInputValue] = useState({
        id: '',
        name: "",
        age: "",
        date_of_birth: "",
        gender: "",
        mobile: "",
        email: "",
        address: "",
        state: "",
        statesName: "",
        city: "",
        citiesName: "",
        pincode: "",
        occupation: "",
        marital_status: "",
        photo: "",
    });
    const [showInput, setShowInput] = useState([]);
    const [selectState, setSelectState] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);
    const [inputErrors, setInputErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isEdit, setIsEdit] = useState(false);//for updating
    const [photo, setPhoto] = useState()
    const [editForm, setEditForm] = useState()
    let {
        id,
        name,
        age,
        date_of_birth,
        gender,
        email,
        address,
        state,
        statesName,
        city,
        citiesName,
        occupation,
        marital_status,
        mobile,
        pincode,
    } = showInput;


    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setShow(true)
        // let {
        //   id,
        //   name,
        //   age,
        //   date_of_birth,
        //   gender,
        //   email,
        //   address,
        //   state,
        //   statesName,
        //   city,
        //   citiesName,
        //   occupation,
        //   marital_status,
        //   mobile,
        //   pincode,
        // } = showInput[index];
        console.log(showInput[index]) //particular row should be updated
        setInputValue({
            id,
            name,
            age,
            date_of_birth,
            gender,
            email,
            address,
            state,
            statesName,
            city,
            citiesName,
            occupation,
            marital_status,
            mobile,
            pincode,
        });
        //  console.log(input)//console same output (showInput[index])
        setIsEdit(true);
        setEditForm(index);
    };

    const states = [
        {
            id: 1,
            stateName: "Andhra Pradesh",
        },
        {
            id: 2,
            stateName: "Telangana",
        },
    ];

    const cities = [
        {
            id: 1,
            state_id: 1,
            cityName: "Vizag",
        },
        {
            id: 2,
            state_id: 1,
            cityName: "Vijayawada",
        },
        {
            id: 3,
            state_id: 1,
            cityName: "Guntur",
        },
        {
            id: 4,
            state_id: 1,
            cityName: "Eluru",
        },
        {
            id: 5,
            state_id: 1,
            cityName: "Tirupati",
        },
        {
            id: 1,
            state_id: 2,
            cityName: "Warangal",
        },
        {
            id: 2,
            state_id: 2,
            cityName: "Hyderabad",
        },
        {
            id: 3,
            state_id: 2,
            cityName: "Nizamabad",
        },
        {
            id: 4,
            state_id: 2,
            cityName: "Khammam",
        },
        {
            id: 5,
            state_id: 2,
            cityName: "Miryalaguda",
        },
    ];



    function getList() {
        axios
            .get("http://13.127.32.89:5002/api/users")
            .then((response) => setShowInput(response.data));
    }
    useEffect(() => {
        getList()
    }, []);




    useEffect(() => {
        let scities = [];
        if (selectState) {
            scities = cities.filter((city) => city.state_id == selectState);
        } else {
            scities = [];
        }
        setSelectedCities(scities);
    }, [selectState]);
    // console.log(selectedCities)

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputValue({ ...inputVaule, [id]: value });
    };
    //console.log(inputVaule)

    const handleImage = (event) => {
        setPhoto(event.target.value);
        var fuData = document.getElementById('fileChooser');
        var fileUploadPath = fuData.value;
        var extension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (extension === "png" || extension === "jpeg" || extension === "jpg") {
            setInputErrors("photo added successfully ");
        } else if (extension === "pdf") {
            setInputErrors("PDF files are not allowed.");
        } else {
            setInputErrors("Please select a valid photo");
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setInputErrors(validate(inputVaule)); //pushing error msg  into setInputErrors
        setIsSubmit(true);

        let isValid = Object.values(inputErrors).some((error) => error === "");
        // console.log(Object.values)
        if (isValid) {
            setShowInput([...showInput, { ...inputVaule }]);
            setInputValue({
                id: '',
                name: "",
                age: "",
                date_of_birth: "",
                gender: "",
                mobile: "",
                email: "",
                address: "",
                state: "",
                statesName: "",
                city: "",
                citiesName: "",
                pincode: "",
                occupation: "",
                marital_status: "",
                photo: "",
            });
            setInputErrors({
                id: '',
                name: "",
                age: "",
                date_of_birth: "",
                gender: "",
                mobile: "",
                email: "",
                address: "",
                state: "",
                statesName: "",
                city: "",
                citiesName: "",
                pincode: "",
                occupation: "",
                marital_status: "",
                photo: "",
            });
        }

        axios.post('http://13.127.32.89:5002/api/users/create', {
            name: inputVaule.name,
            age: inputVaule.age,
            dob: inputVaule.dob,
            gender: inputVaule.gender,
            mobile: inputVaule.mobile,
            email: inputVaule.email,
            address: inputVaule.address,
            city: inputVaule.city,
            state: inputVaule.state,
            pincode: inputVaule.pincode,
            occupation: inputVaule.occupation,
            marital_status: inputVaule.marital_status,
            photo: inputVaule.photo
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
        console.log(JSON.stringify(inputVaule));

    };

    useEffect(() => {
        console.log(inputErrors); //to see the error (console the errors)
        if (Object.keys(inputErrors).length === 0 && isSubmit) {
            console.log(inputVaule);
        }
    }, [inputErrors]);

    //validating input errors
    const validate = (values) => {
        const errors = {
            name: "",
            age: "",
            date_of_birth: "",
            gender: "",
            mobile: "",
            email: "",
            address: "",
            state: "",
            statesName: "",
            city: "",
            citiesName: "",
            pincode: "",
            occupation: "",
            marital_status: "",
            photo: "",
        };
        const regex = /^[^s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const num = /^[0-9]+$/;

        if (!values.name) {
            errors.name = "* name is required";
        } else {
            errors.name = "";
        }
        if (!values.date_of_birth) {
            errors.date_of_birth = "*select date";
        }

        if (!values.age) {
            errors.age = "* age is required";
        } else if (!values.age.match(num)) {
            errors.age = "* invalid";
        }

        if (!values.email) {
            errors.email = "* email is required";
        } else if (regex.test(values.email)) {
            errors.email = "This is not valid email format";
        }
        if (!values.address) {
            errors.address = "* address is required";
        }

        if (!values.state) {
            errors.state = "* enter state id";
        }

        if (!values.statesName) {
            errors.statesName = "* select option ";
        }

        // if (values.file.trim()==='') {
        //   errors.file = "*choose file";
        // }else if(ext==="pdf" || ext==="docx" || ext==="doc"){
        //     errors.file ='Please select valid file'
        // }

        if (!values.pincode) {
            errors.pincode = "* pincode is required";
        } else if (!values.pincode.match(num)) {
            errors.pincode = "Invalid pincode";
        }

        if (!values.occupation) {
            errors.occupation = "* occupation is required";
        }
        if (!values.marital_status) {
            errors.marital_status = "* select option";
        }
        if (!values.gender) {
            errors.gender = "* select option";
        }
        if (!values.city) {
            errors.city = "* enter city id ";
        }
        if (!values.citiesName) {
            errors.citiesName = "* select option";
        }
        if (!values.mobile) {
            errors.mobile = "* Mobile number is required";
        } else if (values.mobile.length <= 9 || values.mobile.length > 10) {
            errors.mobile = "invalid number";
        }
        // console.log(errors)
        return errors;
    };


    //Deleting data

    function deleteData(id) {
        axios.delete(`http://13.127.32.89:5002/api/users/delete/${id}`)
            .then(res => console.log('Deleted!!', res)).catch(err => console.log(err))
        getList()
    }

    const updateUser = (e) => {
        e.preventDefault()
        // setIsEdit(false)
        let total_arr = [...showInput];
        const {
            id,
            name,
            age,
            date_of_birth,
            gender,
            email,
            address,
            state,
            stateName,
            city,
            citiesName,
            occupation,
            marital_status,
            mobile,
            pincode,
        } = inputVaule;
        total_arr.splice(editForm, 1, {
            id,
            name,
            age,
            date_of_birth,
            gender,
            email,
            address,
            state,
            stateName,
            city,
            citiesName,
            occupation,
            marital_status,
            mobile,
            pincode,
            photo
        });
        console.log(total_arr)
        // setShowInput(a)
        setShowInput(total_arr);
        // console.log(a)
        // setEditForm(a)
        // setEditForm(total_arr)
        setIsEdit(false);
        if (isEdit) {
            setInputValue({
                id: '',
                name: "",
                age: "",
                date_of_birth: "",
                gender: "",
                email: "",
                address: "",
                state: "",
                statesName: '',
                city: "",
                citiesName: '',
                occupation: "",
                marital_status: "",
                file: "",
                mobile: "",
                pincode: "",
            });
        }

    }

    return (
        <>
            <div className="bg-container mt-6">
                <button className="btn btn-primary" onClick={handleShow}>
                    {/* Add User */}
                    {!isEdit ? 'Add user' : 'Update User'}
                </button>
                <Modal show={show} onHide={handleClose} className="modal-container" >
                    <Form className="p-4" onSubmit={!isEdit ? handleSubmit : updateUser}>
                        <h1 className="heading">Registration Form</h1>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="5">
                                <Form.Label className="label">Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="id"
                                    placeholder="Enter id"
                                    value={inputVaule.id || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.id}</p>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="name"
                                    placeholder="Enter name"
                                    value={inputVaule.name || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.name}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Age</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="age"
                                    placeholder="Enter age"
                                    value={inputVaule.age || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.age}</p>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">DOB</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="date_of_birth"
                                    value={inputVaule.date_of_birth || ""}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split("T")[0]}
                                />
                                <p className="text-danger">{inputErrors.date_of_birth}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Gender</Form.Label>
                                <Form.Select
                                    className="select-option"
                                    onChange={handleChange}
                                    id="gender"
                                    value={inputVaule.gender}
                                >
                                    <option value="">--Select Option--</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </Form.Select>
                                <p className="text-danger">{inputErrors.gender}</p>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="mobile"
                                    placeholder="Enter mobile number"
                                    value={inputVaule.mobile || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.mobile}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    placeholder="Enter email"
                                    value={inputVaule.email || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.email}</p>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="address"
                                    placeholder="Enter address"
                                    value={inputVaule.address || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.address}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">State id</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="state"
                                    onChange={handleChange}
                                    placeholder="Enter id"
                                // value={inputVaule.}
                                />
                                {/* <p className="text-danger">{inputErrors.occupation}</p>  */}
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">StateName</Form.Label>
                                <br />
                                <Form.Select
                                    className="select-option"
                                    id="StatesName"
                                    onChange={(e) => {
                                        setSelectState(e.target.value);
                                        handleChange(e);
                                    }}
                                    value={inputVaule.statesName}
                                // value={inputVaule.state}
                                >
                                    <option value={""}>select state</option>
                                    {states.map((state) => {
                                        return <option value={state.id}>{state.stateName}</option>;
                                    })}
                                </Form.Select>
                                <p className="text-danger">{inputErrors.state}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">City Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="city"
                                    onChange={handleChange}
                                    value={inputVaule.city}
                                />
                                {/* <p className="text-danger">{inputErrors.occupation}</p>  */}
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">CityName</Form.Label>
                                <br />
                                <Form.Select
                                    className="select-option"
                                    id="citiesName"
                                    value={inputVaule.citiesName || ""}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                                    <option value={""}>select city</option>
                                    {selectedCities.map((city) => {
                                        return <option value={city.id}>{city.cityName}</option>;
                                    })}
                                </Form.Select>
                                <p className="text-danger">{inputErrors.city}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="pincode"
                                    placeholder="Enter pincode"
                                    value={inputVaule.pincode || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-danger">{inputErrors.pincode}</p>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Occupation</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="occupation"
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    value={inputVaule.occupation}
                                />
                                <p className="text-danger">{inputErrors.occupation}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Marital Status</Form.Label>
                                <br />
                                <Form.Select
                                    className="select-option"
                                    id="marital_status"
                                    onChange={handleChange}
                                    value={inputVaule.marital_status}
                                >
                                    <option value={""}>select option</option>
                                    <option id="single">single</option>
                                    <option id="married">married</option>
                                </Form.Select>
                                <p className="text-danger">{inputErrors.marital_status}</p>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label className="label">Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    id="fileChooser"
                                    value={inputVaule.photo}
                                    onChange={handleImage}
                                // onClick={(e) => setInputValue(e.target.value)}
                                />
                                {inputErrors.photo}
                            </Form.Group>
                        </Row>
                        <div className="add-btn mt-3">
                            <Button variant="primary" type="submit">
                                {!isEdit ? 'Add User' : 'Update User'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
            <div className="table-container">
                <Table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Mobile </th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>State id</th>
                            <th>State</th>
                            <th>City id</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>Ocuupation</th>
                            <th>Marital Status</th>
                            <th>photo</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showInput.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.date_of_birth}</td>
                                <td>{item.gender}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.state}</td>
                                {/* <td>{item.statesName}</td> */}
                                {item.stateName ? (
                                    states
                                        .filter((eachState) => eachState.id == item.stateName)
                                        .map((state) => <td>{state.stateName}</td>)
                                ) : (
                                    <td></td>
                                )}
                                <td>{item.city}</td>
                                {/* <td>{item.citiesName}</td> */}
                                {item.citiesName ? (
                                    cities
                                        .filter((eachCity) => eachCity.state_id == item.stateName)
                                        .filter((eCity) => eCity.id == item.city)
                                        .map((eC) => <td>{eC.cityName}</td>)
                                ) : (
                                    <td></td>
                                )}
                                <td>{item.pincode}</td>
                                <td>{item.occupation}</td>
                                <td>{item.marital_status}</td>
                                <td>{item.photo}</td>
                                <td>
                                    <span>
                                        <BsFillPencilFill onClick={() => handleShow(index)} />
                                    </span>
                                    {/* <span><BsFillPencilFill onClick={() => updateData(index)} /></span> */}
                                </td>
                                <td>
                                    <span className="action">
                                        <BsFillTrashFill className="delete-btn" onClick={() => deleteData(item.id)} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default App;