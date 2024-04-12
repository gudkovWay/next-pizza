import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showCountMessage } from '@/shared/lib/utils/common'
import { IHeadingWithCountProps } from '@/shared/types/elements'
import styles from '@/styles/heading-with-count/index.module.scss'

const HeadingWithCount = ({
  count,
  title,
  spinner,
}: IHeadingWithCountProps) => (
  <h1 className={`site-title ${styles.title}`}>
    <span>{title}</span>
    <span className={styles.title__count}>
      {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}
      {showCountMessage(`${count}`)}
    </span>
  </h1>
)

export default HeadingWithCount
