import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import '../../../assets/css/bootstrap.css';
import '../../../assets/css/style.css';
import '../../../assets/css/responsive.css';
import '../../../assets/css/color.css';
import '../UsedBookAllBook/AllBookStyle.css'; // Make sure your CSS file has all the necessary styles
import Preloader from '../../../components/Preloader/Preloader';
import { useGetApiUsedBooks } from '../../../API';
import defaultImage from '../../../assets/images/NoImageSmall.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../components/Menu/nav.css';
import {
  faChevronUp,
  faTag,
  faHeart,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

const UsedBookAllBook = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetApiUsedBooks();
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = (bookId: number) => {
    navigate(`/usedBook/${bookId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <Preloader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ margin: '150px' }}>
      <div
        className='books-panel'
        id='shortcode-db6f6943175305c452fe58565c524e3a'
      >
        <div className='books-panel-container mt-2 row '>
          {data?.data.map((book) => (
            <div key={book.id} className='books-panel-item col-sm-3 col-xs-4'>
              <div
                className={`books-panel-item-wrap ${
                  selectedBook === book.id ? 'is-flipped' : ''
                }`}
                onClick={() => handleBookClick(book.id)} // 添加點擊處理器
                onMouseEnter={() => setSelectedBook(book.id as number)}
                onMouseLeave={() => setSelectedBook(null)}
                style={{ cursor: 'pointer' }}
              >
                <div className='book-thumb-img-wrap has-edge'>
                  <img
                    width='200'
                    height='300'
                    src={(book.imageLinks?.thumbnail as string) || defaultImage}
                    className='attachment-odrin_small_soft size-odrin_small_soft wp-post-image'
                    alt={book.title as string}
                  />
                  <div className='book-spine'></div>
                </div>
                <div>
                  <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                    <p className='book-thumb-title'>{book.title}</p>
                    <br />
                  </div>
                  <div className='heart'>
                    <div className='extra-nav'>
                      <div className=' extra-cell'>
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
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className='bookPrice'>
                    <FontAwesomeIcon icon={faTag} />
                    &ensp; 價格 NT{book.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showScrollToTop && (
          <div className='scroll-to-top' onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedBookAllBook;
function setShowScrollToTop(arg0: boolean) {
  throw new Error('Function not implemented.');
}
