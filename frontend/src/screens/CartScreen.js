import React, {useEffect} from 'react'
import {Link, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'

import {addToCart, removeFromcart} from '../redux/actions/cartAction'



const CartScreen = () => {
    const {id} = useParams()
    const [searchParams] = useSearchParams();
    let navigate = useNavigate();
    const productId = id
    const qty = searchParams.get('qty') || 1
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCarthandler = (id) => {
        dispatch(removeFromcart(id))
    }

    const checkOutHandler = () => {
        navigate(`/login?redirect=shipping`)
    }

    const emptyCart = (<Message>Your cart is empty<Link to='/'>Go Back</Link></Message>);
    const nonEmptyCart = (
        <ListGroup variant='flush'>
            {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                    <Row>
                        <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                            ${item.price}
                        </Col>
                        <Col md={2}>
                            <Form.Select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                {
                                    [...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                        <Col md={2}>
                            <Button type='button' variant='light' onClick={() => removeFromCarthandler(item.product)}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? emptyCart : nonEmptyCart}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}>
                                Proceed to Check Out
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
