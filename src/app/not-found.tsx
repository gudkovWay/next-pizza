'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import styles from '@/styles/not-found/index.module.scss'

const NotFound = () => (
  <main>
    <section className={styles.not_found}>
      <div className='container'>
        <EmptyPageContent
          subtitle={`Наша <a href=\"/\">секретная служба</a> уже ведет расследование`}
          description={`Похоже, что иноплонетные бибизьяны удалили контент страницы`}
          btnText={`Переместиться в каталог ->`}
          emptyWord={`Зона 404...`}
          bgClassName={styles.empty_bg}
          bgWordClassName={styles.not_found_bg}
          oopsWord={`Ой...`}
          title={`Похоронная страница!`}
        />
      </div>
    </section>
  </main>
)

export default NotFound
