import styles from '@/app/styles/catalog/index.module.scss'

const CatalogLayout = ({ children }: { children: React.ReactNode }) => (
  <main>
    <section className={styles.catalog}>
      <div className='container'>{children}</div>
    </section>
  </main>
)

export default CatalogLayout
