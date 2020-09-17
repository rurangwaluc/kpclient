import React, { useState } from 'react'
// import { Carousel } from 'antd';
import Carousel from 'react-bootstrap/Carousel'
import img5 from '../../img/b.jpg'
import img6 from '../../img/c.jpg'
import img7 from '../../img/e.jpg'
import img8 from '../../img/e.jpg'
import img9 from '../../img/f.jpg'
function ImageSlider(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img7}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <div className="imgCarousal">

                        <h3>Buy Now</h3>
                        <p>Online Shopping With Us 1</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img8}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <div className="imgCarousal">

                        <h3>Buy Now</h3>
                        <p>Online Shopping With Us 2</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img7}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <div className="imgCarousal">

                        <h3>Buy Now</h3>
                        <p>Online Shopping With Us 3</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img7}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <div className="imgCarousal">

                        <h3>Buy Now</h3>
                        <p>Online Shopping With Us 4</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


export default ImageSlider
