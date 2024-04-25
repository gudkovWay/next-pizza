import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

const OrderPage = () => (
  <main>
    <div className='container'>
      <Breadcrumbs
        crumbs={[
          {
            href: '/cart',
            children: 'Корзина',
          },
          {
            href: '/cart/order',
            children: 'Оформление заказа',
          },
        ]}
      />

      <h1 className='site-title'>
        <span>Оформление заказа</span>
      </h1>
    </div>
  </main>
)

export default OrderPage
