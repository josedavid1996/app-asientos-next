import React from 'react'

interface Props {
  sizeShadow: number
  translateXShawdow: number
}

const CardMap = ({ sizeShadow = 0, translateXShawdow = 0 }: Props) => {
  return (
    <div className="w-[130px] h-[80px] absolute z-20 right-15 top-2 shadow-[0_1px_4px_rgba(152,4,19,0.5)] flex justify-center items-center  bg-white">
      <div className="w-full h-full relative flex justify-center items-center overflow-hidden">
        <img src="/coliseo.svg" className="h-full" />
        <div
          className="absolute bg-[#0000005e] "
          style={{
            width: `calc(100% - ${(sizeShadow - 1) * 15}px)`,
            height: `calc(100% - ${(sizeShadow - 1) * 15}px)`,
            transform: `translateX(${translateXShawdow / 10}px)`,
            transition: 'all .5s'
          }}
        ></div>
      </div>
    </div>
  )
}

export default CardMap
