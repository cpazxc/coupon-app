'use client'

// 百度统计事件跟踪工具
export class Analytics {
  // 跟踪页面访问
  static trackPageView(pageTitle?: string) {
    if (typeof window !== 'undefined' && window._hmt) {
      if (pageTitle) {
        window._hmt.push(['_trackPageview', pageTitle])
      } else {
        window._hmt.push(['_trackPageview'])
      }
    }
  }

  // 跟踪事件
  static trackEvent(category: string, action: string, label?: string, value?: number) {
    if (typeof window !== 'undefined' && window._hmt) {
      const eventData: (string | number)[] = ['_trackEvent', category, action]
      if (label) eventData.push(label)
      if (value !== undefined) eventData.push(value)
      window._hmt.push(eventData)
    }
  }

  // 专门跟踪优惠券相关事件
  static trackCouponClick(brandName: string, actionType: 'copy' | 'link', title: string) {
    this.trackEvent('优惠券', `${actionType === 'copy' ? '复制口令' : '跳转链接'}`, `${brandName}-${title}`)
  }

  // 跟踪复制成功
  static trackCopySuccess(brandName: string, title: string) {
    this.trackEvent('用户交互', '复制成功', `${brandName}-${title}`)
  }

  // 跟踪页面加载时间
  static trackPageLoadTime(loadTime: number) {
    this.trackEvent('性能', '页面加载时间', '毫秒', loadTime)
  }

  // 跟踪错误
  static trackError(errorType: string, errorMessage: string) {
    this.trackEvent('错误', errorType, errorMessage)
  }
}

// 自动跟踪页面性能
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const loadTime = performance.now()
    Analytics.trackPageLoadTime(Math.round(loadTime))
  })
}