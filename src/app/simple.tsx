'use client'

import SimpleCouponCard from '@/components/SimpleCouponCard'

const mockCoupons = [
  {
    id: '1',
    brand_name: '美团',
    icon_url: '',
    title: '美团28-12/或38-18',
    description: '点击立即进入即可跳转',
    action_type: 'link' as const,
    action_value: 'https://www.meituan.com',
    button_text: '立即进入'
  },
  {
    id: '2',
    brand_name: '饿了么',
    icon_url: '',
    title: '饿了么红包',
    description: '每天都有新红包，点击复制口令',
    action_type: 'copy' as const,
    action_value: '￥1OXW9oqAoAZ￥',
    button_text: '点我复制口令'
  },
  {
    id: '3',
    brand_name: '滴滴',
    icon_url: '',
    title: '滴滴优惠券',
    description: '新用户专享优惠，点击进入',
    action_type: 'link' as const,
    action_value: 'https://www.didiglobal.com',
    button_text: '立即进入'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="px-4 py-4">
            <h1 className="text-lg font-bold text-center text-gray-900">
              饿了么/美团/打车卷每天领
            </h1>
          </div>
        </header>

        <main className="pb-6">
          <div className="pt-4">
            {mockCoupons.map((coupon) => (
              <SimpleCouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}