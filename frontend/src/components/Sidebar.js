import { useState, useEffect } from "react";
import axios from 'axios'
const SideBar = ({user, setUser}) => {
    return(
        <div className="top-0 right-0 fixed">
            <h2 className="text-center">This is the sidebar</h2>
        </div>
    );
}

export default SideBar;