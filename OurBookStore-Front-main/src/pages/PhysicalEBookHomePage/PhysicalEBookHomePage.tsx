import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

//componets
import ProductsCarousel from "../../components/ProductsCarousel/index.tsx";
import { useGetApiProductsGetByPublishDate } from "../../API.ts";

//css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./PhysicalEBookHomePage.css";
import { Link } from "react-router-dom";

const PhysicalEBookHomePage: React.FC = () => {
    const newProductResponse = useGetApiProductsGetByPublishDate();
    const newProducts = newProductResponse.data?.data;
    return (
        <div className="bg-white">
            {/* Swiper Banner Start */}
            <div className="main-slider style-1">
                <div className="main-swiper">
                    <Swiper
                        modules={[Pagination, Autoplay, Navigation, EffectFade]}
                        effect="fade" // 這裡可以選擇 'cube', 'fade', 'coverflow' 或 'flip'
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={{
                        //     nextEl: ".banner-slider-button-next",
                        //     prevEl: ".banner-slider-button-prev",
                        // }}
                        spaceBetween={50}
                        slidesPerView={1}
                        preventClicks={false}
                        preventClicksPropagation={false}
                    >
                        <div className="swiper-wrapper">
                            {/* 書籍一 */}

                            {newProducts ? (
                                newProducts?.map((product) => {
                                    return (
                                        <SwiperSlide
                                            key={product.productId}
                                            className="slideHight"
                                        >
                                            <div className="swiper-slide bg-blue ">
                                                <div className="container">
                                                    <div className="banner-content">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="swiper-content">
                                                                    <div className="content-info">
                                                                        <h6
                                                                            className="sub-title"
                                                                            data-swiper-parallax="-10"
                                                                        >
                                                                            注目新品
                                                                        </h6>
                                                                        <h1
                                                                            className="title mb-0"
                                                                            data-swiper-parallax="-20"
                                                                        >
                                                                            {
                                                                                product.productName
                                                                            }
                                                                        </h1>
                                                                        <ul
                                                                            className="dz-tags"
                                                                            data-swiper-parallax="-30"
                                                                        >
                                                                            <li>
                                                                                <a href="#">
                                                                                    {
                                                                                        product.author
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    {
                                                                                        product.detailsCategoryName
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                        <p
                                                                            className="text mb-0 clamp-text"
                                                                            data-swiper-parallax="-40"
                                                                        >
                                                                            {
                                                                                product.description
                                                                            }
                                                                        </p>
                                                                        <div
                                                                            className="price"
                                                                            data-swiper-parallax="-50"
                                                                        >
                                                                            <span className="price-num">
                                                                                {product?.realPrice
                                                                                    ? `${Math.round(
                                                                                          product?.realPrice as number
                                                                                      )} 元`
                                                                                    : ` ${Math.round(
                                                                                          product?.price as number
                                                                                      )} 元`}
                                                                            </span>
                                                                            <del>
                                                                                {product?.realPrice
                                                                                    ? `${Math.round(
                                                                                          product?.price as number
                                                                                      )} 元`
                                                                                    : ""}
                                                                            </del>
                                                                            {product?.realPrice && (
                                                                                <span className="badge badge-danger">
                                                                                    {`${product.discountDegree}%`}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <div
                                                                            className="content-btn"
                                                                            data-swiper-parallax="-60"
                                                                        >
                                                                            <a
                                                                                className="btn btn-primary btnhover"
                                                                                href="books-grid-view.html"
                                                                                style={{
                                                                                    pointerEvents:
                                                                                        "auto",
                                                                                }}
                                                                            >
                                                                                加入購物車
                                                                            </a>
                                                                            <Link
                                                                                to={`/ProductDetail/${product.productId}`}
                                                                                className="btn border btnhover ms-4 text-white"
                                                                                style={{
                                                                                    pointerEvents:
                                                                                        "auto",
                                                                                }}
                                                                            >
                                                                                查看商品
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div
                                                                    className="banner-media"
                                                                    data-swiper-parallax="-100"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                        height: "200px",
                                                                    }}
                                                                >
                                                                    {product.imageUrl![0] ? (
                                                                        <img
                                                                            src={
                                                                                product.imageUrl![0]
                                                                            }
                                                                            alt="banner-media"
                                                                            style={{
                                                                                marginTop:
                                                                                    "400px",
                                                                                marginRight:
                                                                                    "100px",
                                                                                height: "500px",
                                                                                width: "350px",
                                                                                borderRadius:
                                                                                    "10px",
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            ) : (
                                <div className="swiper-slide bg-blue">
                                    <div className="container">
                                        <div className="banner-content">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="swiper-content">
                                                        <div className="content-info">
                                                            <h6
                                                                className="sub-title"
                                                                data-swiper-parallax="-10"
                                                            >
                                                                loading...
                                                            </h6>
                                                            <h1
                                                                className="title mb-0"
                                                                data-swiper-parallax="-20"
                                                            >
                                                                loading...
                                                            </h1>
                                                            <ul
                                                                className="dz-tags"
                                                                data-swiper-parallax="-30"
                                                            >
                                                                <li>
                                                                    <a href="#">
                                                                        loading...
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        loading...
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <p
                                                                className="text mb-0"
                                                                data-swiper-parallax="-40"
                                                            >
                                                                Loading...
                                                            </p>
                                                            <div
                                                                className="price"
                                                                data-swiper-parallax="-50"
                                                            >
                                                                <span className="price-num">
                                                                    Loading...
                                                                </span>
                                                                <del>
                                                                    Loading...
                                                                </del>
                                                                <span className="badge badge-danger">
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="content-btn"
                                                                data-swiper-parallax="-60"
                                                            >
                                                                <a
                                                                    className="btn btn-primary btnhover"
                                                                    href="#"
                                                                >
                                                                    購買
                                                                </a>
                                                                <a
                                                                    className="btn border btnhover ms-4 text-white"
                                                                    href="#"
                                                                >
                                                                    Loading...
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="partner">
                                                            <p>Loading...</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Swiper>
                </div>

                {/* <div className="swiper main-swiper-thumb">
                    <Swiper
                        modules={[EffectFade]}
                        effect="cube" // 這裡可以選擇 'cube', 'fade', 'coverflow' 或 'flip'
                        loop={true}
                        spaceBetween={5}
                        slidesPerView={2}
                    >
                        <div className="swiper-wrapper">
                            <SwiperSlide>
                                <div className="swiper-slide">
                                    <div className="books-card">
                                        <div className="dz-media">
                                            <img
                                                src="assets/picture/book16.png"
                                                alt="book"
                                            />
                                        </div>
                                        <div className="dz-content">
                                            <h5 className="title mb-0">
                                                Think and Grow Rich
                                            </h5>
                                            <div className="dz-meta">
                                                <ul>
                                                    <li>by Napoleon Hill</li>
                                                </ul>
                                            </div>
                                            <div className="book-footer">
                                                <div className="price">
                                                    <span className="price-num">
                                                        $9.5
                                                    </span>
                                                </div>
                                                <div className="rate">
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-slide">
                                    <div className="books-card">
                                        <div className="dz-media">
                                            <img
                                                src="assets/picture/book9.jpg"
                                                alt="book"
                                            />
                                        </div>
                                        <div className="dz-content">
                                            <h5 className="title mb-0">
                                                Pushing Clouds
                                            </h5>
                                            <div className="dz-meta">
                                                <ul>
                                                    <li>by Jamet Sigh</li>
                                                </ul>
                                            </div>
                                            <div className="book-footer">
                                                <div className="price">
                                                    <span className="price-num">
                                                        $5.7
                                                    </span>
                                                </div>
                                                <div className="rate">
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-muted"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-slide">
                                    <div className="books-card">
                                        <div className="dz-media">
                                            <img
                                                src="assets/picture/book16.png"
                                                alt="book"
                                            />
                                        </div>
                                        <div className="dz-content">
                                            <h5 className="title mb-0">
                                                Think and Grow Rich
                                            </h5>
                                            <div className="dz-meta">
                                                <ul>
                                                    <li>by Napoleon Hill</li>
                                                </ul>
                                            </div>
                                            <div className="book-footer">
                                                <div className="price">
                                                    <span className="price-num">
                                                        $9.5
                                                    </span>
                                                </div>
                                                <div className="rate">
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-slide">
                                    <div className="books-card">
                                        <div className="dz-media">
                                            <img
                                                src="assets/picture/book9.jpg"
                                                alt="book"
                                            />
                                        </div>
                                        <div className="dz-content">
                                            <h5 className="title mb-0">
                                                Pushing Clouds
                                            </h5>
                                            <div className="dz-meta">
                                                <ul>
                                                    <li>by Jamet Sigh</li>
                                                </ul>
                                            </div>
                                            <div className="book-footer">
                                                <div className="price">
                                                    <span className="price-num">
                                                        $5.7
                                                    </span>
                                                </div>
                                                <div className="rate">
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-yellow"></i>
                                                    <i className="flaticon-star text-muted"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div> */}
            </div>
            {/*Swiper Banner End*/}
            <ProductsCarousel />
        </div>
    );
};

export default PhysicalEBookHomePage;
