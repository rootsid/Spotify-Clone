import React from 'react'
import { useStateValue } from './StateProvider';
import './Player.css'
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';

function Player(props) {
    const [state, dispatch] = useStateValue()
    return (
        <div className="player">
            <div className="player__body">
                <Sidebar />
                <Body />
            </div>
            <Footer />
        </div>
    )
}

export default Player
