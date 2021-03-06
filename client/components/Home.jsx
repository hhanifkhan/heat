// home
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import Categories from './Categories.jsx'
import SingleProductRatings from './SingleProductRating.jsx'
import {addToCart} from '../store/cart'

const mapStateToProps = function(state) {
	return {
		products: state.products,
		search: state.searchProduct,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddToCart: (product, quantity) => {
			return dispatch(addToCart(product, quantity))
		},
	}
}

class ProductList extends Component{
	constructor ( props ) {
		super(props)
		this.state ={
			products: this.props.products
		}
	}

	render () {

		let results = this.props.search.query ? this.props.products.filter(val => val.name.includes(this.props.search.query)) : this.props.products
		if(results){
			return (
				<Row>
					<Categories />
					<Col xs={12} sm={9}>
						<ul className="list-unstyled">
							{ results.map(product => {
								let categoryArray, categoryNameArray
								if (product.categories){
									categoryArray = product.categories
									categoryNameArray = categoryArray.map(category => {
										return category.name
									})
								}
								return (
									<li className="productItem" key={product.id}>
										<NavLink to={`/products/${product.id}`}>
											<div className="productImage">
												<img src={`${product.imageURL}`} alt={`${product.name} image`} height="99" width="99" />
											</div>
										</NavLink>
										<div className="productInfo">
											<NavLink to={`/products/${product.id}`}><div><h4>Product: {product.name}</h4></div></NavLink>
											<div><h4>${product.price}</h4></div>
											<div><h5>Category: {product.categories && product.categories[0] ? categoryNameArray.join(', ') : 'None'}</h5></div>
											{/*<div><h5>Amount Remaining: {product.quantity}</h5></div>*/}
											<SingleProductRatings currentProduct={product}/>
										</div>
										{/*<Button bsStyle="info" className="catalogButton" onClick={() => this.props.handleAddToCart(product, 1)}>Add to Cart</Button>*/}
									</li>
								)
							})
							}
						</ul>
					</Col>
				</Row>
			)
		} else {
			return(<div>Error</div>)
		}
	}
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList)

export default ProductContainer
