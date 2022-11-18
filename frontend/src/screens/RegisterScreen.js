import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Messsage from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import {register} from '../redux/actions/userActions'

const RegisterScreen = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    //const [role, setRole] = useState('ROLE_MEMBDER');
    const [isSubcribed, setIsSubscribed] = useState(false);

    const [message, setMessage] = useState('');


    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        //DISPATCH REGISTER
        e.preventDefault();
        e.stopPropagation();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(firstName, lastName, email, password, isSubcribed))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Messsage variant='danger'>{message}</Messsage>}
            {error && <Messsage variant='danger'>{error}</Messsage>}
            {loading && <Loader />}
            <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group controlId='firstName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='firstname' placeholder='Enter First Name'
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Last Name'
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email Address'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='confirmPassword' placeholder='Confirm Password'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
