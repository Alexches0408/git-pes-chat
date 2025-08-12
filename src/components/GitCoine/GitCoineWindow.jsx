import React from 'react'
import {useDispatch } from 'react-redux'
import '@/styles/Sidebar.css';
import '@/styles/GitCoine.css'
import { CloseIcon } from '@/icons'
import { toggleGitCoine } from '@/features/gitChat/gitSlice'



const GitCoine = () => {
    const dispatch = useDispatch()  
 

    return (
        <div id="gitcoine-window">
            <div id="gitcoine-head">
                <div className='AGmenuchat'>Токены</div>
                <CloseIcon            
                    onClick={()=>{
                        dispatch(toggleGitCoine(false))
                    }}/>
            </div>
            <div id="gicoine-main">
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Gitcoine в текущем месяце</div>
                        <div id="tokens-count">75 000</div>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Клик = 100 GTC</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button AGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                    Ставь любую реакцию 🚀💬👍 – мгновенно получай 100 Gitcoin!
                    Чем чаще участвуешь, тем больше зарабатываешь.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button AGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button AGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button AGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='AGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button AGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main AGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GitCoine