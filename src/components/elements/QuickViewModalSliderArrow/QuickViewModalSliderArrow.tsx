import { IQuickViewModalSliderArrowProps } from '@/shared/types/elements'
import styles from '@/app/styles/quick-view-modal/index.module.scss'

const QuickViewModalSliderArrow = (props: IQuickViewModalSliderArrowProps) => (
  <button
    className={`${styles.modal__left__slider__slide__arrow} ${props.directionClassName}`}
    onClick={props.onClick}
  />
)

export default QuickViewModalSliderArrow
