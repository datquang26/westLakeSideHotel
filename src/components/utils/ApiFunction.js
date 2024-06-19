import axios from "axios"
import { el } from "date-fns/locale"

export const api = axios.create({
    baseURL: "http://localhost:9193"
})
// create room to the db
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status === 201) {
        return true
    } else {
        return false
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
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deeting room ${error.message}`)
    }
}
//update room
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
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
        const result = await api.get("/bookings/all-bookings")
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
        const result = awaitapi.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`)
    }
}