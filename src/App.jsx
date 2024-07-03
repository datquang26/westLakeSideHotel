import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/room/AddRoom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ExistingRooms from "./components/room/ExistingRooms"
import EditRoom from "./components/room/EditRoom"
import Home from "./components/home/Home"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/bookings/Checkout"
import BookingSuccess from "./components/bookings/BookingSuccess"
import Bookings from "./components/bookings/Bookings"

function App() {
	return (
  <>
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Bookings />} />

        </Routes>

      </Router>
      <Footer />
    </main>
    {/* <AddRoom />
    <ExistingRooms /> */}
	</>
  )
}

export default App