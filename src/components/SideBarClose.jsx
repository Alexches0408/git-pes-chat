import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '@/features/gitChat/gitSlice'
import '../styles/Sidebar.css';

import {SidebarIconClose} from '../icons'


export default function SideBarOpen() {
    const dispatch = useDispatch()    

    return (
        <div id="Sidebar-Window-Close">
            <SidebarIconClose onClick={() => dispatch(toggleSidebar())}/>
        </div>
    )
}