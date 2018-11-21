import React from 'react'

const Header = ({ user }) => {

    return (
        <div className="header">
            <div className="logo-container">
                <img
                    src={require("../../images/logo64.png")}
                    alt="logo"
                    className='logo'
                />
            </div>
            <div className="titles">
                <h1 className='main-title'>Choisi une playlist</h1>
                <h3 className='subtitle'>Cherche parmi les playlist spotify disponibles ou les tiennes</h3>
            </div>
            <div className="userinfos">
                <div className="user-desc">
                    <p className="usertype">user</p>
                    <p className="username">{user[0]}</p>
                </div>
                <img className="user-pic" src={user[2]} alt="" />
            </div>
        </div>
    )
}

export default Header