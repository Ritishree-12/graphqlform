import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'


const GET_USERS = gql`
  query  userData{
    userData {
        id
    name
    age
    date_of_birth
    mobile
    gender
    email
    statesName
    state
    pincode
    address
    marital_status
    photo
    city
    citiesName
    occupation
    }
  }
`;

const CREATE_USER = gql`
mutation CreateUser($input:newUser!){
createUser(input:$input){
    name
    age
    date_of_birth
    mobile
    gender
    email
    statesName
    state
    pincode
    address
    marital_status
    photo
    city
    citiesName
    occupation
}
}
`
// deleteUser(id: ID!): employeeData!
const DELETE_USER = gql`
mutation deleteUser($id:ID!){
    deleteUser(id:$id){
    id
 
}
}
`
const updateUserData = gql`
  mutation updateUser($input: updateUser!) {
    updateUser(input: $input) {    
       id
       name
       age
       date_of_birth
       gender
       mobile
       email
       address   
       state
       city
       pincode
       occupation
       marital_status
       photo
   }  
 }  
`

const getAllStates = gql`
query getAllStates {
    states{
      id 
      statesName
    }
  }
`;


const getAllCities = gql`
query getAllCities {
    cities {
        id
      state_id
      citiesName
    }
  }
`

const Form = () => {

    const [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        date_of_birth: "",
        email: "",
        mobile: "",
        gender: "",
        address: "",
        pincode: "",
        marital_status: "",
        occupation: "",
        state: "",
        city: "",
        photo: "",
    });
    const [currentDate] = useState(new Date().toISOString().split("T")[0]);
    const [userData, setuserData] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)
    const [city, setCity] = useState()


    const [formError, setFormError] = useState({
        name: "",
        age: "",
        date_of_birth: "",
        email: "",
        mobile: "",
        gender: "",
        address: "",
        pincode: "",
        marital_status: "",
        occupation: "",
        state: "",
        city: "",
        photo: "",
    })

    // intigrate with quries and mutation
    const { data, loading, error } = useQuery(GET_USERS);
    const [createUser] = useMutation(CREATE_USER)
    const [deleteUser] = useMutation(DELETE_USER)

    const { data: getState } = useQuery(getAllStates);
    const { data: getCities } = useQuery(getAllCities);
    const [updateUser] = useMutation(updateUserData)



    useEffect(() => {
        if (data && data.userData) {
            setuserData(data.userData || []);
        }
    }, [data]);

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })

        const newErrors = { ...formError };

        switch (name) {
            case 'name':
                newErrors.name = value.trim() === '' ? 'Full name is required' : !/^[A-Za-z]{2,}$/.test(value) ? 'Full name is invalid' : '';
                break;
            case 'mobile':
                newErrors.mobile = value.trim() === '' ? 'Mobile number is required' : !/^[4-9]\d{9}$/.test(value) ? 'Mobile number is invalid' : '';
                break;
            case 'email':
                newErrors.email = value.trim() === '' ? 'Email is required' : !/^[a-zA-Z0-9.!$#%^&*_+-{}:"'?/><~`]+@[a-zA-Z.-_]+\.[a-zA-Z]{2,}$/.test(value) ? 'Email is invalid' : '';
                break;
            case 'age':
                newErrors.age = value.trim() === '' ? 'age is required' : '';
                break;
            case 'date_of_birth':
                newErrors.date_of_birth = value.trim() === '' ? 'dob is required' : '';
                break;
            case 'gender':
                newErrors.gender = value.trim() === '' ? 'gender is required' : '';
                break;
            case 'address':
                newErrors.address = value.trim() === '' ? 'address is required' : '';
                break;
            case 'pincode':
                newErrors.pincode = value.trim() === '' ? 'pincode is required' : '';
                break;
            case 'state':
                newErrors.state = value.trim() === '' ? 'state is required' : '';
                break;
            // case 'city':
            //     newErrors.city = value.trim() === '' ? 'city is required' : '';
            //     break;
            case 'marital_status':
                newErrors.marital_status = value.trim() === '' ? 'marital status is required' : '';
                break;
            case 'occupation':
                newErrors.occupation = value.trim() === '' ? 'occupation is required' : '';
                break;
            case 'photo':
                newErrors.photo = value.trim() === '' ? 'photo is required' : '';
                break;
            default:
                break;
        }

        setFormError(newErrors);
    };



    // Validation
    const validations = () => {
        let errors = {};
        if (!inputValue.name) {
            errors.name = "Name is required"
        } else if (!/^[^\s].+[^\s]$/.test(inputValue.name)) {
            errors.name = "starting and the end should not have any white spaces at all"
        } else if (!/^[a-zA-Z ]*$/.test(inputValue.name)) {
            errors.name = "Invalid name"
        } else if (/^(.*\s.*){4,}$/.test(inputValue.name)) {
            errors.name = "string with not more then 1 space in between"
        }

        if (!inputValue.age) {
            errors.age = "Age is required"
        }
        if (!inputValue.date_of_birth) {
            errors.date_of_birth = "date_of_birth is required"
        }

        if (!inputValue.gender) {
            errors.gender = "Gender is required"
        } else if (!/^(?:m|M|male|Male|f|F|female|Female|others)$/.test(inputValue.gender)) {
            errors.gender = "gender is not matched"
        }

        if (!inputValue.mobile) {
            errors.mobile = "Mobile is required"
        } else if (!/^[6-9]\d{9}$/.test(inputValue.mobile)) {
            errors.mobile = "phone number must start with between 6 to 9 digits only"
        }


        if (!inputValue.email) {
            errors.email = "Email is required"
        } else if (!/^[^\s].+[^\s]$/.test(inputValue.email)) {
            errors.email = "starting and the end should not have any white spaces at all"
        } else if (!/^[a-zA-Z0-9+_.-]+@gmail\.com$/.test(inputValue.email)) {
            errors.email = "Invalid email"
        } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputValue.email)) {
            errors.email = "Enter proper email"
        }


        if (!inputValue.address) {
            errors.address = "Address is required"
        }
        // if (!inputValue.city) {
        //     errors.city = "City is required"
        // }

        if (!inputValue.pincode) {
            errors.pincode = "PinCode is required"
        } else if (!/^\d{6}$/.test(inputValue.pincode)) {
            errors.pincode = "pincode must be six digits"
        }

        if (!inputValue.occupation) {
            errors.occupation = "occupation is required"
        } else if (!/^[a-zA-Z ]*$/.test(inputValue.occupation)) {
            errors.occupation = "Enter correct details"
        }

        if (!inputValue.marital_status) {
            errors.marital_status = "Marital_Status is required"
        } else if (!/^(?:single|married)$/.test(inputValue.marital_status)) {
            errors.marital_status = "enter correct marital_status data"
        }

        if (!inputValue.photo) {
            errors.photo = "photo is required"
        }
        setFormError(errors)
        return Object.keys(errors).length === 0;
    }




    const submitHandler = (event) => {

        event.preventDefault();
        if (validations()) {
            let data = {
                name: inputValue.name,
                age: parseInt(inputValue.age),
                date_of_birth: inputValue.date_of_birth,
                email: inputValue.email,
                mobile: inputValue.mobile,
                gender: inputValue.gender,
                address: inputValue.address,
                pincode: parseInt(inputValue.pincode),
                marital_status: inputValue.marital_status,
                occupation: inputValue.occupation,
                state: parseInt(inputValue.state),
                statesName: inputValue.statesName,
                city: parseInt(inputValue.city),
                citiesName: inputValue.citiesName,
                photo: inputValue.photo
            }
            createUser({
                variables: {
                    input: data
                }
            });
            console.log('input ', inputValue)

            if (inputValue && !toggleSubmit) {
                setuserData((prevuserData) =>
                    prevuserData.map((currentValue) => {
                        if (currentValue.id === isEditItem) {
                            return { ...currentValue, ...inputValue };
                        }
                        return currentValue;
                    })
                );
                setToggleSubmit(true);
                setInputValue({
                    name: "",
                    age: "",
                    date_of_birth: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    address: "",
                    pincode: "",
                    marital_status: "",
                    occupation: "",
                    state: "",
                    city: "",
                    photo: "",
                });
                setIsEditItem(null);
            } else {
                const newuserData = { ...inputValue, id: new Date().getTime().toString() };
                setuserData([...userData, newuserData]);
                setInputValue({
                    name: "",
                    age: "",
                    date_of_birth: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    address: "",
                    pincode: "",
                    marital_status: "",
                    occupation: "",
                    state: "",
                    city: "",
                    photo: "",
                });
            }
        }
    };


    //Delete data
    const handleDelete = (id) => {
        deleteUser({ variables: { id: `${id}` } })
        alert('deleted')
    }



    // edit data
    //when user click on edit button
    //1.get the id and name of the data which user clicked to edit
    //2.set the toggle mode to change the submit button into edit button
    //3.Now update the value of the setInput with the new updated value to edit.
    //4.To pass the current element Id to new state variable for reference.
    const handleEdit = (id) => {
        let newEditData = userData.find((currentValue, index) => {
            return index === id
        });

        // updateUser({ variables: { input: inputValue } });
        // console.log('createuser')
        // get data
        console.log(newEditData, userData, "kjhhh");
        setToggleSubmit(false);
        setInputValue(newEditData)
        setIsEditItem(id);

    }

    const handleState = (event) => {
        let { name, value } = event.target;

        if (name === "state") {
            const selectedStateId = parseInt(value);

            setInputValue({ ...inputValue, state: selectedStateId, city: "" });

            // Perform additional logic related to city selection based on the state
            const selectedState = getState.states.find((state) => state.id === selectedStateId);
            console.log('selectedState', selectedState);

            if (selectedState && getCities && getCities.cities) {
                const getCitiesData = getCities.cities.filter((city) => city.state_id === selectedStateId);
                console.log('getCitiesData', getCitiesData);
                setCity(getCitiesData);
            }
        }
    };
    const handleCity = (event) => {
        const { name, value } = event.target;

        if (name === "city") {
            const selectedCityId = parseInt(value); // Parse the city value as an integer

            setInputValue({ ...inputValue, city: selectedCityId });
        }
    };

    // useEffect(() => {
    //     if (getUserData && getUserData.getUserId) {
    //         let { __typename, ...userValues } = getUserData.getUserId;
    //         console.log("getUserId", userValues)
    //         setInputValue(userValues)

    //     }
    // }, [getUserData]);


    if (loading) {
        return <h1>Data Loading...</h1>;
    };
    if (error) {
        console.log(error)
        return <div>Error: {error.message}</div>;
    }
    if (data) {
        console.log(data)
    }

    return (
        <>
            <nav className="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Registration Here</button>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form onSubmit={submitHandler}>
                                <div className="md-12">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={inputValue.name || ""}
                                        onChange={handleInput}
                                        name="name"

                                    />
                                    {formError.name && <span style={{ color: 'red' }}>{formError.name}</span>}
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label"> Age </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.age || parseInt("")}
                                            onChange={handleInput}
                                            name="age"
                                        />
                                        {formError.age && <span style={{ color: 'red' }}>{formError.age}</span>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">DOB</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={inputValue.date_of_birth || ""}
                                            onChange={handleInput}
                                            name="date_of_birth"
                                            max={currentDate}
                                        />
                                        {formError.date_of_birth && <span style={{ color: 'red' }}>{formError.date_of_birth}</span>}
                                    </div>
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Gender</label>
                                    <select className="form-control"
                                        value={inputValue.gender || "select Option"}
                                        onChange={handleInput}
                                        name="gender">
                                        <option value="select Option">Select an option</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {formError.gender && <span style={{ color: 'red' }}>{formError.gender}</span>}
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">Email </label><br />
                                        <input
                                            className="form-control"
                                            type="email"
                                            value={inputValue.email}
                                            onChange={handleInput}
                                            name="email"
                                        />
                                        {formError.email && <span style={{ color: 'red' }}>{formError.email}</span>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Mobile</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={inputValue.mobile || ""}
                                            onChange={handleInput}
                                            name="mobile"
                                            placeholder='Enter mobile number'
                                        />
                                        {formError.mobile && <span style={{ color: 'red' }}>{formError.mobile}</span>}
                                    </div>

                                </div>
                                <div className="md-12">
                                    <label className="form-label">Occupation</label><br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={inputValue.occupation || ""}
                                        onChange={handleInput}
                                        name="occupation"
                                        placeholder='Enter occupation'
                                    />
                                    {formError.occupation && <span style={{ color: 'red' }}>{formError.occupation}</span>}
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Marital Status</label><br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={inputValue.marital_status || ""}
                                        onChange={handleInput}
                                        name="marital_status"
                                    />
                                    {formError.marital_status && <span style={{ color: 'red' }}>{formError.marital_status}</span>}
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label"> Address </label><br />
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={inputValue.address}
                                            onChange={handleInput}
                                            name="address" />
                                        {formError.address && <span style={{ color: 'red' }}>{formError.address}</span>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Pincode </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.pincode || parseInt("")}
                                            onChange={handleInput}
                                            name="pincode"
                                        />
                                        {formError.pincode && <span style={{ color: 'red' }}>{formError.pincode}</span>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-4">
                                        <label className="form-label">State Name</label>
                                        <br />
                                        <select
                                            className="form-control"
                                            value={inputValue.state || ""} // Update from "inputValue.statesName" to "inputValue.state"
                                            onChange={handleState}
                                            name="state" // Update from "statesName" to "state"
                                        >
                                            <option value="">Select State</option> {/* Add an empty value option */}
                                            {getState &&
                                                getState.states.map((stateData) => (
                                                    <option key={stateData.id} value={stateData.id}>
                                                        {stateData.statesName}
                                                    </option>
                                                ))}
                                        </select>
                                        {formError.state && (
                                            <span style={{ color: 'red' }}>{formError.state}</span>
                                        )}
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">City Name</label><br />
                                        <select
                                            className="form-control"
                                            value={inputValue.city || ""}
                                            onChange={handleCity}
                                            name="city" // Update the name attribute to "city"
                                        >
                                            <option>Select a City</option>
                                            <option disabled value="">Select cities</option>
                                            {city &&
                                                city.map((citiesData) => (
                                                    <option key={parseInt(citiesData.id)} value={parseInt(citiesData.id)}>
                                                        {parseInt(citiesData.citiesName)}
                                                    </option>
                                                ))}
                                        </select>
                                        {formError.city && <span style={{ color: 'red' }}>{formError.city}</span>}
                                    </div>
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Upload photo</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={handleInput}
                                        name="photo"
                                        // value={inputValue.photo}
                                        placeholder='Choose a file'
                                    />
                                    {formError.photo && <span style={{ color: 'red' }}>{formError.photo}</span>}
                                </div>

                                <div className="modal-footer">
                                    {
                                        toggleSubmit ? <button type="submit" className="btn btn-primary">Submit</button> :
                                            <button type="submit" className="btn btn-primary">Update</button>
                                    }
                                </div>
                            </form >
                        </div>

                    </div>
                </div>
            </div>
            <div >
                < table className="table table-success table-striped">
                    <thead>
                        <tr className="thead-dark">

                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Age</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Marital Status</th>
                            <th>Occupation</th>
                            <th>Address</th>
                            <th>Pincode</th>
                            <th>State ID</th>
                            <th>State</th>
                            <th>City ID</th>
                            <th>City Name</th>
                            <th>Upload photo</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    < tbody >
                        {
                            data && data.userData.map((currentValue, id) => {
                                return (
                                    <tr key={currentValue.id}>
                                        <th>{id}</th>
                                        <td>{currentValue.name}</td>
                                        <td>{currentValue.age}</td>
                                        <td>{currentValue.date_of_birth}</td>
                                        <td>{currentValue.email}</td>
                                        <td>{currentValue.mobile}</td>
                                        <td>{currentValue.gender}</td>
                                        <td>{currentValue.marital_status}</td>
                                        <td>{currentValue.occupation}</td>
                                        <td>{currentValue.address}</td>
                                        <td>{currentValue.pincode}</td>
                                        <td>{currentValue.state}</td>
                                        <td>{currentValue.statesName}</td>
                                        <td>{currentValue.city}</td>
                                        <td>{currentValue.citiesName}</td>
                                        <td>{currentValue.photo}</td>
                                        <td><button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(id)} >Edit</button></td>
                                        <td><button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(currentValue.id)} >Delete</button></td>
                                    </tr>
                                )
                            })}
                    </tbody >
                </table >

            </div>
        </>
    )
}
export default Form;

