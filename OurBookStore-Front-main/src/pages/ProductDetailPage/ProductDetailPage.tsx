import { Link, useParams } from "react-router-dom";
import {
  getGetApiCartsDetailsQueryKey,
  useGetApiCartsDetails,
  useGetApiProductsGetByDetailsCategoryProductId,
  useGetApiProductsId,
  usePostApiCartsDetails,
} from "../../API";
import LoadingMessage from "../../main";
import { useEffect, useState } from "react";
//images
import noImage from "../../assets/images/noImage.jpg";
import { useCartState } from "../../state";
import { useQueryClient } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import pdDetailsStyle from "./ProductDetailPage.module.css";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [publishDate, setPublishDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [barMesaage, setBarMessage] = useState("");
  const { cartCount, setCartCount } = useCartState((state) => state);

  const queryClient = useQueryClient();
  const productResponse = useGetApiProductsId(Number(productId));
  const cartDetailResponse = useGetApiCartsDetails({ Id: 2 }); //todo 會員ID
  const sameCategoryBookResponse =
    useGetApiProductsGetByDetailsCategoryProductId(Number(productId));
  const { mutate: addCart } = usePostApiCartsDetails();

  const product = productResponse.data?.data;
  const sameCategoryBook = sameCategoryBookResponse.data?.data;
  const cartDetailData = cartDetailResponse.data?.data;

  useEffect(() => {
    setPublishDate(new Date(product?.publishDate as string));
  }, [product]);

  if (productResponse.isLoading || sameCategoryBookResponse.isLoading) {
    return <LoadingMessage />;
  }

  const handleClickAddCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (product === undefined) {
      setOpen(true);
      setBarMessage("找不到商品。");
    } else if (cartDetailData === undefined) setCartCount(1);
    else if (
      cartDetailData.find((item) => item.productId! === product.productId!) ===
      undefined
    )
      setCartCount(1);
    else if (
      cartDetailData.find((item) => item.productId === product?.productId)
        ?.quantity >= 10
    ) {
      setOpen(true);
      setBarMessage("此商品超過購買數量限制。");
      return;
    }
    addCart({ params: { memberId: 2, productId: product?.productId } }); //TODO: 會員ID
    queryClient.invalidateQueries({
      queryKey: getGetApiCartsDetailsQueryKey({ Id: 2 }), //TODO: 會員ID
    });
    queryClient.invalidateQueries({
      queryKey: getGetApiCartsDetailsQueryKey({ Id: 2 }),
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-grey">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={barMesaage}
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row book-grid-row style-4 m-b60">
            <div className="col">
              <div className="dz-box">
                <div
                  className="dz-media"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px",
                  }}
                >
                  <img
                    src={product?.imageUrl![0] ?? noImage}
                    alt="book"
                    style={{
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "#FFFFFf",
                    }}
                  />
                </div>
                <div className="dz-content">
                  <div className="dz-header">
                    <h3 className="title">{product?.productName}</h3>
                    {/* <div className="shop-item-rating">
                                            <div className="d-lg-flex d-sm-inline-flex d-flex align-items-center">
                                                <ul className="dz-rating">
                                                    <li>
                                                        <i className="flaticon-star text-yellow"></i>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-star text-yellow"></i>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-star text-yellow"></i>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-star text-yellow"></i>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-star text-muted"></i>
                                                    </li>
                                                </ul>
                                                <h6 className="m-b0">4.0</h6>
                                            </div>
                                            <div className="social-area">
                                                <ul className="dz-social-icon style-3">
                                                    <li>
                                                        <a
                                                            href="javascript:;"
                                                            target="_self"
                                                        >
                                                            <i className="fa-brands fa-facebook-f"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:;"
                                                            target="_self"
                                                        >
                                                            <i className="fa-brands fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:;"
                                                            target="_self"
                                                        >
                                                            <i className="fa-brands fa-whatsapp"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:;"
                                                            target="_self"
                                                        >
                                                            <i className="fa-solid fa-envelope"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="dz-body">
                    <div className="book-detail">
                      <ul className="book-info">
                        <li>
                          <div>
                            <span>作者</span>
                            {product?.author}
                          </div>
                        </li>
                        <li>
                          <span>出版商</span>
                          {product?.publisherName}
                        </li>
                        <li>
                          <span>出版日期</span>
                          {publishDate?.toLocaleDateString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </li>
                      </ul>
                    </div>
                    <p className="text-1">{product?.description}</p>
                    <div className="book-footer">
                      <div className="price">
                        <h5>
                          {product?.realPrice
                            ? `${Math.round(product?.realPrice as number)} 元`
                            : ` ${Math.round(product?.price as number)} 元`}
                        </h5>
                        <p className="p-lr10">
                          {product?.realPrice
                            ? `${Math.round(product?.price as number)} 元`
                            : ""}
                        </p>
                      </div>
                      <div className="product-num">
                        <a
                          className="btn btn-primary btnhover btnhover2"
                          onClick={handleClickAddCart}
                        >
                          <i className="flaticon-shopping-cart-1"></i>{" "}
                          <span>加入購物車</span>
                        </a>
                        {/* <div className="bookmark-btn style-1 d-none d-sm-block">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault1"
                                                    >
                                                        <i className="flaticon-heart"></i>
                                                    </label>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-8">
              <div className="tabs-site-button">
                <ul className="nav nav-tabs">
                  <li>
                    <a data-bs-toggle="tab" href="" className="active">
                      書籍資訊
                    </a>
                  </li>
                  {/* <li>
                                        <a data-bs-toggle="tab" href="">
                                            用戶評論
                                        </a>
                                    </li> */}
                </ul>
                <div className="tab-content">
                  <div id="graphic-design-1" className="tab-pane show active">
                    <table className="table border book-overview">
                      <tbody className={pdDetailsStyle.pdTbodyColor}>
                        <tr>
                          <th>品名</th>
                          <td>{product?.productName}</td>
                        </tr>
                        <tr>
                          <th>作者</th>
                          <td>{product?.author}</td>
                        </tr>
                        <tr>
                          <th>ISBN</th>
                          <td>{product?.isbn}</td>
                        </tr>
                        <tr>
                          <th>語言</th>
                          <td>{product?.bookLanguage}</td>
                        </tr>
                        <tr>
                          <th>出版日期</th>
                          <td>
                            {publishDate?.toLocaleDateString("zh-TW", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <th>出版商</th>
                          <td>{product?.publisherName}</td>
                        </tr>
                        <tr className="tags">
                          <th>標籤</th>
                          <td>
                            {product?.productKeywords &&
                            product?.productKeywords.length > 0 ? (
                              product?.productKeywords.map((tags) => {
                                return (
                                  <a
                                    href="#"
                                    className="badge"
                                    style={{
                                      padding: "6px",
                                      marginRight: "5px",
                                    }}
                                    key={tags.keywordId}
                                  >
                                    {tags.keywordName}
                                  </a>
                                );
                              })
                            ) : (
                              <a href="#" className="badge">
                                無標籤
                              </a>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-5 mt-xl-0">
              <div className="widget">
                <h4 className="widget-title">同分類書籍</h4>
                <div className="row">
                  {sameCategoryBook && sameCategoryBook.length > 0 ? (
                    sameCategoryBook?.map((book) => {
                      return (
                        <div
                          className="col-xl-12 col-lg-6"
                          key={book.productId}
                        >
                          <div className="dz-shop-card style-5">
                            <div className="dz-media">
                              <Link to={`/ProductDetail/${book.productId}`}>
                                <img
                                  src={book?.imageUrl![0] ?? noImage}
                                  style={{
                                    height: "100px",
                                    objectFit: "contain",
                                    backgroundColor: "#FFFFFF",
                                  }}
                                  alt="book"
                                />
                              </Link>
                            </div>
                            <div className="dz-content">
                              <Link to={`/ProductDetail/${book.productId}`}>
                                <h5 className="subtitle">{book.productName}</h5>
                              </Link>

                              <ul className="dz-tags">
                                {book.productKeywords ? (
                                  book.productKeywords.map((tag, index) => {
                                    return (
                                      index < 3 && (
                                        <li key={tag.id}>{tag.keywordName}</li>
                                      )
                                    );
                                  })
                                ) : (
                                  <li>無標籤</li>
                                )}
                              </ul>
                              <div className="price">
                                <span className="price-num">
                                  {book.realPrice
                                    ? ` ${Math.round(
                                        book.realPrice as number
                                      )} 元`
                                    : ` ${Math.round(book.price as number)} 元`}
                                </span>
                                <del>
                                  {book.realPrice
                                    ? `${Math.round(book.price as number)} 元`
                                    : ""}
                                </del>
                              </div>
                              <a
                                className="btn btn-outline-primary btn-sm btnhover btnhover2"
                                onClick={handleClickAddCart}
                              >
                                <i className="flaticon-shopping-cart-1 me-2"></i>{" "}
                                加入購物車
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-xl-12 col-lg-6">
                      <div className="dz-shop-card style-5">
                        <div className="dz-content">
                          <h5 className="subtitle">無相關書籍</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductDetail;
