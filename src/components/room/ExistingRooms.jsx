import React, { useEffect, useState } from "react";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { deleteRoom, getAllRooms } from "../utils/ApiFunction";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap"
import {FaEye, FaTrashAlt, FaEdit, FaPlus} from "react-icons/fa"
import { ThreeCircles } from "react-loader-spinner";

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([{id: "", roomType: "", roomPrice: ""}])
	const [currentPage, setCurrentPage] = useState(1)
	const [roomsPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
	const [selectedRoomType, setSelectedRoomType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() => {
		fetchRooms()
	}, [])

	const fetchRooms = async () => {
		setIsLoading(true);
		try {
			const result = await getAllRooms();
			
			setTimeout(() => {
				setRooms(result);
				setIsLoading(false);
			}, 1300);
		} catch (error) {
			setErrorMessage(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (selectedRoomType === "") {
			setFilteredRooms(rooms)
		} else {
			const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
			setFilteredRooms(filtered)
		}
		setCurrentPage(1)
	}, [rooms, selectedRoomType])

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleDelete = async(roomId) => {
		try {
			const result = await deleteRoom(roomId)
			if (result === "") {
				setSuccessMessage(`Room No ${roomId} was delete`)
				fetchRooms()
			} else {
				console.error(`Erro deleting room : ${result.message}`)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
		const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
		return Math.ceil(totalRooms / roomsPerPage)
	}

	const indexOfLastRoom = currentPage * roomsPerPage
	const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
	const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

	return (
		
				<>
				<div className="container col-md-8 col-lg-6">
					{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
					{successMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
				</div>


				{ isLoading ? (
					<div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
					<ThreeCircles
						visible={true}
						height={100}
						width={100}
						color="rgb(93, 152, 225)"
						ariaLabel="three-circles-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div> 
				) : (
					<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h2>Existing Rooms</h2>
							
						</div>
						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-room"}>
									<FaPlus /> Add Room
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Room Type</th>
									<th>Room Price</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentRooms.map((room) => (
									<tr key={room.id} className="text-center">
										<td>{room.id}</td>
										<td>{room.roomType}</td>
										<td>{room.roomPrice}</td>
										<td className="gap-2" >
											
											<Link to={`/edit-room/${room.id}`}>
												<span className="btn btn-info btn-sm" style={{marginRight:"5px"}}>
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm" style={{marginRight:"5px"}}>
													<FaEdit />
												</span>
											</Link>
                                            
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(room.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<RoomPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
							onPageChange={handlePaginationClick}
						/>
					</section>
					</>
				)

				}
					
				</>
			) }


export default ExistingRooms