/**
 * ScrollObserver - 滚动观察器模块
 * 统一管理页面元素的入场动画
 * 使用 Intersection Observer API 实现高性能的滚动检测
 */

class ScrollObserver {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {Element|null} options.root - 观察的根元素，默认为视口
   * @param {string} options.rootMargin - 根元素的外边距，默认 '0px'
   * @param {number|number[]} options.threshold - 触发阈值，默认 0.1（元素10%可见时触发）
   * @param {Function|null} options.onVisible - 元素可见时的回调函数
   */
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      onVisible: null,
      ...options
    };

    // 创建 Intersection Observer 实例
    this.observer = new IntersectionObserver(
      this._callback.bind(this),
      {
        root: this.options.root,
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      }
    );

    // 存储已观察的元素，用于后续清理
    this.observedElements = new Set();
  }

  /**
   * 内部回调函数，当观察到元素进入/离开视口时触发
   * @param {IntersectionObserverEntry[]} entries - 观察条目数组
   */
  _callback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 元素进入视口
        const element = entry.target;

        // 添加 visible 类触发动画
        element.classList.add('visible');

        // 如果元素是计数器，启动数字递增动画
        if (element.classList.contains('counter')) {
          this._startCounter(element);
        }

        // 调用自定义回调（如果提供）
        if (typeof this.options.onVisible === 'function') {
          this.options.onVisible(element);
        }

        // 停止观察该元素（动画仅执行一次）
        this.observer.unobserve(element);
        this.observedElements.delete(element);
      }
    });
  }

  /**
   * 启动计数器动画
   * @param {HTMLElement} element - 计数器元素
   */
  _startCounter(element) {
    // 动态导入 Counter 模块
    if (typeof Counter !== 'undefined') {
      const target = parseInt(element.dataset.target, 10);
      const duration = parseInt(element.dataset.duration, 10) || 1500;

      if (!isNaN(target)) {
        new Counter(element, target, duration).start();
      }
    }
  }

  /**
   * 开始观察指定元素
   * @param {HTMLElement} element - 要观察的元素
   */
  observe(element) {
    if (element && !this.observedElements.has(element)) {
      this.observer.observe(element);
      this.observedElements.add(element);
    }
  }

  /**
   * 批量观察多个元素
   * @param {NodeList|HTMLElement[]} elements - 要观察的元素集合
   */
  observeAll(elements) {
    if (elements && elements.length) {
      elements.forEach(element => this.observe(element));
    }
  }

  /**
   * 停止观察指定元素
   * @param {HTMLElement} element - 要停止观察的元素
   */
  unobserve(element) {
    if (element) {
      this.observer.unobserve(element);
      this.observedElements.delete(element);
    }
  }

  /**
   * 断开所有观察，清理资源
   */
  disconnect() {
    this.observer.disconnect();
    this.observedElements.clear();
  }

  /**
   * 静态方法：快速初始化并观察所有带有动画类的元素
   * @param {Object} options - 配置选项
   * @returns {ScrollObserver} 新创建的观察器实例
   */
  static initAuto(options = {}) {
    const observer = new ScrollObserver(options);

    // 自动观察所有带有 fade-in、slide-in-left、slide-in-right 类的元素
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .stagger-item'
    );
    observer.observeAll(animatedElements);

    return observer;
  }
}

// 导出模块（支持 ES6 模块和全局变量两种方式）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollObserver;
} else {
  window.ScrollObserver = ScrollObserver;
}
