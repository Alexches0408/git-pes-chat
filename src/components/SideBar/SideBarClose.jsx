import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar, toggleGitCoine, toggleProfile, toggleTheme } from '@/features/gitChat/gitSlice'
import '@/styles/Sidebar.css';

import {GitCoinIconDefault, ProfileIconDefault, SidebarIconClose, PlusIcon, DarkThemeIcon, WhiteThemeIcon} from '@/icons'


export default function SideBarOpen() {
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=>state.gitChat.darkMode)    

    return (
        <div id="Sidebar-Window-Close">
            <div>
                <div className='sb-cl-icon'>
                    <SidebarIconClose onClick={() => dispatch(toggleSidebar())}/>
                </div> 
                <div className='sb-cl-plus-icon'>
                    <PlusIcon onClick={() => dispatch(toggleSidebar())}/>
                </div>
            </div>
            <div>
                <div><GitCoinIconDefault/></div>
                <div><ProfileIconDefault/></div>
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