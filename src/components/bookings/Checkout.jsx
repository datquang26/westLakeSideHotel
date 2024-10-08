import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { getRoomById } from "../utils/ApiFunction";
import { useParams } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt } from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";
import { Carousel } from "react-bootstrap";

const Checkout = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [roomInfo, setRoomInfo] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	})

	const { roomId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getRoomById(roomId)
				.then((response) => {
					setRoomInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [roomId])

	return (
		<div style={{ padding: "20px" }}>
  <section className="container">
    <div className="row">
      <div className="col-12 mt-5 mb-5" style={{ minHeight: "400px" }}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Hourglass
              visible={true}
              height="50"
              width="50"
              ariaLabel="hourglass-loading"
              colors={['rgb(0,0,0)']}>
            </Hourglass>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="room-info">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <img
                className="d-block w-100"
                src={`data:image/png;base64,${roomInfo.photo}`}
                alt="Room slide"
                style={{ width: "100%", height: "405px", paddingTop: "15px" }}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <table className="table table-bordered mt-3">
                <tbody>
                  <tr>
                    <th colSpan="2" className="text-center" style={{ backgroundColor: "#242424", color: "white" }}>
                      The Hanoi Club Hotel & Lake Palais Residences
                    </th>
                  </tr>
                  <tr  style={{  border: 'none' }}>
                    <th style={{ color: "gray" }}>Address:</th>
                    <td>76 Yen Phu, Tay Ho, Hanoi, Vietnam</td>
                  </tr>
                  <tr  style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Reception is open:</th>
                    <td>24 hours</td>
                  </tr>
                  <tr style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Check-in from:</th>
                    <td>2:00 PM</td>
                  </tr>
                  <tr style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Check-out before:</th>
                    <td>12:00 PM</td>
                  </tr>
                  <tr style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Contact:</th>
                    <td>+84 24 3829 3829</td>
                  </tr>
                  <tr style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Website:</th>
                    <td>
                      <a href="http://www.thehanoiclub.com/" target="_blank" rel="noopener noreferrer">http://www.thehanoiclub.com/</a>
                    </td>
                  </tr >
                  <th colSpan="2" className="text-center" style={{ backgroundColor: "#242424", color: "white" }}>
                      Room information
                    </th>
                  <tr style={{  border: 'none' }}>
                    <th  style={{ color: "gray" }}>Room Type:</th>
                    <td>{roomInfo.roomType}</td>
                  </tr>
                  <tr style={{  borderTop: 'none'}}>
                    <th  style={{ color: "gray" }}>Price per night:</th>
                    <td style={{  borderTop: 'none'}}>${roomInfo.roomPrice}</td>
                  </tr>
                  {/* <tr>
                    <th style={{ width: "50%", color: "rgb(93, 152, 225)" }}>Room Service:</th>
                    <td>
                      <ul className="list-unstyled mb-0">
                        <li className="pb-2"><FaWifi style={{ color: "rgb(93, 152, 225)" }} /> Wifi</li>
                        <li className="pb-2"><FaTv style={{ color: "rgb(93, 152, 225)" }} /> Netflix Premium</li>
                        <li className="pb-2"><FaUtensils style={{ color: "rgb(93, 152, 225)" }} /> Breakfast</li>
                        <li className="pb-2"><FaWineGlassAlt style={{ color: "rgb(93, 152, 225)" }} /> Mini bar refreshment</li>
                        <li className="pb-2"><FaCar style={{ color: "rgb(93, 152, 225)" }} /> Car Service</li>
                        <li className="pb-2"><FaParking style={{ color: "rgb(93, 152, 225)" }} /> Parking Space</li>
                        <li className="pb-2"><FaTshirt style={{ color: "rgb(93, 152, 225)" }} /> Laundry</li>
                      </ul>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        
        )}
      </div>
      <div className="col-12">
        <BookingForm />
      </div>
    </div>
  </section>
  <div className="container ">
    <RoomCarousel />
  </div>
</div>


	)
}
export default Checkout