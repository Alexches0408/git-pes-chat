import React from 'react'
import {useDispatch } from 'react-redux'
import '@/styles/Sidebar.css';
import '@/styles/Profile.css'
import { CloseIcon } from '@/icons'
import { toggleProfile  } from '@/features/gitChat/gitSlice'




const Profile = ()=> {
    const dispatch = useDispatch()   

    return (
        <div id="profile-window">
            <div id="profile-head">
                <div className='AGmenuchat'>Профиль</div>
                <CloseIcon            
                    onClick={()=>{
                        dispatch(toggleProfile(false))
                    }}/>
            </div>
            <div id="profile-main">
                <div className='profile-main-row AGtext linebottom'>
                    <div>Имя пользователя</div>
                    <div>Илья Попов</div>
                </div>
                <div className='profile-main-row AGtext linebottom'>
                    <div>Почта</div>
                    <div>randommail@example.com</div>
                </div>
                <div className='profile-main-row AGtext linebottom'>
                    <div>Архивировать все чаты</div>
                    <button 
                        className='main-profile-button AGtext'
                        style={{  
                            background: "none",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            }}
                    >
                        Архивировать
                    </button>
                </div>
                <div className='profile-main-row AGtext linebottom'>
                    <div>Удалить все чаты</div>
                    <button 
                        className='red-profile-button AGtext'
                        style={{  
                            background: "none",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            }}
                    >
                        Удалить
                    </button>
                </div>
                <div className='profile-main-row AGtext'>
                    <div>Выйти из профиля</div>
                    <button 
                        className='main-profile-button AGtext'
                        style={{  
                            background: "none",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            }}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Profile