import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

//API
import { useGetApiProductsId } from "../../API";
//css
import "./index.css";
import { Link } from "react-router-dom";
//images
import noImage from "../../assets/images/noImage.jpg";

export interface ProductItemProps {
    productId: number;
    cardWidth?: string;
    cardHheight?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
    productId,
    cardWidth = "350px",
    cardHheight = "400px",
}) => {
    const productResponse = useGetApiProductsId(productId);
    const product = productResponse.data?.data;
    return (
        <div
            className="book-card mb-24"
            style={{ width: cardWidth, height: cardHheight }}
        >
            <Link
                to={`/ProductDetail/${productId}`}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                }}
            >
                <img
                    src={product?.imageUrl![0] ?? noImage}
                    alt=""
                    style={{
                        height: "200px",
                        objectFit: "contain",
                        backgroundColor: "#FFFFFF",
                    }}
                />
            </Link>
            <div className="">
                <ul className="unstyled hover-buttons">
                    {/* <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faHeart} />
                        </a>
                    </li> */}
                    <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="book-content">
                <h5 className="mt-24 bookName">
                    <Link to={`/ProductDetail/${productId}`}>
                        {product?.productName}
                    </Link>
                </h5>
                {/* <div className="rating-stars">
                    <a href="#">
                        <img src={fillStar} alt="" />
                    </a>
                    <a href="#">
                        <img src={fillStar} alt="" />
                    </a>
                    <a href="#">
                        <img src={fillStar} alt="" />
                    </a>
                    <a href="#">
                        <img src={fillStar} alt="" />
                    </a>
                    <a href="#">
                        <img src={emptyStar} alt="" />
                    </a>
                </div> */}
                <h6 className="dark-gray">作者: {product?.author}</h6>
                <div className="books-price">
                    <h5>
                        {product?.realPrice
                            ? `${Math.round(product?.realPrice as number)} 元`
                            : `${Math.round(product?.price as number)} 元`}
                    </h5>
                    <h6 className="old-price">
                        {product?.realPrice
                            ? `${Math.round(product?.price as number)} 元`
                            : ""}
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
