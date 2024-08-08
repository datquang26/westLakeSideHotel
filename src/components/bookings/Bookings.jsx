import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";
import BookingsTable from "./BookingsTable";
import Header from "../common/Header";
import { Hourglass } from "react-loader-spinner";

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState("")
    
    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
        },1000)

    }, [])

    const handleBookingCancellation = async(bookingId) => {
    try {
        await cancelBooking(bookingId)
        const data = await getAllBookings()
        setBookingInfo(data)

    } catch (error) {
        setError(error.message)
    }
    }

    return (
        <section style={{backgroundColor:"whitesmoke"}}>
            <Header title={"Existing Bookings"} />
            {error && (<div className="text-danger">{error}</div>)}
            {isLoading ? (
                <div className="mt-5 mb-5">
                <Hourglass
                    visible="true"
                    height="30"
                    width="30"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['rgb(93, 152, 225)']}
                  />
            </div>
        ):(
            <BookingsTable 
                bookingInfo={bookingInfo} 
                handleBookingCancellation={handleBookingCancellation} 
            />
        )}

        </section>
    )
}

export default Bookings