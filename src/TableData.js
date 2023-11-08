import React from 'react'

const TableData = () => {
    return (
        <>
            < table className="table" >
                <thead>
                    <tr className="thead-dark">

                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Date_of_birth</th>
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
                    {records.map((currentValue) => {
                        return (
                            <tr>
                                <th>{currentValue.id}</th>
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
                                {/* <td><button type="button" className="btn btn-outline-success" onClick={() => handleClickOpen(id)}>Edit</button></td>
                                <td><button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(id)}>Delete</button></td> */}
                            </tr>
                        )
                    })}
                </tbody >
            </table >

        </>
    )
}

export default TableData


{/* < table className="table" >
<thead>
    <tr className="thead-dark">

        <th>ID</th>
        <th>Full Name</th>
        <th>Age</th>
        <th>Date_of_birth</th>
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
    {records.map((currentValue) => {
        const { id, name, age, date_of_birth, email, mobile, gender, marital_status, occupation, address, pincode, photo, citiesName, city, state, statesName } = currentValue
        return (
            <tr key={id}>
                {/* <th>{id}</th>y */}
//                 <td>{name}</td>
//                 <td>{age}</td>
//                 <td>{date_of_birth}</td>
//                 <td>{email}</td>
//                 <td>{mobile}</td>
//                 <td>{gender}</td>
//                 <td>{marital_status}</td>
//                 <td>{occupation}</td>
//                 <td>{address}</td>
//                 <td>{pincode}</td>
//                 <td>{state}</td>
//                 <td>{statesName}</td>
//                 <td>{city}</td>
//                 <td>{citiesName}</td>
//                 <td>{photo}</td>
//                 {/* <td><button type="button" className="btn btn-outline-success" onClick={() => handleClickOpen(id)}>Edit</button></td>
//             <td><button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(id)}>Delete</button></td> */}
//             </tr>
//         )
//     })}
// </tbody >
// </table > */}