import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";
import BookingsTable from "./BookingsTable";
import Header from "../common/Header";
import { ThreeCircles } from "react-loader-spinner";

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
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
					<ThreeCircles
						visible={true}
						height={100}
						width={100}
						color="rgb(0,0,0)"
						ariaLabel="three-circles-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div> 
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