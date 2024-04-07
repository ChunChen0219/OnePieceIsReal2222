import React, { useState } from 'react';

const Ecpay: React.FC = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(formData);
            // step3: 新增訂單到資料庫
            const response = await fetch('https://localhost:44325/api/Ecpay/AddOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form id="form" name="form" onSubmit={handleSubmit} method="POST" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">
            {/* 表單項目 */}
            <input type="text" name="MerchantTradeNo" value={formData.MerchantTradeNo || ''} onChange={handleChange} /><br />
            {/* 其他表單項目類似，請根據您的需要添加 */}
            <button type="submit" id="checkoutBtn">送出</button>
        </form>
    );
};

export default Ecpay;
