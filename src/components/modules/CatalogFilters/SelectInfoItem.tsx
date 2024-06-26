import { ISelectInfoItem } from '@/shared/types/catalog'
import styles from '@/app/styles/catalog/index.module.scss'

const SelectInfoItem = ({ text, handleRemoveItem, id }: ISelectInfoItem) => {
  const handleClick = () => handleRemoveItem(id)

  return (
    <li className={styles.catalog__filters__bottom__list__item}>
      <span className={styles.catalog__filters__bottom__list__item__text}>
        {text}
      </span>
      <button
        className={`${styles.catalog__filters__bottom__list__item__close}`}
        onClick={handleClick}
      />
    </li>
  )
}

export default SelectInfoItem
