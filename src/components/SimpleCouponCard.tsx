import { useState } from 'react'

interface CouponCardProps {
  coupon: {
    id: string
    brand_name: string
    icon_url: string
    title: string
    description: string
    action_type: 'copy' | 'link'
    action_value: string
    button_text: string
  }
}

export default function CouponCard({ coupon }: CouponCardProps) {
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
      } catch {
        // 静默处理复制失败，不显示错误信息
      }
    } else if (coupon.action_type === 'link') {
      window.open(coupon.action_value, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mx-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-3 bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">
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