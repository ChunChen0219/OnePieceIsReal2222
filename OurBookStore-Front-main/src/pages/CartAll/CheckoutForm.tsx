// OrderConfirmation.tsx
import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/app.css";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useCartStore, CartState } from "./CountMath";
import { CartItemType } from "../../API";
import {
  useGetApiCartsMemberId,
  usePutTotalAmountId,
  usePostApiOrder,
  OrdersDto,
  useGetApiOrderMemberId,
  useGetApiOrder,
} from "../../API";
import LinePay from "../../picture/LinePay.png";
import Ecpay from "../../picture/ECPay.png";

// 擴展訂單介面以包含買家資訊

interface CartProps {
  initialCart: CartItemType[];
}

// 客戶資料
export const Step1: React.FC<CartProps> = ({ initialCart }) => {
  const navigate = useNavigate();

  //APIs
  const { mutate: updateCart } = usePutTotalAmountId();
  const { mutate: createOrder, data } = usePostApiOrder();

  //zustand
  const { cart } = useCartStore<CartState>((state) => state);

  // State
  const formRef = useRef<HTMLFormElement>(null); // 創建一個ref表單對象
  const [memberName, setMemberName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const memberId = 2; //假資料 之後更改 todo

  useEffect(() => {
    if (data?.data) {
      navigate("/list/Step2", { state: { orderId: data?.data } });
    }
  }, [data?.data]);
  // const handleMemberNameChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setMemberName(e.target.value);
  // };

  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target.value;
    const phoneRegex = /^(09)\d{8}$/; // 正則表達式，驗證10位數字

    if (phoneRegex.test(input)) {
      setPhone(input);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress(e.target.value);
  };
  const handleMessageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 計算並更新購物車總金額

    let total = 0;
    cart.forEach((item) => {
      total += item.unitPrice! * item.quantity!;
    });

    updateCart({ id: 3, params: { totalAmount: total } }); // 更新購物車總金額到後端

    //取得現在日期
    const now = new Date();

    // 獲取日期和時間的各個部分
    const year = now.getFullYear(); // 年
    const month = now.getMonth() + 1; // 月（從0開始計算，所以加1）
    const day = now.getDate(); // 日
    const hours = now.getHours(); // 小時
    const minutes = now.getMinutes(); // 分鐘
    const seconds = now.getSeconds(); // 秒

    // 使用模板字符串來創建一個格式化的日期時間字符串
    const formattedDateTime = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    const formData = new FormData(formRef.current as HTMLFormElement);
    const orderBody: OrdersDto = {
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      address: formData.get("address") as string,
      memberId: memberId,
      paymentMethod: "信用卡", //寫死
      orderDate: formattedDateTime,
      totalAmount: total,
      status: "未付款",
      discountAmount: 0, //折扣 todo
    };

    if (!phone || !address) {
      alert("請填寫完整的客戶資料");
      return;
    }

    await createOrder({
      data: { ordersDto: orderBody, orderDetailsDto: cart },
    });
  };

  return (
    <div id="step-1" role="tabpanel" aria-labelledby="step-1">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="contact-info">
          <h4 className="mb-32">確認資料</h4>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-24">
              <input
                type="text"
                className="form-control"
                id="memberName"
                name="memberName"
                placeholder="客戶姓名"
                value={memberName}
                readOnly
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-24">
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="手機號碼"
                defaultValue={phone}
                onChange={handlePhoneChange}
              />
              {!isValid && (
                <p style={{ color: "#F08080" }}>請輸入有效的手機號碼</p>
              )}
            </div>
          </div>
          <div className="col-sm-12">
            <div className="mb-24">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                onChange={handleAddressChange}
                placeholder="請輸入完整地址"
              />
            </div>
          </div>
          <div className="col-sm-12">
            <textarea
              className="form-control notes mb-32"
              name="message"
              id="message"
              cols={68}
              rows={5}
              placeholder="備註事項"
              value={message}
              onChange={handleMessageChange}
            ></textarea>
          </div>
          <div className="sw-toolbar-elm toolbar toolbar-bottom" role="toolbar">
            <button className="btn sw-btn-prev sw-btn" type="submit">
              去結帳
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

//付款方式LinePay
export const Step2 = () => {
  const { cart } = useCartStore<CartState>((state) => state);
  const location = useLocation();
  const orderId = location.state.orderId;

  const orderTotalResponse = useGetApiOrder({ orderId: orderId });

  let orderTotalAmount = 0;
  if (orderId != 0) {
    orderTotalAmount = orderTotalResponse.data?.data?.totalAmount as number;
  }

  const requestPayment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(orderTotalAmount);
    // const totalAmount = calculateTotal(); // 獲取總金額
    const baseLoginPayUrl = "https://localhost:7236/api/LinePay/";
    const payment = {
      amount: orderTotalAmount,
      currency: "TWD",
      orderId: orderId.toString(),
      packages: [
        {
          id: "20191011I001",
          amount: orderTotalAmount,
          name: "印跡書閣",
          products: [
            {
              name: "印跡書閣",
              quantity: 1,
              price: orderTotalAmount,
            },
          ],
        },
      ],
      redirectUrls: {
        confirmUrl: "http://127.0.0.1:5173/linepay",
        cancelUrl: "https://localhost:7236/api/Cancel",
      },
    };

    try {
      if (orderTotalAmount) {
        const response = await fetch(baseLoginPayUrl + "Create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payment),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        window.location = res.info.paymentUrl.web;
      }
    } catch (error) {
      console.log("Request failed", error);
    }
  };

  return (
    <div id="step-2" role="tabpanel" aria-labelledby="step-2">
      <div className="contact-info">
        <h4 className="mb-32">付款方式</h4>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-24">
            <div className="mb-24">
              <div>
                <button
                  type="button"
                  onClick={requestPayment}
                  className="col-5"
                >
                  <img src={LinePay} />
                </button>
                <button
                  type="button"
                  onClick={requestPayment}
                  className="col-5"
                >
                  <img src={Ecpay} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb-24">
            <div className="mb-32"></div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="mb-24"></div>
        </div>
        <div className="sw-toolbar-elm toolbar toolbar-bottom" role="toolbar">
          <Link to={"/list"} className="nav-link">
            <button className="btn sw-btn-prev sw-btn" type="button">
              上一步
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

//側邊的訂單介面
export const YourOrder: React.FC = () => {
  const { cart, total } = useCartStore<CartState>((state) => state);

  return (
    <div>
      {cart.length > 0 && (
        <div className="order-detail">
          <div className="sub-total">
            <h6 className="col-3">
              <span className="dark-gray">訂單商品</span>
            </h6>
            <h6 className="col-3">單價</h6>
            <h6 className="col-3">數量</h6>
            <h6 className="col-3">總價</h6>
          </div>
          <hr />
          {cart.map((item) => (
            <div className="sub-total" key={item.id}>
              <h6 className="col-3">
                <span className="dark-gray">{item.productName}</span>
              </h6>
              <h6 className="col-3">${item.unitPrice}</h6>
              <h6 className="col-3">{item.quantity}</h6>
              <h6 className="col-3">
                ${(item.unitPrice * item.quantity).toFixed(0)}
              </h6>
            </div>
          ))}
          <hr />
          <div className="sub-total">
            <h5 className="dark-gray">商品總價</h5>
            <h5>$ {total}</h5>
          </div>
          <hr />
          <div className="sub-total">
            <h5 className="dark-gray">運費</h5>
            <h5>Free Shipping</h5>
          </div>
          <hr />
          <h6>選擇折價券</h6>
          <div className="find-books-input">
            <select
              name="coupon"
              id="coupon"
              className="search-input dark-gray"
            >
              <option value="">選擇折價券</option>
              <option value="coupon1">折價券1</option>
              <option value="coupon2">折價券2</option>
              <option value="coupon3">折價券3</option>
            </select>
          </div>

          <hr />
          <div className="sub-total">
            <h5 className="dark-gray">折價金額</h5>
            <h5>-$0</h5>
          </div>
          <div className="sub-total">
            <h4>總付款金額</h4>
            <h4>${total.toFixed(0)}</h4>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

//上面的標籤頁
const OrderConfirmation: React.FC = () => {
  const TestData = useGetApiCartsMemberId(2);
  // if (TestData.isSuccess)
  //   console.log(TestData.data?.data)
  return (
    <div className="page-content ">
      {/* Shipping Details Start */}
      <section className="checkout container">
        <div className="row">
          <div className="col-8">
            <div className="checkout-form">
              {/* <form action="signup.html" id="form-wizard"> */}
              <ul className="nav">
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="num">1</div>
                    <span>確認資料</span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="num">2</div>
                    <span>付款方式</span>
                  </div>
                </li>
              </ul>

              <div className="tab-content">
                <Outlet />
              </div>

              {/* </form> */}
            </div>
          </div>
          <div className="col-4">
            <YourOrder />
          </div>
        </div>
      </section>

      {/* Shipping Details End */}
    </div>
  );
};

export default OrderConfirmation;
