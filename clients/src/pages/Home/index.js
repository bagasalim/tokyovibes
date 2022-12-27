import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Card, Col, Container, Image, Row } from "react-bootstrap"
import "react-multi-carousel/lib/styles.css";
import Navbar from '../../components/navbar/navbar'
import { API_URL } from "../../utils/constants";
import axios from "axios";
import "./style.css"
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { SettingsPromo, SettingsSpSell } from "../../components/SettingCarouselHome";

const Home = () => {
    const [productpromo, setProductpromo] = useState([{
        id: "",
        name: "",
        price: 0,
        stock: 0,
        spesification: {},
        description: ""
    }]);

    const [productspecialsell, setProductspecialsell] = useState([{
        id: "",
        name: "",
        price: 0,
        stock: 0,
        spesification: {},
        description: ""
    }]);

    const [product, setProduct] = useState([{
        id: "",
        name: "",
        price: 0,
        stock: 0,
        spesification: {},
        description: ""
    }]);

    useEffect(() => {
        const fetchData = async () => {
            const resultpromo = await axios.get(API_URL + "products?categorysell=promo")
            setProductpromo(resultpromo.data);

            const resultspecialsell = await axios.get(API_URL + "products?categorysell=specialsell")
            setProductspecialsell(resultspecialsell.data);

            const result = await axios.get(API_URL + "products")
            setProduct(result.data);
        };
        fetchData()
    }, []);

    return (
        <>
            <Navbar />

            <div>
                <div className="containerPromo">
                    <h2>Promo</h2>
                    <Slider {...SettingsPromo}>
                        {productpromo.map((item, index) => (
                            <div className="d-flex justify-content-center mb-2">
                                <Link to={`/details/${item.id}`} className="linkCard" draggable={false} >
                                    <Card style={{ width: '35rem', height: '15rem', borderRadius: 20, filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}>
                                        <Row>
                                            <Col xs={7}>
                                                <Card.Body style={{ marginTop: 7, maxWidth: "100%", maxHeight: "100%" }}>
                                                    <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
                                                    <Card.Text style={{ textAlign: "center" }}>
                                                        Some quick example text to build on the card title and make up the
                                                        bulk of the card's content.
                                                    </Card.Text>
                                                    <Card.Text style={{ textAlign: "center", textDecoration: "line-through", color: "red" }}>
                                                        <b>Rp. {item.price}</b>
                                                    </Card.Text>
                                                    <Card.Text style={{ textAlign: "center" }}>
                                                        <b>Rp. {item.price * (1 - (item.promo / 100))}</b>
                                                    </Card.Text>
                                                </Card.Body>

                                            </Col>
                                            <Col style={{ marginTop: 20, marginRight: 10, paddingLeft: 15 }}>
                                                {item?.img ? <Image src={require(`../../assets/img/${item?.img}`)} alt={"Gambar1"} height={200} width={200} style={{ borderRadius: 20 }}></Image> : <span>Loading...</span>}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div style={{ margin: 30, verticalAlign: "middle" }}>
                    <div style={{ marginLeft: 60, marginRight: 60 }}>
                        <h2 className="mb-5 mt-5" >Special Hololive Sell</h2>
                        <Slider {...SettingsSpSell}>
                            {productspecialsell.map((item, index) => (
                                <Col style={{ padding: 0 }}>
                                    <div className="d-flex justify-content-center mb-4"  >
                                        <Link to={`/details/${item.id}`} className="linkCard" draggable={false} >
                                            <Card className="item1" style={{ width: '17rem', border: "none", borderRadius: 20, background: "#3E3E3E", }}>
                                                {item?.img ? <Card.Img variant="top" height={"260"} src={require(`../../assets/img/${item?.img}`)} style={{ borderRadius: 15, paddingRight: 0, paddingLeft: 0 }} /> : <span>Loading ...</span>}
                                                <div style={{ margin: "10px 20px 10px 20px", color: "white" }}>
                                                    <div>{item.name}</div>
                                                    <div className="mt-1">Hololive</div>
                                                    <div className="mt-1" style={{ fontWeight: "700" }}>{item.price}</div>
                                                    <div className="mt-1 mb-1">Terjual 500++</div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                </Col>
                            ))}
                        </Slider>
                    </div>
                </div >

                <div style={{ margin: 20, verticalAlign: "middle" }}>
                    <h2 className="mb-3 mt-2" style={{ marginLeft: 90 }}>List Action Figure</h2>
                    <div className='d-flex flex-wrap justify-content-center '>
                        {product.map((item, index) => (
                            <div className="mb-4 cardProductAll"  >
                                <Link to={`/details/${item.id}`} className="linkCard" draggable={false} >
                                    <Card className="item1" style={{ width: '17rem', border: "none", borderRadius: 20, background: "#3E3E3E", }}>
                                        {item?.img ? <Card.Img variant="top" height={"260"} src={require(`../../assets/img/${item?.img}`)} style={{ borderRadius: 15, paddingRight: 0, paddingLeft: 0 }} /> : <span>Loading...</span>}
                                        <div style={{ margin: "10px 20px 10px 20px", color: "white" }}>
                                            <div>{item.name}</div>
                                            <div className="mt-1">Hololive</div>
                                            <div className="mt-1" style={{ fontWeight: "700" }}>{item.price}</div>
                                            <div className="mt-1 mb-1">Terjual 500++</div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )

}

export default Home;
