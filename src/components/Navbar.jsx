import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
    state= {clicked: false};
    handleClicked = () =>
    {
        this.setState({clicked: !this.state.clicked})
    }
    render()
    {
        return (
            <>
                <nav>
                   
                    <div>
                        <ul id='navbar' className={this.state.clicked ? "#navbar active" : "#navbar "}>
                            <li>
                           <a href="Home"> Home</a>
                            </li>
                            <li >
                                <a href="BookList" >Shop</a>
                            </li>
                            <li>
                                <a href="Form">Books</a>
                            </li>
                            <li>
                                <a href="Logout">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="mobile" onClick={this.handleClicked}>
                        <i id="bar"className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}>
        
                        </i>
                    </div>
                </nav>
            </>
          )
        }        
    }
 
export default Navbar