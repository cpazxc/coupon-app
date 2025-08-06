'use client'

import { supabase } from '@/lib/supabase'
import { Analytics } from '@/lib/analytics'
import '@/lib/production' // 自动初始化生产环境安全措施
import { useState, useEffect } from 'react'

interface Coupon {
  id: string
  brand_name: string
  icon_url: string
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

    // 跟踪按钮点击事件
    Analytics.trackCouponClick(coupon.brand_name, coupon.action_type, coupon.title)

    if (coupon.action_type === 'copy') {
      try {
        await navigator.clipboard.writeText(coupon.action_value)
        setButtonText('复制成功!')
        setIsLoading(true)
        
        // 跟踪复制成功事件
        Analytics.trackCopySuccess(coupon.brand_name, coupon.title)
        
        setTimeout(() => {
          setButtonText(coupon.button_text)
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        // 跟踪复制失败
        Analytics.trackError('复制失败', error instanceof Error ? error.message : '未知错误')
      }
    } else if (coupon.action_type === 'link') {
      window.open(coupon.action_value, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mx-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-3">
            <img
              src={coupon.icon_url}
              alt={coupon.brand_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                // 如果图标加载失败，显示备用的文字图标
                target.style.display = 'none'
                const parent = target.parentElement!
                parent.className = "w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                parent.innerHTML = `<span class="text-xs font-bold text-white">${coupon.brand_name.charAt(0)}</span>`
              }}
            />
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
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (error) throw error
        setCoupons(data || [])
        
        // 跟踪数据加载成功
        Analytics.trackEvent('数据加载', '成功', '优惠券列表', data?.length || 0)
      } catch (error) {
        // 跟踪数据加载失败
        Analytics.trackError('数据加载失败', error instanceof Error ? error.message : '未知错误')
        
        // 如果数据库连接失败，使用Mock数据
        setCoupons([
          {
            id: '1',
            brand_name: '美团',
            icon_url: 'https://via.placeholder.com/40/ff6900/ffffff?text=美',
            title: '美团28-12/或38-18',
            description: '点击立即进入即可跳转',
            action_type: 'link',
            action_value: 'https://www.meituan.com',
            button_text: '立即进入'
          },
          {
            id: '2',
            brand_name: '饿了么',
            icon_url: 'https://via.placeholder.com/40/0066ff/ffffff?text=饿',
            title: '饿了么红包',
            description: '每天都有新红包，点击复制口令',
            action_type: 'copy',
            action_value: '￥1OXW9oqAoAZ￥',
            button_text: '点我复制口令'
          }
        ])
        
        // 跟踪使用Mock数据
        Analytics.trackEvent('数据加载', 'Mock数据', '备用数据', 2)
      } finally {
        setLoading(false)
      }
    }

    fetchCoupons()
    
    // 跟踪页面访问
    Analytics.trackPageView('/优惠券首页')
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
              外卖/奶茶/打车卷每天领
            </h1>
            <p className="text-sm text-gray-500 text-center mt-1">
              每天更新，可收藏领取
            </p>
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
