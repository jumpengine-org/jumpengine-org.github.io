/**
 * NavController - 导航栏控制器模块
 * 实现智能导航栏行为：滚动隐藏/显示、背景切换
 * 使用 requestAnimationFrame 优化性能，避免滚动卡顿
 */

class NavController {
  /**
   * 构造函数
   * @param {HTMLElement} navbar - 导航栏DOM元素
   * @param {Object} options - 配置选项
   * @param {number} options.scrollThreshold - 触发背景变化的滚动阈值（像素），默认100
   * @param {boolean} options.enableHideShow - 是否启用滚动隐藏/显示功能，默认true
   * @param {string} options.hiddenClass - 隐藏状态的CSS类名，默认 '-translate-y-full'
   * @param {string} options.scrolledClass - 滚动后的CSS类名，默认 'scrolled'
   */
  constructor(navbar, options = {}) {
    this.navbar = navbar;

    if (!this.navbar) {
      console.warn('NavController: 未找到导航栏元素');
      return;
    }

    // 配置选项
    this.options = {
      scrollThreshold: 100,
      enableHideShow: true,
      hiddenClass: '-translate-y-full',
      scrolledClass: 'scrolled',
      ...options
    };

    // 状态变量
    this.lastScrollY = window.scrollY;
    this.ticking = false;
    this.isHidden = false;

    // 检查用户是否偏好减少动画
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 初始化
    this.init();
  }

  /**
   * 初始化导航栏控制器
   */
  init() {
    // 如果用户偏好减少动画，禁用滚动隐藏功能
    if (this.prefersReducedMotion) {
      this.options.enableHideShow = false;
    }

    // 绑定滚动事件监听器
    window.addEventListener('scroll', this._onScroll.bind(this), {
      passive: true // 标记为被动监听，提升滚动性能
    });

    // 初始化时检查当前滚动位置
    this._updateNavbarState();
  }

  /**
   * 滚动事件处理函数（使用节流优化）
   */
  _onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this._handleScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   * 处理滚动逻辑
   */
  _handleScroll() {
    const currentScrollY = window.scrollY;

    // 更新导航栏状态（背景切换）
    this._updateNavbarState();

    // 如果启用了隐藏/显示功能
    if (this.options.enableHideShow) {
      this._handleHideShow(currentScrollY);
    }

    // 更新上次滚动位置
    this.lastScrollY = currentScrollY;
  }

  /**
   * 更新导航栏状态（背景、阴影等）
   */
  _updateNavbarState() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.options.scrollThreshold) {
      // 滚动超过阈值，添加scrolled类
      this.navbar.classList.add(this.options.scrolledClass);
    } else {
      // 滚动在阈值内，移除scrolled类
      this.navbar.classList.remove(this.options.scrolledClass);
    }
  }

  /**
   * 处理导航栏隐藏/显示逻辑
   * @param {number} currentScrollY - 当前滚动位置
   */
  _handleHideShow(currentScrollY) {
    // 向下滚动且超过阈值时隐藏
    if (
      currentScrollY > this.lastScrollY &&
      currentScrollY > this.options.scrollThreshold
    ) {
      this._hide();
    }
    // 向上滚动时显示
    else if (currentScrollY < this.lastScrollY) {
      this._show();
    }
  }

  /**
   * 隐藏导航栏
   */
  _hide() {
    if (!this.isHidden) {
      this.navbar.classList.add(this.options.hiddenClass);
      this.isHidden = true;
    }
  }

  /**
   * 显示导航栏
   */
  _show() {
    if (this.isHidden) {
      this.navbar.classList.remove(this.options.hiddenClass);
      this.isHidden = false;
    }
  }

  /**
   * 强制显示导航栏（用于鼠标接近顶部等场景）
   */
  forceShow() {
    this._show();
  }

  /**
   * 强制隐藏导航栏
   */
  forceHide() {
    this._hide();
  }

  /**
   * 销毁控制器，清理事件监听器
   */
  destroy() {
    window.removeEventListener('scroll', this._onScroll.bind(this));
    this.ticking = false;
  }

  /**
   * 静态方法：快速初始化导航栏控制器
   * @param {string} selector - 导航栏元素的CSS选择器，默认 '#navbar'
   * @param {Object} options - 配置选项
   * @returns {NavController|null} 创建的控制器实例
   */
  static init(selector = '#navbar', options = {}) {
    const navbar = document.querySelector(selector);

    if (navbar) {
      return new NavController(navbar, options);
    }

    console.warn(`NavController: 未找到选择器 "${selector}" 对应的元素`);
    return null;
  }
}

// 导出模块（支持 ES6 模块和全局变量两种方式）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavController;
} else {
  window.NavController = NavController;
}
