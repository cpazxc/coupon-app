// 生产环境工具 - 清理调试信息
export const ProductionUtils = {
  // 检测是否为生产环境
  isProduction: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const hostname = window.location.hostname;
    return hostname.includes('youhui.nl.edu.kg') || 
           hostname.includes('07540755.xyz') || 
           hostname.includes('galaxygames.space') ||
           !hostname.includes('localhost');
  },

  // 清理控制台输出
  disableConsole: (): void => {
    if (typeof window !== 'undefined' && ProductionUtils.isProduction()) {
      const noop = () => {};
      window.console = {
        ...window.console,
        log: noop,
        warn: noop,
        error: noop,
        info: noop,
        debug: noop,
        trace: noop,
        group: noop,
        groupEnd: noop,
        time: noop,
        timeEnd: noop,
        table: noop,
        count: noop,
        assert: noop,
        clear: noop,
      };
    }
  },

  // 初始化生产环境安全措施
  init: (): void => {
    if (typeof window !== 'undefined' && ProductionUtils.isProduction()) {
      // 禁用控制台
      ProductionUtils.disableConsole();
      
      // 禁用右键菜单
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      
      // 禁用开发者工具快捷键
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
        }
      });
      
      // 检测开发者工具
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
          // 开发者工具可能已打开，清空页面
          document.body.innerHTML = '<div style="padding: 50px; text-align: center; font-size: 18px;">请在正常模式下访问此页面</div>';
        }
      }, 1000);
    }
  }
};

// 自动初始化
if (typeof window !== 'undefined') {
  ProductionUtils.init();
}