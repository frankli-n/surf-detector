import './style/home.css'
import logo from '../../assets/logo.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeInfo from './homeInfo'
import GeneralFooter from '../../components/generalFooter'
import { useAuth } from '../../context/AuthProvider'
import useProgressiveImg from '../../utils/progressiveImg'

export default function Home() {
    let navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const auth = (useAuth()['auth'])
    const [src, { blur }] = useProgressiveImg("homeImageLowQuality.png", "homeImage.jpg")
    function navigateSignUp(){
        let path = '/signup'
        navigate(path)
    }
    
    useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [windowWidth]);


    useEffect(() => {
        windowWidth < 950 ? setIsMobile(true) : setIsMobile(false)
    }, [windowWidth])

    function handleSignIn(){
        let path='/signin'
        navigate(path)
    }
    if (auth) {
        navigate('/forecast')
    } else {
        return (
            <div>
            <div className="flex flex-col p-5" >
                
                <div className="flex" style={{ backgroundImage: 'url(' + src + ')',  
                                                                                            filter: blur ? "blur 20px" : "none",
                                                                                            transition: blur ? "none" : "filter 0.3s ease-out"
                                                                                        }}>
                </div>

                <div className={isMobile ? "flex flex-col" : "home--right"}>

                    <div className="flex">
                        <img src={logo}/>
                        <h2>SCORE MORE BARRELS.</h2>
                    </div>

                    <div className="getStarted">
                        <button onClick={navigateSignUp}>Get Started</button>
                        <div onClick={handleSignIn}>Or sign in</div>
                    </div>
                </div>
            </div>
            <HomeInfo />

            <div className='flex'>
                <GeneralFooter />
            </div>
            </div>
    )
        }
}