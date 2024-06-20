import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { getAllRooms } from "../utils/ApiFunction";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from "../common/RoomPaginator";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ThreeCircles } from "react-loader-spinner";

const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Đặt ban đầu là true để hiển thị Spinner
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([{ id: "" }]);

    useEffect(() => {
        // setTimeout để mô phỏng thời gian loading
        const timeout = setTimeout(() => {
            setIsLoading(true); // Hiển thị Spinner
            getAllRooms()
                .then((data) => {
                    setData(data);
                    setFilteredData(data);
                    setIsLoading(false); // Ẩn Spinner sau khi dữ liệu đã được tải
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false); // Ẩn Spinner nếu có lỗi xảy ra
                });
        }, 1200); // Timeout là 3 giây

        // Clear timeout khi component unmount để tránh memory leaks
        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return (
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
        );
    }

    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData
            .slice(startIndex, endIndex)
            .map((room) => <RoomCard key={room.id} room={room} />);
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderRooms()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Room;
