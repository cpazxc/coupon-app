'use client'

import { useEffect } from 'react'

interface BaiduAnalyticsProps {
  siteId: string
}

export default function BaiduAnalytics({ siteId }: BaiduAnalyticsProps) {
  useEffect(() => {
    // 检查是否已经加载了百度统计
    if (typeof window !== 'undefined' && !window._hmt) {
      window._hmt = window._hmt || []
      
      // 创建百度统计脚本
      const script = document.createElement('script')
      script.async = true
      script.src = `https://hm.baidu.com/hm.js?${siteId}`
      
      // 添加到页面头部
      const firstScript = document.getElementsByTagName('script')[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      } else {
        document.head.appendChild(script)
      }
    }
  }, [siteId])

  return null
}

// 扩展 Window 接口以支持百度统计
declare global {
  interface Window {
    _hmt: (string | number | (string | number)[])[]
  }
}