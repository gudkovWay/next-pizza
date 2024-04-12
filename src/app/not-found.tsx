'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import styles from '@/styles/not-found/index.module.scss'

const NotFound = () => (
  <main>
    <section className={styles.not_found}>
      <div className='container'>
        <EmptyPageContent
          subtitle={`Наша <a href=\"/\">секретная служба</a> уже ведет расследование`}
          description={`В ближайшее время страница будет найдена!`}
          btnText={`Перейти к покупкам`}
          bgClassName={styles.empty_bg}
          emptyWord={`Зона 404`}
          bgWordClassName={styles.not_found_bg}
          oopsWord={`Упсс`}
          title={`Похоронная страница`}
        />
      </div>
    </section>
  </main>
)

export default NotFound
