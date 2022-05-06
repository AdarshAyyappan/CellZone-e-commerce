import React, {useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Table,Button,Row,Col,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { listProducts,deleteProduct,createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from "../components/Paginate.js";
import { useParams } from 'react-router-dom';

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {pageNumber} =useParams()

    console.log('render', pageNumber)

    const productList = useSelector(state=>state.productList)
    const {loading,error,products,pages, page }=productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        console.log('effect')

        if(!userInfo.isAdmin){
            navigate('/signin')
        }
        if(successCreate){
            
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts("" ,pageNumber))
        }
    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler=(id) => {
        Swal.fire({
            title: 'Are you sure to want to delete the Product?',
            showCancelButton: true,
            confirmButtonText: 'Delete',    
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
              Swal.fire('Delete successfully !')
            } 
          })
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }

  return (
      <>
      <Container>
      <Row className='align-items-center'>
        <Col>
        <h1>Product</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 bg-info' onClick={createProductHandler}>
            <i className='fas fa-plus'>Create Product</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
          <>
          <Table striped bordered hover responsive className='table-sm tableColor'>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                     
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {products.map((product) =>(
                      <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                         
                          <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                              </Button>
                              </LinkContainer>
                              <Button variant ='danger' className='btn-sm ' onClick={()=>deleteHandler(product._id)}><ion-icon name="trash-outline"></ion-icon></Button>
                          </td>  
                      </tr>
                  ))}
              </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          </>
           
      )}
      
      </Container>
      </>
  )
};

export default ProductListScreen;
