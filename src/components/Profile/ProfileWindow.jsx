import React from 'react'
import {useDispatch } from 'react-redux'
import '@/styles/Profile.css'
import { CloseIcon } from '@/icons'
import { toggleProfile, fetchAPI, clearCurrentChat, setChatHistory } from '@/features/gitChat/gitSlice'
import { useSelector } from "react-redux";



const Profile = ()=> {
    let userId = localStorage.getItem("user-id");
    const dispatch = useDispatch()   
    const user = useSelector((state) => state.gitChat.user);      

    const deleteAllChats = () => {
        dispatch(fetchAPI({
            endpoint: 'chat',
            headers:{"user-id": userId,},
            method: 'DELETE',
        }));
        dispatch(clearCurrentChat());
        dispatch(setChatHistory());
    }

    return (
        <div id="profile-window">
            <div id="profile-head">
                <div className='ProfileAGmenuchat'>Профиль</div>
                <CloseIcon            
                    onClick={()=>{
                        dispatch(toggleProfile(false))
                    }}/>
            </div>
            <div id="profile-main">
                <div className='profile-main-row ProfileAGtext linebottom'>
                    <div>Имя пользователя</div>
                    <div>{user.name}</div>
                </div>
                <div className='profile-main-row ProfileAGtext linebottom'>
                    <div>Почта</div>
                    <div>{user.email}</div>
                </div>
                <div className='profile-main-row ProfileAGtext linebottom'>
                    <div>Архивировать все чаты</div>
                    <button 
                        className='main-profile-button ProfileAGtext'
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
                <div className='profile-main-row ProfileAGtext linebottom'>
                    <div>Удалить все чаты</div>
                    <button 
                        className='red-profile-button ProfileAGtext'
                        onClick={()=>{deleteAllChats()}}
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
                <div className='profile-main-row ProfileAGtext'>
                    <div>Выйти из профиля</div>
                    <button 
                        className='main-profile-button ProfileAGtext'
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