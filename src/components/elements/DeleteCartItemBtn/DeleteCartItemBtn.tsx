import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IDeleteCartItemBtnProps } from '@/shared/types/cart'

const DeleteItemBtn = ({
  btnDisabled,
  callback,
  className,
}: IDeleteCartItemBtnProps) => (
  <button
    className={`cart-list__item__delete ${className}`}
    onClick={callback}
    disabled={btnDisabled}
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      <span />
    )}
  </button>
)

export default DeleteItemBtn
