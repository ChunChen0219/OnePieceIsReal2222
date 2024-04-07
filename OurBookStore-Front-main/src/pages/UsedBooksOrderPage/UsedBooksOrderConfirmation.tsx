import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const UsedBooksOrderConfirmation: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setPaymentStatus(location.state.paymentStatus);
    }
  }, [location.state]);


  setTimeout(() => {
    window.location.href = 'http://localhost:5173/usedBook/UsedBookOrder';
  }, 3000);

  return (

    <div className="cart">
      <h2>UsedBooksOrderConfirmation</h2>
      {paymentStatus ? <h3>付款成功</h3> : <h3>付款失敗</h3>}
      <h5>請等候跳轉...</h5>
    </div>

  );
};
export default UsedBooksOrderConfirmation;
