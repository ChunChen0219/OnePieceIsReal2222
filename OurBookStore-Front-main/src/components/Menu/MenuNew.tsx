//React
import React, { useState } from 'react';
//React-Router
import { Link } from 'react-router-dom';
// Material-UI
import { FormControl, Select, MenuItem } from '@mui/material';
import memberPicture from '../../assets/images/profile1.jpg';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo_dark.png';
import '../../assets/css/menu/style.css';
//css
import { Dropdown } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../Menu/nav.css';
import MainHeader from '../MainHeader/MainHeader';

const PhysicalEBookNav: React.FC = () => {
  const [bookSearch, setBookSearch] = useState<number>(10);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // 定義切換 dropdown 顯示/隱藏的函數
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className='sticky-header'>
        <div className='header-info-bar mt-2'>
          <div
            className='container clearfix'
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {/* <!-- Website Logo */}
            <div className='logo-header logo-dark'>
              <Link to='/usedBook'>
                <img src={logo} alt='logo' />
              </Link>
            </div>
            <div className='search-container'>
              <FormControl
                fullWidth
                className='mb-4'
                sx={{
                  width: '100px',
                  height: '100%',
                  '& .MuiInputLabel-outlined.Mui-focused': {
                    color: '#EAA451' // 聚焦時InputLabel的文字顏色
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      borderColor: '#EAA451' // 焦點時Select外框顏色
                    }
                }}
              >
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={bookSearch}
                  name='bookSearch'
                  sx={{
                    height: '100%',
                    borderRadius: '5px 0 0 5px'
                  }}
                  onChange={(event) => {
                    setBookSearch(event.target.value as number);
                  }}
                >
                  <MenuItem value={10}>全部</MenuItem>
                  <MenuItem value={20}>書名</MenuItem>
                  <MenuItem value={30}>作者</MenuItem>
                  <MenuItem value={40}>出版商</MenuItem>
                </Select>
              </FormControl>
              <div className='search-box'>
                <input
                  type='text'
                  name='keyword'
                  className='form-control search-input'
                  placeholder='書籍搜尋'
                  autoComplete='off'
                  style={{ width: '360px' }}
                />
                <button type='submit' className='b-unstyle search-icon'>
                  <i>
                    <FontAwesomeIcon icon={faSearch} />
                  </i>
                </button>
              </div>
            </div>
            {/* <!-- EXTRA NAV --> */}
            <div className='extra-nav'>
              <div className='extra-cell' style={{ margin: '20px' }}>
                <ul className='navbar-nav header-right'>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill='#000000'
                      >
                        <path d='M0 0h24v24H0V0z' fill='none'></path>
                        <path d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'></path>
                      </svg>
                      <span className='badge'>21</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='nav-link box cart-btn'
                      onClick={toggleDropdown}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill='#000000'
                      >
                        <path d='M0 0h24v24H0V0z' fill='none'></path>
                        <path d='M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'></path>
                      </svg>
                      <span className='badge'>5</span>
                    </button>
                    {/* {dropdownVisible && ( */}

                    <ul
                      className={` dropdown-menu show cart-list ${
                        dropdownVisible ? 'open' : 'close'
                      }`}
                    >
                      {/* <li className='cart-item'>
                        <div className='media'>
                          <div className='media-left'>
                            <a href='books-detail.html'>
                              <img
                                alt=''
                                className='media-object'
                                src='assets/picture/pic1.jpg'
                              />
                            </a>
                          </div>
                          <div className='media-body'>
                            <h6 className='dz-title'>
                              <a href='#' className='media-heading'>
                                Real Life
                              </a>
                            </h6>
                            <span className='dz-price'>$28.00</span>
                            <span className='item-close'>&times;</span>
                          </div>
                        </div>
                      </li>
                      <li className='cart-item'>
                        <div className='media'>
                          <div className='media-left'>
                            <a href='#'>
                              <img
                                alt=''
                                className='media-object'
                                src='assets/picture/pic2.jpg'
                              />
                            </a>
                          </div>
                          <div className='media-body'>
                            <h6 className='dz-title'>
                              <a href='#' className='media-heading'>
                                Home
                              </a>
                            </h6>
                            <span className='dz-price'>$28.00</span>
                            <span className='item-close'>&times;</span>
                          </div>
                        </div>
                      </li>
                      <li className='cart-item'>
                        <div className='media'>
                          <div className='media-left'>
                            <a href='#'>
                              <img
                                alt=''
                                className='media-object'
                                src='assets/picture/pic3.jpg'
                              />
                            </a>
                          </div>
                          <div className='media-body'>
                            <h6 className='dz-title'>
                              <a href='#' className='media-heading'>
                                Such a fun age
                              </a>
                            </h6>
                            <span className='dz-price'>$28.00</span>
                            <span className='item-close'>&times;</span>
                          </div>
                        </div>
                      </li> */}
                      {/* <li className='cart-item text-center'>
                        <h6 className='text-secondary'>Totle = $500</h6>
                      </li> */}
                      <li className='text-center d-flex'>
                        <Link
                          to='/usedBook/usedBookCart'
                          className='btn btn-sm btn-primary me-2 btnhover w-100'
                        >
                          View Cart
                        </Link>
                        <a
                          href='#'
                          className='btn btn-sm btn-outline-primary btnhover w-100'
                        >
                          Checkout
                        </a>
                      </li>
                    </ul>

                    {/* )} */}
                  </li>
                  <MainHeader />
                </ul>
              </div>
            </div>
            {/* header search nav */}
          </div>
        </div>
        <div className=' main-bar-wraper navbar-expand-lg'>
          <div className='main-bar clearfix'>
            <div className='container clearfix'>
              <div
                className='header-nav navbar-collapse collapse justify-content-start'
                id='navbarNavDropdown'
              >
                <ul className='nav navbar-nav'>
                  <li>
                    <Link to='/usedBook/usedBookAllBook'>
                      <span>關於我們</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/usedBook/usedBookAllBook'>
                      /&emsp;&emsp;<span>二手書島</span>
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <a href='my-profile.html'>My Profile</a>
                      </li>
                      <li>
                        <a href='services.html'>Services</a>
                      </li>
                      <li>
                        <a href='faq.html'>FAQ's</a>
                      </li>
                      <li>
                        <a href='help-desk.html'>Help Desk</a>
                      </li>
                      <li>
                        <a href='coming-soon.html'>Coming Soon</a>
                      </li>
                      <li>
                        <a href='pricing.html'>Pricing</a>
                      </li>
                      <li>
                        <a href='privacy-policy.html'>Privacy Policy</a>
                      </li>
                      <li>
                        <a href='under-construction.html'>Under Construction</a>
                      </li>
                      <li>
                        <a href='error-404.html'>Error 404</a>
                      </li>
                    </ul> */}
                  </li>
                  &emsp;/&emsp;
                  <li>
                    <Link to='/usedBook/used-book-list'>
                      /&emsp;&emsp; <span>我的二手書</span>
                    </Link>
                    {/* <ul className='sub-menu'>
                      <li>
                        <a href='books-grid-view.html'>Shop Grid</a>
                      </li>
                      <li>
                        <a href='books-grid-view-sidebar.html'>
                          Shop Grid Sidebar
                        </a>
                      </li>
                      <li>
                        <a href='books-list.html'>Shop List</a>
                      </li>
                      <li>
                        <a href='books-list-view-sidebar.html'>
                          Shop List Sidebar
                        </a>
                      </li>
                      <li>
                        <a href=''>Shop Detail</a>
                      </li>
                      <li>
                        <a href='shop-cart.html'>Cart</a>
                      </li>
                      <li>
                        <a href='shop-checkout.html'>Checkout</a>
                      </li>
                      <li>
                        <a href='wishlist.html'>Wishlist</a>
                      </li>
                      <li>
                        <a href='shop-login.html'>Login</a>
                      </li>
                      <li>
                        <a href='shop-registration.html'>Registration</a>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Link to='#'>
                      /&emsp;&emsp;<span>文章</span>
                    </Link>
                    <ul className='sub-menu'>
                      <li>
                        <a href='blog-grid.html'>Blog Grid</a>
                      </li>
                      {/* <li>
                        <a href='blog-large-sidebar.html'>Blog Large Sidebar</a>
                      </li>
                      <li>
                        <a href='blog-list-sidebar.html'>Blog List Sidebar</a>
                      </li>
                      <li>
                        <a href='blog-detail.html'>Blog Details</a>
                      </li> */}
                    </ul>
                  </li>
                  <li>
                    <Link to='#'>
                      /&emsp; <span>聯絡我們</span>
                    </Link>
                  </li>
                </ul>
                <div className='dz-social-icon'>
                  <ul>
                    <li>
                      <Link
                        className='fab fa-facebook-f'
                        target='_self'
                        to=''
                      ></Link>
                    </li>
                    <li>
                      <Link
                        className='fab fa-twitter'
                        target='_self'
                        to=''
                      ></Link>
                    </li>
                    <li>
                      <a
                        className='fab fa-linkedin-in'
                        target='_self'
                        href=''
                      ></a>
                    </li>
                    <li>
                      <a
                        className='fab fa-instagram'
                        target='_self'
                        href=''
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhysicalEBookNav;
