import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation } from "swiper/modules";
//API
import { BookProductDto } from "../../API";
//components
import ProductItem from "../ProductItem";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
//css
import "./index.css";

const product: BookProductDto = {
    author: "人",
    bookId: 10,
    bookLanguage: "中文",
    description: "爛書",
    detailsCategoryId: 0,
    detailsCategoryName: "不好看",
    id: 0,
    imageUrl: "",
    isbn: "1234567890123",
    price: 1000,
    productCategory: "實體書",
    productId: 0,
    productName: "底層邏輯：看清這個世界的底牌",
    productStatus: "上架",
    publishDate: "2021-10-10",
    publisherId: 0,
    publisherName: "爛出版社",
    stock: 100,
};

const ProductsCarousel: React.FC = () => {
    return (
        <section className="content-inner-1">
            <div className="container">
                <div className="section-head book-align">
                    <h2 className="title mb-0">暢銷書籍</h2>
                    <div className="pagination-align style-1">
                        <div className="swiper-button-prev">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="button-prev-fa"
                            />
                        </div>
                        <div className="swiper-pagination-two"></div>
                        <div className="swiper-button-next">
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="button-next-fa"
                            />
                        </div>
                    </div>
                </div>
                <div className="swiper-container books-wrapper-3 swiper-four">
                    <Swiper
                        modules={[EffectFade, Pagination, Navigation]}
                        effect="flip" // 這裡可以選擇 'cube', 'fade', 'coverflow' 或 'flip'
                        loop={true}
                        spaceBetween={5}
                        slidesPerView={3}
                        navigation={{
                            nextEl: ".swiper-button-next", // 指定下一個按鈕的選擇器
                            prevEl: ".swiper-button-prev", // 指定上一個按鈕的選擇器
                        }}
                        pagination={{
                            el: ".swiper-pagination-two", // 指定導覽列的選擇器
                            clickable: true,
                        }}
                    >
                        <div className="swiper-wrapper">
                            <SwiperSlide>
                                <ProductItem productId={1} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem productId={15} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem productId={16} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem productId={17} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem productId={18} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ProductItem productId={16} />
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ProductsCarousel;

// 這裡是套版原版 的silde
{
    /* <div className="swiper-slide">
    <div className="books-card style-3 wow fadeInUp" data-wow-delay="0.1s">
        <div className="dz-media">
            <img src="assets/picture/book5.jpg" alt="book" />
        </div>
        <div className="dz-content">
            <h5 className="title">
                <a href="books-grid-view.html">Take Out Tango</a>
            </h5>
            <ul className="dz-tags">
                <li>
                    <a href="books-grid-view.html">SPORTS,</a>
                </li>
                <li>
                    <a href="books-grid-view.html">DRAMA</a>
                </li>
            </ul>
            <div className="book-footer">
                <div className="rate">
                    <i className="flaticon-star"></i>
                    6.8
                </div>
                <div className="price">
                    <span className="price-num">$9.5</span>
                    <del>$12.0</del>
                </div>
            </div>
        </div>
    </div>
</div>; */
}
