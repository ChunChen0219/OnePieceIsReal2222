import React, { useEffect } from 'react';

const PaymentForm: React.FC = () => {
  useEffect(() => {
    const checkoutBtn = document.getElementById(
      'checkoutBtn'
    ) as HTMLButtonElement;

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        // e.preventDefault(); // 因為送出就跳轉到綠界，這個可以停住確認自己的 console.log 的內容
        const form = document.getElementById('form') as HTMLFormElement;
        if (form) {
          const formData = new FormData(form);
          let json: any = {};
          formData.forEach((value, key) => {
            json[key] = value;
          });
          console.log(json);
          // step3 : 新增訂單到資料庫
          fetch('https://localhost:44325/api/Ecpay/AddOrders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(json)
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
      });
    }
  }, []);

  return (
    <html>
      <body>
        <form
          id='form'
          name='form'
          method='POST'
          action='https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'
        >
          {/* step2 : 收到後端的值印出來 */}
          {/* 將您的表單輸入元素放在這裡 */}
          <button type='submit' id='checkoutBtn'>
            送出
          </button>
        </form>
        {/* js套件 */}
        <script
          type='text/javascript'
          src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.bundle.min.js'
        ></script>
        <script src='https://code.jquery.com/jquery-3.5.1.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/jquery-twzipcode@1.7.14/jquery.twzipcode.min.js'></script>
        {/* 自己的 */}
        <script src='../../assets/js/ecpay.js'></script>
      </body>
    </html>
  );
};

export default PaymentForm;
