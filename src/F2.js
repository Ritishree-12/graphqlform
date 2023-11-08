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
        // statesName: "",
        city: "",
        // citiesName: "",
        photo: "",
    });
    const [userData, setuserData] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)
    const [city, setCity] = useState()

    const { data, loading, error } = useQuery(GET_USERS);
    const [createUser] = useMutation(CREATE_USER)
    const [deleteUser] = useMutation(DELETE_USER)

    const { data: getState } = useQuery(getAllStates);
    const { data: getCities } = useQuery(getAllCities);
    const [updateUser] = useMutation(updateUserData)

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


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })

    }


    const submitHandler = (event) => {

        event.preventDefault();

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

        // createUser({
        //     input: { inputValue }
        // })

        console.log('input ', inputValue)
        // createUser({ variables: { input: inputValue } })

        // alert('hi')
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
                // statesName: "",
                city: "",
                // citiesName: "",
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

        updateUser({ variables: { input: data } });
        console.log('createuser')

    };


    //Delete data
    const handleDelete = (id) => {
        deleteUser({ variables: { id: `${id}` } })
        // const updateuserData = userData.filter((currentValue) => {
        //     return index !== currentValue.id
        // })
        // setuserData(updateuserData)
        // console.log("delete", id)
        // // alert('hi')
    }



    // edit data
    //when user click on edit button
    //1.get the id and name of the data which user clicked to edit
    //2.set the toggle mode to change the submit button into edit button
    //3.Now update the value of the setInput with the new updated value to edit.
    //4.To pass the current element Id to new state variable for reference.
    const handleEdit = (id) => {
        let newEditData = userData.find((currentValue) => {
            return currentValue.id === id
        });// get data
        console.log(newEditData);
        setToggleSubmit(false);
        setInputValue(newEditData)
        setIsEditItem(id);

    }

    const handleState = (event) => {
        let { name, value } = event.target;

        if (name === "state") {
            setInputValue({ ...inputValue, state: value, city: "" });

            // Perform additional logic related to city selection based on the state
            const selectedState = getState.states.find((state) => state.id === value);
            console.log('selectedState.id', selectedState);

            if (selectedState && getCities && getCities.cities) {
                const getCitiesData = getCities.cities.filter((city) => city.state_id === selectedState.id);
                console.log('getCitiesData', getCitiesData);
                setCity(getCitiesData);
            }
        }
    };

    const handleCity = (event) => {
        const { name, value } = event.target;

        if (name === "city") {
            setInputValue({ ...inputValue, city: value });
        }
    };


    // useEffect(() => {
    //     if (getUserData && getUserData.getUserId) {
    //         let { __typename, ...userValues } = getUserData.getUserId;
    //         console.log("getUserId", userValues)
    //         setInputValue(userValues)

    //     }
    // }, [getUserData]);



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
                                        value={inputValue.name}
                                        onChange={handleInput}
                                        name="name"

                                    />
                                    {console.log("Ritishree")}
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label"> Age </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.age}
                                            onChange={handleInput}
                                            name="age"
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">DOB</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={inputValue.date_of_birth}
                                            onChange={handleInput}
                                            name="date_of_birth"
                                        />
                                    </div>
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Gender</label>
                                    <select className="form-control"
                                        value={inputValue.gender}
                                        onChange={handleInput}
                                        name="gender">
                                        <option value="select Option">Select an option</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Others">Others</option>
                                    </select>
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
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Mobile</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={inputValue.mobile}
                                            onChange={handleInput}
                                            name="mobile"
                                            placeholder='Enter mobile number'
                                        />
                                    </div>
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Occupation</label><br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={inputValue.occupation}
                                        onChange={handleInput}
                                        name="occupation"
                                        placeholder='Enter occupation'
                                    />
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Marital Status</label><br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={inputValue.marital_status}
                                        onChange={handleInput}
                                        name="marital_status"
                                    />
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
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Pincode </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.pincode}
                                            onChange={handleInput}
                                            name="pincode"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-2">
                                        <label className="form-label">State ID </label><br />
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.state}
                                            onChange={handleInput}
                                            name="state"
                                            placeholder='ID'
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">State Name</label><br />
                                        <select className="form-control"
                                            value={inputValue.statesName}
                                            onChange={handleState}
                                            name="statesName" >
                                            <option>Select State</option>
                                            {
                                                getState && getState.states.map((statesData, index) => {
                                                    return <option key={statesData.id} value={statesData.id}>{statesData.statesName}</option>
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <label className="form-label">City ID </label><br />
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={inputValue.city}
                                            onChange={handleInput}
                                            name="city"
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">City Name</label><br />
                                        <select className="form-control"
                                            value={inputValue.className}
                                            onChange={handleCity}
                                            name="citiesName" >
                                            <option>Select a City</option>
                                            <option disabled value=""> -- select cities -- </option>
                                            {
                                                city && city.map((citiesData) => {
                                                    return (
                                                        <>
                                                            <option key={citiesData.id} value={citiesData.id}>{citiesData.citiesName}</option>
                                                        </>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="md-12">
                                    <label className="form-label">Upload photo</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        value={inputValue.photo}
                                        onChange={handleInput}
                                        name="photo"
                                        placeholder='Choose a file'
                                    />

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
                                        <td><button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(currentValue.id)} >Edit</button></td>
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
    if (!inputValue.city) {
        errors.city = "City is required"
    }

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





<form onSubmit={submitHandler}>
    <div className="md-12">
        <label className="form-label">Name</label>
        <input
            className="form-control"
            type="text"
            value={inputValue.name}
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
                value={inputValue.age}
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
                value={inputValue.date_of_birth}
                onChange={handleInput}
                name="date_of_birth"
            />
            {formError.date_of_birth && <span style={{ color: 'red' }}>{formError.date_of_birth}</span>}
        </div>
    </div>
    <div className="md-12">
        <label className="form-label">Gender</label>
        <select className="form-control"
            value={inputValue.gender}
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
                value={inputValue.mobile}
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
            value={inputValue.occupation}
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
            value={inputValue.marital_status}
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
                value={inputValue.pincode}
                onChange={handleInput}
                name="pincode"
            />
            {formError.pincode && <span style={{ color: 'red' }}>{formError.pincode}</span>}
        </div>
    </div>
    <div className='row'>
        {/* <div className="col-2">
        <label className="form-label">State ID </label><br />
        <input
            className="form-control"
            type="number"
            value={inputValue.state}
            onChange={handleInput}
            name="state"
            placeholder='ID'
        />
    </div> */}
        <div className="col-4">
            <label className="form-label">State Name</label><br />
            <select className="form-control"
                value={inputValue.statesName}
                onChange={handleState}
                name="statesName" >
                <option>Select State</option>
                {
                    getState && getState.states.map((statesData, index) => {
                        return <option key={statesData.id} value={statesData.id}>{statesData.statesName}</option>
                    })
                }

            </select>
            {formError.state && <span style={{ color: 'red' }}>{formError.state}</span>}

        </div>
        {/* <div className="col-2">
        <label className="form-label">City ID </label><br />
        <input
            className="form-control"
            type="number"
            value={inputValue.city}
            onChange={handleInput}
            name="city"
        />
    </div> */}
        <div className="col-4">
            <label className="form-label">City Name</label><br />
            <select className="form-control"
                value={inputValue.className}
                onChange={handleInput}
                name="citiesName" >
                <option>Select a City</option>
                <option disabled value=""> select cities</option>
                {
                    city && city.map((citiesData) => {
                        return (
                            <>
                                <option key={citiesData.id} value={citiesData.id}>{citiesData.citiesName}</option>
                            </>
                        )

                    })
                }
            </select>
            {formError.city && <span style={{ color: 'red' }}>{formError.city}</span>}
        </div>
    </div>
    <div className="md-12">
        <label className="form-label">Upload photo</label>
        <input
            className="form-control"
            type="file"
            value={inputValue.photo}
            onChange={handleInput}
            name="photo"
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