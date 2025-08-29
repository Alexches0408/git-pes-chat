import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import '@/styles/Sidebar.css';
import '@/styles/GitCoine.css'
import { CloseIcon } from '@/icons'
import { toggleGitCoine } from '@/features/gitChat/gitSlice'



const GitCoine = () => {
    const dispatch = useDispatch()  
 
    const tokens = useSelector((state) => state.gitChat.tokens);   
    return (
        <div id="gitcoine-window">
            <div id="gitcoine-head">
                <div className='GitCoineAGmenuchat'>Токены</div>
                <CloseIcon            
                    onClick={()=>{
                        dispatch(toggleGitCoine(false))
                    }}/>
            </div>
            <div id="gicoine-main">
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Gitcoine в текущем месяце</div>
                        <div id="tokens-count">{tokens}</div>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Клик = 100 GTC</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button GitCoineAGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                    Ставь любую реакцию 🚀💬👍 – мгновенно получай 100 Gitcoin!
                    Чем чаще участвуешь, тем больше зарабатываешь.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button GitCoineAGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button GitCoineAGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button GitCoineAGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
                <div className="gitcoine-item">
                    <div className="gitcoine-item-toprow">
                        <div className='GitCoineAGtext'>Gitcoine в текущем месяце</div>
                        <button
                            style={{  
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            className="gitcoin-main-button GitCoineAGtext"
                        >
                            Получить
                        </button>
                    </div>
                    <div className="gitcoine-item-main GitCoineAGtxt14">
                        1 токен =  3-4 символа<br />
                        Считаются и ваши запросы, и ответы ассистента.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GitCoine