import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:9193"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		// "Content-Type": "multipart/form-data"
	}
}

/* This function adds a new room room to the database */
// export async function addRoom(photo, roomType, roomPrice, description, status) {
// 	const formData = new FormData()
// 	formData.append("photo", photo)
// 	formData.append("roomType", roomType)
// 	formData.append("roomPrice", roomPrice)
//     formData.append("description", description)
//     formData.append("status", status)

// 	const response = await api.post("/rooms/add/new-room", formData,{
// 		headers: getHeader()
// 	})
// 	if (response.status === 201) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
export async function addRoom(photo, roomType, roomPrice, description, status) {
    if (!["1","2","3"].includes(status)) {
        throw new Error("Trạng thái không hợp lệ");
    }
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("description", description);
    formData.append("status", status);

    try {
        const response = await api.post("/rooms/add/new-room", formData, {
            headers: getHeader(),
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in addRoom:", error);
        throw error; // Thay vì trả false, ném lỗi để dễ dàng xử lý hơn ở nơi gọi hàm
    }
}
//  get room type from db
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
// gets all room from db
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetch rooms")
    }
}

// delete room by id
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}
//update room
export async function updateRoom(roomId, roomData){
    if (!["1","2","3"].includes(roomData.status)) {
        throw new Error("Trạng thái không hợp lệ");
    }
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    formData.append("description", roomData.description)
    formData.append("status", roomData.status)
    
 
    const response = await api.put(`/rooms/update/${roomId}`, formData,{
		headers: getHeader()
	})
    return response
}

//get a room by id
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetch room ${error.message}`)
    }
}

// this function saves a new booking to db
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room: ${error.message}`)
        }
        
    }
}

//This function gets all bookings from the db
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
        return result.data
    } catch (error) {
        throw new Error(`Error fetch bookings: ${error.message}`)
    }
}

//this function get booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking: ${error.message}`)
        }
    }
}

//this function cancels booking
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`)
    }
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else{
            throw new Error(`User registration error: ${error.message}`)
        }
    }
}

export async function loginUser(login){
    try {
        const response = await api.post("/auth/login", login)
        if(response.status >= 200 && response.status < 300) {
            return response.data
        } else{
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getUserProfile(userId, token){
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteUser(userId){
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

export async function getUser(userId, token){
    try {
        const response = await api.get(`/users/${userId}`,{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}