'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface Coupon {
  id: string
  brand_name: string
  title: string
  description: string
  action_type: 'copy' | 'link'
  action_value: string
  button_text: string
}

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [buttonText, setButtonText] = useState(coupon.button_text)
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = async () => {
    if (isLoading) return

    if (coupon.action_type === 'copy') {
      try {
        await navigator.clipboard.writeText(coupon.action_value)
        setButtonText('复制成功!')
        setIsLoading(true)
        
        setTimeout(() => {
          setButtonText(coupon.button_text)
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error('复制失败:', error)
      }
    } else if (coupon.action_type === 'link') {
      window.open(coupon.action_value, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mx-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {coupon.brand_name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
              {coupon.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {coupon.description}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-3">
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              coupon.action_type === 'copy'
                ? isLoading
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCoupons() {
      try {
        console.log('🔍 开始获取Supabase数据...')
        console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        console.log('📊 Supabase响应:', { data, error })
        
        if (error) throw error
        
        console.log('✅ 成功获取数据条数:', data?.length)
        setCoupons(data || [])
      } catch (error) {
        console.error('❌ 获取优惠券失败:', error)
        console.log('🔄 使用Mock数据')
        // 如果数据库连接失败，使用Mock数据
        setCoupons([
          {
            id: '1',
            brand_name: '美团',
            title: '美团28-12/或38-18',
            description: '点击立即进入即可跳转',
            action_type: 'link',
            action_value: 'https://www.meituan.com',
            button_text: '立即进入'
          },
          {
            id: '2',
            brand_name: '饿了么',
            title: '饿了么红包',
            description: '每天都有新红包，点击复制口令',
            action_type: 'copy',
            action_value: '￥1OXW9oqAoAZ￥',
            button_text: '点我复制口令'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCoupons()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="px-4 py-4">
            <h1 className="text-lg font-bold text-center text-gray-900">
              饿了么/美团/打车券每天领
            </h1>
          </div>
        </header>

        <main className="pb-6">
          <div className="pt-4">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
          
          {coupons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无优惠券</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
