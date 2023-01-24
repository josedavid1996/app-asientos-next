import {
  memo,
  Suspense,
  // FunctionComponent,
  // LazyExoticComponent,
  RefObject,
  SVGProps
} from 'react'
import dynamic from 'next/dynamic'
export type IconName = 'start' | 'rotate-left' | 'plus' | 'subtract'

// type SVGLazyComponent = LazyExoticComponent<
//   FunctionComponent<
//     SVGProps<SVGSVGElement> & {
//       title?: string | undefined
//     }
//   >
// >

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName
  ref?:
    | ((instance: SVGSVGElement | null) => void)
    | RefObject<SVGSVGElement>
    | null
    | undefined
}
// Poner tipo
const icons: Record<IconName, any> = {
  start: dynamic(() => import('../../../assets/icons/star-regular.svg')),
  'rotate-left': dynamic(
    () => import('../../../assets/icons/rotate-left-solid.svg')
  ),
  plus: dynamic(() => import('../../../assets/icons/plus-solid.svg')),
  subtract: dynamic(() => import('../../../assets/icons/minus-solid.svg'))
}
const Icon = ({ name, ...props }: Props) => {
  const Component = icons[name]

  return (
    <Suspense fallback={<div />}>
      <Component {...props} />
    </Suspense>
  )
}

export default memo(Icon)
