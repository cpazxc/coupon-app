import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BaiduAnalytics from "@/components/BaiduAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "外卖/奶茶/打车卷每天领",
  description: "每天免费领取美团、饿了么、滴滴打车等优惠券，省钱必备！",
  keywords: "美团优惠券,饿了么红包,滴滴打车券,外卖优惠,省钱",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* 百度统计 - 请替换为你的真实站点ID */}
        <BaiduAnalytics siteId={process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID || "your-baidu-analytics-id"} />
      </body>
    </html>
  );
}
