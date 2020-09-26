import React, { FunctionComponent } from 'react'
import Lottie from 'react-lottie';
import Loading from "../assets/img/loadingAnimation.json"



const Loader:FunctionComponent = () => {

  const lottieLoadingOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div
    className="w-full min-h-screen bg-purpureo-900 flex justify-center items-center">
      <Lottie options={lottieLoadingOptions} width={30} height={30}></Lottie>
    </div>
  )
}

export default Loader
