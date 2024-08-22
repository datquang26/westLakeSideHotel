import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import { Hourglass } from "react-loader-spinner";


const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setTimeout(() => {
					setIsLoading(false);
				}, 900);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5 mb-5">
			<Hourglass
				visible="true"
				height="30"
				width="30"
				ariaLabel="hourglass-loading"
				wrapperStyle={{}}
				wrapperClass=""
				colors={['rgb(0,0,0)']}
  			/>
		</div>;
    }

    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
             <Link
                to={"/browse-all-rooms"}
                style={{
                    display: "block",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none",
                    padding: "10px 20px",
                    transition: "color 0.3s ease, text-decoration 0.3s ease",
                    cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = "#AB6C2D";
                    e.target.style.textDecoration = "none";
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = "#AB6C2D";
                    e.target.style.textDecoration = "none";
                }}
            >
                Browse all rooms
            </Link>

			<Container>
				<Carousel indicators={false} prevLabel="Previous" 
							nextLabel="Next"
							prevIcon={<IoIosArrowBack className="custom-prev-icon" style={{ fontSize: '50px', marginTop: "120px" }} />}
							nextIcon={<IoIosArrowForward className="custom-next-icon" style={{ fontSize: '50px', marginTop: "120px" }} />}
							
							
							>
								
					{[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{rooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/book-room/${room.id}`} >
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${room.photo}`}
													alt="Room Photo"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="hotel-color">{room.roomType}</Card.Title>
												<Card.Title className="room-price">${room.roomPrice}/night</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
														Book Now
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
			<style jsx>{`
               
                .carousel-control-prev, .carousel-control-next {
                    width: 5%; /* Điều chỉnh độ rộng của khu vực bấm nút */
					height: 200px
                }

                
            `}</style>
            
        </section>
    );
};

export default RoomCarousel;
