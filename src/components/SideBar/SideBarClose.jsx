import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar, toggleGitCoine, toggleProfile, toggleTheme, clearCurrentChat, fetchAPI } from '@/features/gitChat/gitSlice'
import '@/styles/Sidebar.css';

import {GitCoinIconDefault, ProfileIconDefault, SidebarIconClose, PlusIcon, DarkThemeIcon, WhiteThemeIcon} from '@/icons'


export default function SideBarOpen() {
    let userId = localStorage.getItem("user-id");
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=>state.gitChat.darkMode)  
    
    const createChat = () => {
        dispatch(clearCurrentChat());
        dispatch(fetchAPI({
            endpoint: 'list',
            headers:{"user-id": userId,},
            method: 'GET',
            target: 'chatHistory'
        }))
    }

    return (
        <div id="Sidebar-Window-Close">
            <div>
                <div className='sb-cl-icon'>
                    <SidebarIconClose onClick={() => dispatch(toggleSidebar())}/>
                </div> 
                <div className='sb-cl-plus-icon'>
                    <PlusIcon onClick={() => createChat()}/>
                </div>
            </div>
            <div className='sb-cl-bottom-icons'>
                <div
                    style={{  
                        cursor: "pointer",
                    }} 
                    onClick={()=>{
                        dispatch(toggleGitCoine(true))
                        dispatch(toggleProfile(false))
                    }}
                >
                    <GitCoinIconDefault/>
                </div>
                <div
                    style={{  
                        cursor: "pointer",
                        }} 
                    onClick={()=>{
                            dispatch(toggleProfile(true))
                            dispatch(toggleGitCoine(false))
                        }}
                >
                    <ProfileIconDefault/>
                </div>
                <div 
                    className={`sb-close-toggle ${darkMode ? 'sb-close-dr-toggle': 'sb-close-wh-toggle'}`}                             
                    onClick={() => dispatch(toggleTheme())}
                >
                    <div className={`${darkMode ? 'sb-close-dr-theme': 'sb-cl-wh-theme'}`}>
                        {darkMode ? <DarkThemeIcon/> : <WhiteThemeIcon/>}
                    </div>
                </div>
            </div>
 
        </div>
    )
}