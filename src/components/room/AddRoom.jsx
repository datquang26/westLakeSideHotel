import React, { useState, useEffect } from "react";
import { addRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom"

const AddRoom = () => {
    const[newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
        description: "",
        status: ""
        
    })

    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[imagePreview, setImagePreview] = useState("")

    const handleRoomInputChange = (e) =>{
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if(!isNaN(value)){
                value = parseInt(value)
            } else {
                value = ""
            }
        } 
        setNewRoom({...newRoom, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    // const handleSubmit = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice, newRoom.status, newRoom.description)
	// 		if (success !== undefined) {
	// 			setSuccessMessage("A new room was  added successfully !")
	// 			setNewRoom({ photo: null, roomType: "", roomPrice: "", status: "", description: "" })
	// 			setImagePreview("")
	// 			setErrorMessage("")
	// 		} else {
	// 			setErrorMessage("Error adding new room")
	// 		}
	// 	} catch (error) {
	// 		setErrorMessage(error.message)
	// 	}
	// 	setTimeout(() => {
	// 		setSuccessMessage("")
	// 		setErrorMessage("")
	// 	}, 3000)
	// }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // In ra giá trị của newRoom để kiểm tra
            console.log("Submitting:", newRoom);
    
            // Kiểm tra các giá trị trước khi gửi
            if (!newRoom.roomType || !newRoom.status || !newRoom.description || !newRoom.photo) {
                setErrorMessage("Please fill out all required fields.");
                return;
            }
    
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice, newRoom.description, newRoom.status);
    
            if (success) {
                setSuccessMessage("A new room was added successfully!");
                setNewRoom({ photo: null, roomType: "", roomPrice: "", status: "", description: "" });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new room");
            }
        } catch (error) {
            console.error("Submit error:", error);  // In ra lỗi cụ thể để kiểm tra
            setErrorMessage(error.message || "An unexpected error occurred");
        }
    
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    return (
        <>
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">

                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add New Room</h2>
                    {
                        successMessage && (
                            <div className="alert alert-success fade show"> {successMessage} </div>
                        )
                    }

{
                        errorMessage && (
                            <div className="alert alert-danger fade show"> {errorMessage} </div>
                        )
                    }

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label"> 
                                Room Type
                            </label>
                            <div>
                            <RoomTypeSelector
								handleRoomInputChange={handleRoomInputChange}
								newRoom={newRoom}
							/>
                            
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"> 
                                Description
                            </label>
                            <div>
                            <input
                                required
                                className="form-control"
                                id="description"
                                type="text"
                                name="description"
                                value={newRoom.description}
                                onChange={handleRoomInputChange}
                            />
                            
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label"> 
                                Status
                            </label>
                            <input
                                required
                                className="form-control"
                                id="status"
                                type="text"
                                name="status"
                                value={newRoom.status}
                                onChange={handleRoomInputChange}
                            />
                            
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label"> 
                                Room Price
                            </label>
                            <input
                            required
                            className="form-control"
                            id="roomPrice"
                            type="number"
                            name="roomPrice"
                            value={newRoom.roomPrice}
                            onChange={handleRoomInputChange}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label"> 
                                Room Photo
                            </label>
                            <input
                                required
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img src={imagePreview}
                                alt="Preview room photo"
                                style={{maxWidth: "400px", maxHeight: "400px"}}
                                className="mb-3"></img>
                            )}

                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-2">
                              <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                
                                Back
                              
                              </Link>
                      
                            <button type="submit" className="btn btn-outline-primary ml-5">
                                Save Room
                            </button>
                            
                            
                        </div>

                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddRoom