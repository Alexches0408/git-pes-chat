import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import '@/styles/WithoutTokens.css'
import { CloseIcon } from '@/icons'
import { setNoTokens, toggleGitCoine } from '@/features/gitChat/gitSlice'



const WithoutTokens = () => {
    const dispatch = useDispatch()  
  
    return (
        <div id="without-tokens-window">
            <div id="without-tokens-head">
                <CloseIcon            
                    onClick={()=>{
                        dispatch(setNoTokens(false))
                    }}/>
            </div>
            <div id="without-tokens-body">
                <div className='wt-logo'>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.3181 21.2473C33.2453 20.613 33.8353 19.6136 33.8353 18.4797C33.8353 16.577 32.1285 15.0202 30.0423 15.0202C27.9562 15.0202 26.2493 16.577 26.2493 18.4797H16.1961C16.1961 18.4797 16.1961 18.4605 16.1961 18.4413C16.1961 16.5386 14.4892 14.9818 12.4031 14.9818C10.3169 14.9818 8.61007 16.5386 8.61007 18.4413C8.61007 19.5752 9.2001 20.5746 10.1273 21.2088C9.2001 21.8431 8.61007 22.8425 8.61007 23.9764C8.61007 25.8791 10.3169 27.4359 12.4031 27.4359C14.4892 27.4359 16.175 25.9175 16.1961 24.0148H26.2493C26.2493 25.9175 27.9562 27.4743 30.0423 27.4743C32.1285 27.4743 33.8353 25.9175 33.8353 24.0148C33.8353 22.8809 33.2453 21.8815 32.3181 21.2473Z" fill="url(#paint0_linear_3335_35590)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.3181 21.2473C33.2453 20.613 33.8353 19.6136 33.8353 18.4797C33.8353 16.577 32.1285 15.0202 30.0423 15.0202C27.9562 15.0202 26.2493 16.577 26.2493 18.4797H16.1961V18.4413C16.1961 16.5386 14.4892 14.9818 12.4031 14.9818C10.3169 14.9818 8.61007 16.5386 8.61007 18.4413C8.61007 19.5752 9.2001 20.5746 10.1273 21.2088C9.2001 21.8431 8.61007 22.8425 8.61007 23.9764C8.61007 25.8791 10.3169 27.4359 12.4031 27.4359C14.4892 27.4359 16.175 25.9175 16.1961 24.0148H26.2493C26.2493 25.9175 27.9562 27.4743 30.0423 27.4743C32.1285 27.4743 33.8353 25.9175 33.8353 24.0148C33.8353 22.8809 33.2453 21.8815 32.3181 21.2473Z" fill="url(#paint1_linear_3335_35590)"/>
                    <path d="M32.3181 21.2473C33.2453 20.613 33.8353 19.6136 33.8353 18.4797C33.8353 16.577 32.1285 15.0202 30.0423 15.0202C27.9562 15.0202 26.2493 16.577 26.2493 18.4797H16.1961M32.3181 21.2473C33.2453 21.8815 33.8353 22.8809 33.8353 24.0148C33.8353 25.9175 32.1285 27.4743 30.0423 27.4743C27.9562 27.4743 26.2493 25.9175 26.2493 24.0148H16.1961C16.175 25.9175 14.4892 27.4359 12.4031 27.4359C10.3169 27.4359 8.61007 25.8791 8.61007 23.9764C8.61007 22.8425 9.2001 21.8431 10.1273 21.2088M32.3181 21.2473L31.2222 20.5556M16.1961 18.4797C16.1961 18.4797 16.1961 18.4605 16.1961 18.4413M16.1961 18.4797V18.4413M16.1961 18.4413C16.1961 16.5386 14.4892 14.9818 12.4031 14.9818C10.3169 14.9818 8.61007 16.5386 8.61007 18.4413C8.61007 19.5752 9.2001 20.5746 10.1273 21.2088M10.1273 21.2088L11.2222 21.8889M41 21C41 32.0457 32.0457 41 21 41C9.9543 41 1 32.0457 1 21C1 9.9543 9.9543 1 21 1C32.0457 1 41 9.9543 41 21Z" stroke="#708AB9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_3335_35590" x1="1" y1="21" x2="41" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A4B7F7"/>
                    <stop offset="1" stop-color="#E5E9FB"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_3335_35590" x1="1" y1="21" x2="41" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A4B7F7"/>
                    <stop offset="1" stop-color="#E5E9FB"/>
                    </linearGradient>
                    </defs>
                    </svg>
                </div>
                <div>
                    <div className='without-tokens-AGh4 mb-[20px]'>В этом месяце вы израсходовали все токены</div>
                    <div className='without-tokens-AGtext mb-[20px]'>Узнайте прямо сейчас, как получить gitcoin <br/> для общения с ассистентом Гитпёс!</div>
                </div>
                <div id='without-tokens-buttons'>
                    <button 
                        className='without-tokens-AGmenuchat wt-give-coins-btn'
                        onClick={()=>{
                            dispatch(toggleGitCoine(true));
                            dispatch(setNoTokens(false));
                        }}
                    >
                        Получить GitCOINE</button>
                    <button 
                        className='without-tokens-AGmenuchat wt-not-interst-btn'
                        onClick={()=>{
                            dispatch(setNoTokens(false))
                        }}   
                    >
                        Не интересно</button>
                </div>
            </div>
        </div>
    )
}

export default WithoutTokens