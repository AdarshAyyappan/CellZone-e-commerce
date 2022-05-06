import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Products from '../components/Products';
import { Col, Row, Container } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Paginate from "../components/Paginate";
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';


const HomeScreen = ({id}) => {

  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products,page,pages } = productList

  console.log('render', pageNumber)


  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, pageNumber, keyword])

  const condition = (!keyword && !id) ? true : false
  console.log(condition)


  return (<>
  <Meta/>
  <Container fluid>

  
    {condition ? (
      <Row>
        <ProductCarousel />

      </Row>
     
    
    ) : (
      <Link to='/' className='btn btn-light m-3'>
      <ion-icon name="caret-back-sharp"></ion-icon>
      </Link>
    )}

    <Row className="pt-3 d-block">
      <div className="">
      <h1 className="text-center">Top Rated Products</h1>
      </div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
      <Container>
        <Row>
          {products && products.length > 0 && products.map(product => (
            
            <Col key={product._id} sm={1} md={6} lg={3} xl={3}>
              <Products product={product}  />
            </Col>
          ))}
        </Row>
     

<Paginate
  pages={pages}
  page={page}
  keyword={keyword ? keyword : ""}
/>

        </Container>
      }

    </Row>
   
{/* {!keyword ? (
     <Container className="pt-3">
     <h1>Best Rated Products</h1>
     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
         {products.map(product => (
           
           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
             <Products product={product}  />
           </Col>
         ))}
       </Row>
     }
   </Container>
    ) : (
     ""
    )} */}
    
    </Container>
  </>
  )
};

export default HomeScreen;
