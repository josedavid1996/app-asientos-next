import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  LegacyRef,
  MutableRefObject,
  RefObject
} from 'react'
import { SVGProps } from 'react'
import SvgExterno from '../Svgs/SvgExterno'
import SvgInterno from '../Svgs/SvgInterno'

const LayoutSvg = ({
  sizeShadow,
  refData,
  setTransform,
  setSizeShadow
}: {
  sizeShadow: number
  refData: any
  setTransform: any
  setSizeShadow: any
}) => {
  const [isPrecio, setisPrecio] = useState<any>([])
  const idsDesactive = [
    'T3B-B-3',
    'T3B-B-5',
    'T3B-B-10',
    'T3B-B-15',
    'T3B-CB-2',
    'T3B-CB-12',
    'T3B-CB-22',
    'T3B-CB-8',
    'T3B-CB-10',
    'T3B-F03-17',
    'T3B-F03-7',
    'T3B-F03-22',
    'T3B-F03-14',
    'T3B-F03-19'
  ]

  const tendidoDosBajo = useRef<SVGGElement | null>(null)

  const dataPrecio = async () => {
    const res = await fetch(
      'https://apilaesperanza-dev.plazaticket.com/public/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
     query GetAllButacas($tendido: String) {
  GetAllButacas(tendido: $tendido) {
    data {
      butacaId
      tendido
      codigo
      cantidad
      precio
    }
  }
}
      `,
          variables: {
            tendido: 'T1'
          }
        })
      }
    )
    const data = await res.json()
    setisPrecio(data.data.GetAllButacas.data)
  }
  useEffect(() => {
    dataPrecio()
  }, [])

  //onClick={(
  //         e: MouseEvent<SVGCircleElement, globalThis.MouseEvent>
  //       ) => {
  //         const { target } = e
  //         if (target)
  //           (target as SVGCircleElement).classList.toggle(
  //             'fill-[#C70039]'
  //           )
  //       }}

  const handleMouse = (
    e: MouseEvent<SVGCircleElement, globalThis.MouseEvent>
  ) => {
    refData.current.style.display = 'grid'
    refData.current.style.top = `${e.pageY}px`
    refData.current.style.left = `${e.pageX}px`
    refData.current.innerHTML = (e.target as SVGCircleElement).dataset.info
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      idsDesactive.forEach((item) => {
        document.getElementById(item)?.classList.add('fill-[#bfbfbf]')
      })
      // Client-side-only code
      tendidoDosBajo.current?.children[2].childNodes.forEach((item, index) => {
        // item.addEventListener('click', (e) => {
        //   selectAsiento(e)
        // })

        return (item as SVGGElement).setAttribute(
          'data-info',
          `<div class="flex flex-col items-center">
             <span class=" text-gray-400 text-lg uppercase">Fila</span>
             <span class="font-bold text-lg">Barrera</span>
           </div>
           <div class="flex flex-col items-center">
             <span class=" text-gray-400 text-lg uppercase">Asiento</span>
             <span class="font-bold text-lg">${index + 1}</span>
           </div>
           <div class="flex flex-col items-center">
             <span class=" text-gray-400 text-lg uppercase">Precio</span>
             <span class="font-bold text-lg">S/300.00</span>
           </div>
           <div class="md:col-span-3 flex justify-center">
             <span class="text-center text-gray-400 text-lg uppercase">
               Tendido 3B
             </span>
           </div>`
        )
      })
      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item.addEventListener('click', (e) => {
          const { target } = e

          if (target)
            (target as SVGCircleElement).classList.toggle('fill-[#C70039]')
        })
      })
      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item?.addEventListener('mouseenter', (e: any) => {
          refData.current.style.display = 'grid'
          refData.current.style.top = `${e.pageY + 10}px`
          refData.current.style.left = `${e.pageX + 10}px`
          refData.current.innerHTML = (e.target as SVGPathElement).dataset.info
        })
      })
      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item.addEventListener('mouseleave', (e) => {
          refData.current.style.display = 'none'
        })
      })
      // console.log(tendidoDosBajo.current?.children[2].childNodes)
      // const coleccion: any = tendidoDosBajo.current?.children[2].children
      // if (coleccion !== undefined) {
      //   const children = [...coleccion]
      //   console.log(children, 'entre')
      //   return
      // }
    }

    return () => {
      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item.removeEventListener('click', (e) => {
          const { target } = e

          if (target)
            (target as SVGPathElement).classList.toggle('fill-[#C70039]')
        })
      })
      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item.removeEventListener('mouseenter', (e: any) => {
          refData.current.style.display = 'grid'
          refData.current.style.top = `${e.pageY + 10}px`
          refData.current.style.left = `${e.pageX + 10}px`
          refData.current.innerHTML = (
            e.target as SVGCircleElement
          ).dataset.info
        })
      })

      tendidoDosBajo.current?.children[2].childNodes.forEach((item) => {
        item.removeEventListener('onmouseleave', (e) => {
          refData.current.style.display = 'none'
        })
      })
    }
  }, [])
  // console.log(sizeShadow)
  return (
    <div className="w-[80%] h-[80%] ">
      <SvgExterno sizeShadow={sizeShadow} />

      <SvgInterno sizeShadow={sizeShadow} tendidoDosBajo={tendidoDosBajo} />
    </div>
  )
}

export default LayoutSvg
