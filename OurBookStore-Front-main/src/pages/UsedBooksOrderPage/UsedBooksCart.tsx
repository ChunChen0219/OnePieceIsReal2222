import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/app.css';
import orangeCart from '../../picture/orange-cart.png';
import defaultImage2 from '../../assets/images/no image available.jpg';
import {
  useGetApiUsedBookCartsApi,
  UsedBookCartsDto,
  useGetApiUsedBooksIdId
} from '../../API';
import Preloader from '../../components/Preloader/Preloader';
//import { usedBookCartState, usedUsedBookCartStore } from '../../state';

const UsedBookPicture: React.FC<{ UsedBookId: number }> = ({ UsedBookId }) => {
  const UsedBooksResponse = useGetApiUsedBooksIdId(UsedBookId);
  if (UsedBooksResponse.isLoading) return <Preloader />;
  return (
    <img
      style={{ width: '100px', height: '100px' }}
      src={
        `data:image/png;base64,${UsedBooksResponse.data?.data.picture}` ||
        defaultImage2
      }
      alt='book'
    />
  );
};

const UsedBooksCart: React.FC = () => {
  const [memberId, setMemberId] = useState<number>(2);
  const cartData = useGetApiUsedBookCartsApi({ memberId: memberId });
  const [cart, setCart] = useState<UsedBookCartsDto[]>([]);
  useEffect(() => {
    setCart(cartData.data?.data as UsedBookCartsDto[]);
  }, [cartData.data?.data]);

  // 移除購物車商品
  const removeFromCart = (itemId: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
    setChosedItems(chosedItems.filter((item) => item.id !== itemId));
  };

  // 清空購物車
  const clearCart = () => {
    setCart([]);
    setChosedItems([]);
  };

  const [chosedItems, setChosedItems] = useState<UsedBookCartsDto[]>([]);

  // 商品勾選/取消勾選
  function handleChosedItemChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = e.target;
    const itemId = parseInt(value, 10);

    if (checked) {
      const findItem = cart.find(
        (item) => item.id === itemId && item.productStatus === true
      );
      if (findItem) {
        setChosedItems([...chosedItems, findItem]);
      }
    } else {
      setChosedItems(chosedItems.filter((item) => item.id !== itemId));
    }
  }

  // 全選/取消全選
  function handleChosedAllItems(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    // 找到所有cartItem, 並排除掉為disabled的選項
    const itemCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="cartItem"]:not(:disabled)'
    );
    // 使狀態與全選框一致
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      //將cart中所有狀態為true的商品加入購物車
      setChosedItems(cart.filter((item) => item.productStatus === true));
    } else {
      setChosedItems([]);
    }
  }

  const [fee, setFee] = useState<number>(NaN);
  function setShippingFee(e: React.ChangeEvent<HTMLInputElement>) {
    setFee(parseInt(e.target.value));
  }

  const total = chosedItems.reduce((acc, item) => acc + item.unitPrice!, 0);
  const totalItems = chosedItems.length;

  const navigate = useNavigate();
  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (chosedItems.length === 0) {
      alert('請先勾選商品再進行結帳');
      return;
    }
    if (isNaN(fee)) {
      alert('請選擇商品運送方式');
      return;
    }
    navigate('/usedBook/checkOut', {
      state: { cartItems: chosedItems, total: total, fee: fee }
    });
  };

  return (
    <div className='cart'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <table className='cart-table mb-24'>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '23px' }}>
                    <input type='checkbox' onChange={handleChosedAllItems} />{' '}
                    全選
                  </th>
                  <th style={{ textAlign: 'center' }}>商品</th>
                  <th>單價</th>
                  <th>書況</th>
                  <th>賣家</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart && cart.length > 0 ? (
                  cart.map((item) => {
                    return (
                      <tr className='col-md-8 mb-5' key={item.id}>
                        <td>
                          <input
                            type='checkbox'
                            value={item.id}
                            onChange={handleChosedItemChange}
                            name='cartItem'
                            disabled={item.productStatus ? false : true}
                          />
                          {/* productStatus 為false時商品不可被勾選 */}
                        </td>
                        <td>
                          <div className='product-detail-box'>
                            <div className='img-block'>
                              <UsedBookPicture
                                UsedBookId={item.bookID as number}
                              />
                            </div>
                            <div>
                              <h5 className='dark-gray'>{item.name}</h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h6 className='dark-gray'>
                            {item.productStatus
                              ? '$' + item.unitPrice
                              : '商品已下架或售出'}
                          </h6>
                        </td>
                        <td>
                          <h6 className='dark-gray'>{item.bookStatus}</h6>
                        </td>
                        <td>
                          <h6 className='dark-gray'>{item.sellerName}</h6>
                        </td>
                        <td>
                          <a href='#'>
                            <i
                              className='fal fa-times'
                              onClick={() => removeFromCart(item.id!)}
                            >
                              刪除
                            </i>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className='col-md-8 mb-5'>
                    <td>
                      <h5>尚無商品</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className='shipping mb-40'>
        <div className='container'>
          <div className='choose-shipping-mode'>
            <div className='row'>
              <div className='col-xl-6'>
                <div className='shipping-details'>
                  <div className='filter-block'>
                    <div className='title mb-32'>
                      <h4>Choose shipping mode:</h4>
                    </div>
                    <ul className='unstyled list'>
                      <li className='cart-list'>
                        <div className='filter-checkbox'>
                          <input
                            type='radio'
                            id='Instock'
                            name='fee'
                            value={60}
                            onChange={setShippingFee}
                          />
                          <label
                            className='cart-font black-color'
                            htmlFor='Instock'
                          >
                            超商取貨(3~7天) $60.00
                          </label>
                        </div>
                      </li>
                      <br />
                      <br />
                      <li className='cart-list'>
                        <div className='filter-checkbox'>
                          <input
                            type='radio'
                            id='Instock1'
                            name='fee'
                            value={90}
                            onChange={setShippingFee}
                          />
                          <label
                            className='cart-font black-color'
                            htmlFor='Instock1'
                          >
                            宅配到家(3~4天) $90.00
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-xl-6'>
                <div className='amounts'>
                  <div className='sub-total mb-24 justify-content-end'>
                    <h5>商品數量：</h5>
                    <h5>{totalItems}</h5>
                  </div>
                  <div className='grand-total mb-24 justify-content-end'>
                    <h5>商品總金額：</h5>
                    <h5>{total.toFixed(0)}</h5>
                  </div>
                  <h6>
                    <button onClick={handleCheckout} className='cus-btn'>
                      <span className='icon'>
                        <img src={orangeCart} alt='' />
                      </span>
                      去結帳
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button onClick={clearCart}>清空購物車</button>
    </div>
  );
};

export default UsedBooksCart;
