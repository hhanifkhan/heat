import React from 'react'
import {IndexLinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Label} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import history from './../history'
import {setModal, removeModal, getMe, logout, setGraph} from '../store'
import {connect} from 'react-redux'
import SearchQ from './Search.jsx'

function navbarInstance(props) {

	const {handleLogin, cart} = props

	const getCartData = () => {

		const quantity = Object.keys(cart)
			.reduce((acc, curr) => acc + cart[curr].quantity, 0)

		const totalPrice = Object.keys(cart)
			.map((product) => cart[product].price * cart[product].quantity)
			.reduce((acc, curr) => acc + curr, 0)
		return {quantity, totalPrice}
	}

	const cartData = getCartData()

	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<NavLink to="/home">Developer Accessories</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<SearchQ />
				</Nav>
				<Nav pullRight>
					{props.user.isAdmin ? <NavItem eventKey={1} onClick={() => {history.push('/admin')}}>Admin View</NavItem>
						: '' }
					<NavDropdown eventKey={2} title="Options" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Settings</MenuItem>
						{props.user.id ?
							<IndexLinkContainer to ="/orders">
								<MenuItem eventKey={3.2}>Orders</MenuItem>
							</IndexLinkContainer>
							: ''}
						<MenuItem eventKey={3.3}>Reviews</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.3}>Logout</MenuItem>
					</NavDropdown>
					<NavDropdown eventKey={2} title="Hot-Spot" id="basic-nav-dropdown">
						<MenuItem onClick={() => {props.handleScatter('Scatter')}} eventKey={3.1}>ScatterPlot</MenuItem>
						<MenuItem onClick={() => {props.handleScatter('Heat')}} eventKey={3.3}>HeatMap</MenuItem>
						<MenuItem onClick={() => {props.handleScatter('Scroll')}} eventKey={3.3}>Scroll HeatMap</MenuItem>
					</NavDropdown>
					{props.user.id ?
						<NavItem eventKey={3} onClick={() => {props.handleLogOut()}} href="#">Logout</NavItem>
						:
						<NavItem eventKey={3} onClick={() => handleLogin('SIGN_IN')} href="#">Login</NavItem>}

					{props.user.id ?
						''
						:<NavItem eventKey={4} onClick={() => handleLogin('SIGN_UP')} href="#">Sign-Up</NavItem>
					}
					{/*// TODO: Increase size of shopping cart*/}
					<NavItem onClick={() => handleLogin('CART')}><Label className="black-label"><i className="fa fa-shopping-cart"></i> {cartData.quantity} ITEMS - ${cartData.totalPrice.toFixed(2)}</Label></NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
//container
const mapStateToProps = (state) => {
	return {
		modals: state.modals,
		user: state.user,
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogin (modalType) {
			dispatch(setModal(modalType))
		},
		checkAuth(){
			dispatch(getMe())
		},
		handleLogOut(){
			dispatch(logout())
		},
		handleCartModal(modalType) {
			dispatch(setModal(modalType))
		},
		handleScatter(graph){
			dispatch(setGraph(graph))
		}
	}
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(navbarInstance)

export default NavBarContainer
