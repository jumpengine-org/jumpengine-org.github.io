/**
 * Counter - 数字递增动画模块
 * 实现从0到目标值的平滑递增动画效果
 * 使用 requestAnimationFrame 确保高性能和流畅度
 */

class Counter {
  /**
   * 构造函数
   * @param {HTMLElement} element - 显示数字的DOM元素
   * @param {number} target - 目标数值
   * @param {number} duration - 动画持续时间（毫秒），默认1500ms
   * @param {Object} options - 可选配置
   * @param {string} options.prefix - 数字前缀，默认为空
   * @param {string} options.suffix - 数字后缀，默认为空
   * @param {boolean} options.useLocaleString - 是否使用千分位分隔符，默认true
   */
  constructor(element, target, duration = 1500, options = {}) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.startTime = null;
    this.animationId = null;

    // 配置选项
    this.prefix = options.prefix || '';
    this.suffix = options.suffix || '';
    this.useLocaleString = options.useLocaleString !== false;

    // 检查是否支持减少动画偏好
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }

  /**
   * 启动计数器动画
   */
  start() {
    // 如果用户偏好减少动画，直接显示目标值
    if (this.prefersReducedMotion) {
      this._updateDisplay(this.target);
      return;
    }

    // 重置起始时间
    this.startTime = null;

    // 启动动画循环
    this.animationId = requestAnimationFrame(this._animate.bind(this));
  }

  /**
   * 停止动画
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * 动画帧回调函数
   * @param {number} currentTime - 当前时间戳（毫秒）
   */
  _animate(currentTime) {
    // 初始化起始时间
    if (!this.startTime) {
      this.startTime = currentTime;
    }

    // 计算进度（0到1之间）
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    // 使用缓动函数使动画更自然（ease-out）
    const easedProgress = this._easeOutQuad(progress);

    // 计算当前值
    const currentValue = Math.floor(easedProgress * this.target);

    // 更新显示
    this._updateDisplay(currentValue);

    // 如果动画未完成，继续下一帧
    if (progress < 1) {
      this.animationId = requestAnimationFrame(this._animate.bind(this));
    } else {
      // 确保最终显示准确的目标值
      this._updateDisplay(this.target);
      this.animationId = null;
    }
  }

  /**
   * 更新元素显示的数字
   * @param {number} value - 要显示的数值
   */
  _updateDisplay(value) {
    let displayValue = value;

    // 如果需要千分位分隔符
    if (this.useLocaleString) {
      displayValue = value.toLocaleString();
    }

    // 添加前缀和后缀
    this.element.textContent = `${this.prefix}${displayValue}${this.suffix}`;
  }

  /**
   * 缓动函数 - easeOutQuad
   * 使动画开始时较快，结束时逐渐减速
   * @param {number} t - 进度（0到1之间）
   * @returns {number} 缓动后的进度值
   */
  _easeOutQuad(t) {
    return t * (2 - t);
  }

  /**
   * 静态方法：快速创建并启动计数器
   * @param {HTMLElement|NodeList|string} elements - DOM元素、元素集合或CSS选择器
   * @param {number|number[]} targets - 目标值或目标值数组
   * @param {number} duration - 动画持续时间（毫秒）
   * @param {Object} options - 配置选项
   * @returns {Counter|Counter[]} 创建的计数器实例
   */
  static init(elements, targets, duration = 1500, options = {}) {
    // 如果传入的是CSS选择器字符串，获取对应的元素
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }

    // 如果是单个元素
    if (elements instanceof HTMLElement) {
      const target = typeof targets === 'number' ? targets : (targets[0] || 0);
      const counter = new Counter(elements, target, duration, options);
      counter.start();
      return counter;
    }

    // 如果是多个元素
    const counters = [];
    const elementArray = Array.from(elements);

    elementArray.forEach((element, index) => {
      const target = Array.isArray(targets)
        ? (targets[index] || 0)
        : (targets || 0);
      const counter = new Counter(element, target, duration, options);
      counter.start();
      counters.push(counter);
    });

    return counters;
  }

  /**
   * 静态方法：从data属性自动初始化计数器
   * 适用于带有 data-target 属性的元素
   * @param {string} selector - CSS选择器，默认为 '.counter'
   */
  static initFromData(selector = '.counter') {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      const target = parseInt(element.dataset.target, 10);
      const duration = parseInt(element.dataset.duration, 10) || 1500;
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';

      if (!isNaN(target)) {
        new Counter(element, target, duration, { prefix, suffix }).start();
      }
    });
  }
}

// 导出模块（支持 ES6 模块和全局变量两种方式）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Counter;
} else {
  window.Counter = Counter;
}
