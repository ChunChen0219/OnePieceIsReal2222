import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/app.css";
import { useCartStore, CartState } from "./CountMath";
import {
  Order,
  useGetApiCartsMemberId,
  useGetApiOrder,
  usePutApiOrderId,
} from "../../API";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import uc from "../../picture/uc.jpg";

const LinePayPage: React.FC = () => {
  const [transactionId, setTransactionId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [naviSeconds, setNaviSeconds] = useState<number>(2); // 跳轉秒數
  const [isConfirm, setIsConfirm] = useState<boolean>(true); // 是否確認付款
  const navigate = useNavigate();
  const orderResponse = useGetApiOrder({ orderId: Number(orderId) });
  const orderData = orderResponse.data?.data;
  const { mutate: changeStatus } = usePutApiOrderId();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionIdParam = params.get("transactionId");
    const orderIdParam = params.get("orderId");

    if (transactionIdParam && orderIdParam) {
      setTransactionId(transactionIdParam);
      setOrderId(orderIdParam);
    }
    const interval = setInterval(() => {
      setNaviSeconds((prevSeconds) => prevSeconds - 1); // 每秒減少一秒
    }, 10000); // 1000 毫秒 = 1 秒

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      transactionId !== "" &&
      orderId !== "" &&
      isConfirm &&
      orderResponse.data?.data
    ) {
      setIsConfirm(false);
      Confirm();
    }
  }, [transactionId, orderId, orderResponse.data?.data]);

  const baseLoginPayUrl = "https://localhost:7236/api/LinePay/";
  const Confirm = async () => {
    try {
      const payment = {
        amount: orderData?.totalAmount,
        currency: "TWD",
      };

      const response = await axios.post(
        `${baseLoginPayUrl}Confirm?transactionId=${transactionId}&orderId=${orderId}`,
        payment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.returnCode === "0000") {
        console.log("付款成功");

        const order: Order = {
          id: Number(orderId),
          status: "待出貨",
          paymentMethod: "LinePay",
        };
        changeStatus({ id: Number(orderId), data: order });

        setTimeout(() => {
          navigate("/order"); // 跳轉到付款成功頁面路徑
        }, 10000);
      } else {
        console.log("付款失敗");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-wraper">
      {/* <div id="loading-area" className="preloader-wrapper-1">
        <div className="preloader-inner">
          <div className="preloader-shade"></div>
          <div className="preloader-wrap"></div>
          <div className="preloader-wrap wrap2"></div>
          <div className="preloader-wrap wrap3"></div>
          <div className="preloader-wrap wrap4"></div>
          <div className="preloader-wrap wrap5"></div>
        </div>
      </div> */}
      <div className="under-construct">
        <div className="inner-box">
          <div className="logo-header logo-dark">
            <a href="index.html">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="dz-content">
            <h2 className="dz-title text-primary">付款完成</h2>
            <p>
              交易狀態 : 交易已授權
              <br />
              畫面將在 {naviSeconds} 秒跳轉...
            </p>
          </div>
        </div>
        <img src={uc} className="uc-bg" alt="" />
      </div>
    </div>
  );
};

export default LinePayPage;
