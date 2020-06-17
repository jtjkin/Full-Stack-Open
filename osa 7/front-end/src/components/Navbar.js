import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//styles
import { Container } from './style-components/navbar-style'
import { AddedSpaceLeftButton } from './style-components/generalStyles'

const Navbar = ({ handleLogout }) => {
    const user = useSelector(state => state.user)

    const linkStyle = {
        marginRight: "1em",
        color: "#60a3bc",
        textTransform: "uppercase",
        fontSize: "1.7em"
    }

    return (
        <Container>
            <Link to='/' style={linkStyle}>Blogs</Link>
            <Link to='/users' style={linkStyle}>Users</Link>
            {user.name} is logged in <AddedSpaceLeftButton onClick={handleLogout}>logout</AddedSpaceLeftButton>
        </Container>
    )
}

export default Navbar