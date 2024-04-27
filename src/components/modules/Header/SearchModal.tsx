import { handleCloseSearchModal } from '@/shared/lib/utils/common'

const SearchModal = () => {
  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    e.target.classList.add('with_value')
  }

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value) {
      return
    }

    e.target.classList.remove('with_value')
  }

  return (
    <div className='search-modal'>
      <button
        className='search-modal__close'
        onClick={handleCloseSearchModal}
      />
      <h3 className='search-modal__title'>Поиск продуктов</h3>
      <div className='search-modal__top'>
        <label className='search-modal__label'>
          <input
            type='text'
            className='search-modal__input'
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <span className='search-modal__floating_label'>
            Название товара, категория
          </span>
        </label>
      </div>
    </div>
  )
}

export default SearchModal
