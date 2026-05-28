/**
 * JumpEngine Website - Main JavaScript
 * 主入口文件，负责初始化和协调各模块
 */

// ========================================
// 页面加载完成后初始化
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
  // 初始化导航栏控制器
  initNavController();

  // 初始化滚动观察器
  initScrollObserver();

  // 高亮当前页面导航链接
  highlightCurrentPage();

  // 初始化移动端菜单（如果存在）
  initMobileMenu();

  // 初始化右侧快捷浮层（如果存在）
  initQuickActions();

  // 初始化产品管理并渲染内容
  await initProductManager();
});

// ========================================
// 导航栏控制器初始化
// ========================================
function initNavController() {
  const navbar = document.getElementById('navbar');

  if (navbar && typeof NavController !== 'undefined') {
    // 创建导航栏控制器实例
    window.navController = new NavController(navbar, {
      scrollThreshold: 100,
      enableHideShow: true
    });
  }
}

// ========================================
// 滚动观察器初始化
// ========================================
function initScrollObserver() {
  if (typeof ScrollObserver !== 'undefined') {
    // 使用自动初始化方法，观察所有带有动画类的元素
    window.scrollObserver = ScrollObserver.initAuto({
      threshold: 0.1
    });
  } else {
    // 如果模块未加载，使用简化的回退方案
    fallbackScrollAnimation();
  }
}

/**
 * 回退方案：简单的滚动动画
 * 当ScrollObserver模块不可用时使用
 */
function fallbackScrollAnimation() {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right'
  );

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// 高亮当前页面导航链接
// ========================================
function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPath) {
      link.classList.add('text-blue-600', 'font-semibold');
      link.classList.remove('text-gray-600');

      // 添加下划线指示器
      const indicator = link.querySelector('span');
      if (indicator) {
        indicator.classList.add('w-full');
        indicator.classList.remove('w-0');
      }
    }
  });
}

// ========================================
// 移动端菜单初始化
// ========================================
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // 切换汉堡图标状态
      const bars = menuToggle.querySelectorAll('span');
      if (bars.length >= 3) {
        // 这里可以添加图标动画逻辑
      }
    });

    // 点击菜单外部关闭菜单
    document.addEventListener('click', event => {
      if (
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        !mobileMenu.classList.contains('hidden')
      ) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

// ========================================
// 右侧快捷浮层初始化
// ========================================
function initQuickActions() {
  const quickActions = document.getElementById('quick-actions');

  if (quickActions) {
    // 返回顶部按钮功能
    const backToTopBtn = quickActions.querySelector('[data-action="back-to-top"]');

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 在线咨询按钮（可扩展）
    const consultBtn = quickActions.querySelector('[data-action="consult"]');
    if (consultBtn) {
      consultBtn.addEventListener('click', () => {
        // 可以打开咨询对话框或跳转到联系页面
        window.location.href = 'about.html#contact';
      });
    }

    // 意见反馈按钮（可扩展）
    const feedbackBtn = quickActions.querySelector('[data-action="feedback"]');
    if (feedbackBtn) {
      feedbackBtn.addEventListener('click', () => {
        // 可以打开反馈表单
        alert('意见反馈功能即将上线');
      });
    }
  }
}

// ========================================
// 工具函数
// ========================================

/**
 * 平滑滚动到指定元素
 * @param {string} selector - CSS选择器
 */
function smoothScrollTo(selector) {
  const element = document.querySelector(selector);

  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait = 300) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit = 200) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// ========================================
// 产品管理初始化
// ========================================
async function initProductManager() {
  // 检查 ProductManager 是否可用
  if (typeof productManager === 'undefined') {
    console.warn('ProductManager not available');
    return;
  }

  // 加载产品数据
  await productManager.loadProducts();

  // 根据当前页面类型渲染相应内容
  const path = window.location.pathname;

  // 主页：渲染招牌产品
  if (path.match(/index\.html$/) || path === '/' || path === '') {
    renderFeaturedProductsOnHomepage();
  }

  // 产品列表页：渲染所有产品
  if (path.match(/products\.html$/)) {
    renderAllProductsOnListPage();
  }
}

/**
 * 在主页渲染招牌产品
 */
function renderFeaturedProductsOnHomepage() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  const featuredProducts = productManager.getFeaturedProducts(2);

  if (featuredProducts.length === 0) {
    container.innerHTML = '<p class="text-gray-600 text-center">暂无产品展示</p>';
    return;
  }

  container.innerHTML = featuredProducts.map((product, index) =>
    productManager.renderFeaturedCard(product, index)
  ).join('');

  // 重新初始化滚动观察器
  if (typeof scrollObserver !== 'undefined' && scrollObserver.observeAll) {
    scrollObserver.observeAll(container.querySelectorAll('.stagger-item'));
  }
}

/**
 * 在产品列表页渲染所有产品
 */
function renderAllProductsOnListPage() {
  const container = document.getElementById('products-container');
  if (!container) return;

  const allProducts = productManager.getAllProducts();

  if (allProducts.length === 0) {
    container.innerHTML = '<p class="text-gray-600 text-center">暂无产品</p>';
    return;
  }

  // 按分类组织产品
  const categories = {
    'category-1': { title: '第一类', description: '这里是第一类产品的占位描述文案', products: [] },
    'category-2': { title: '第二类', description: '这里是第二类产品的占位描述文案', products: [] },
    'category-3': { title: '第三类', description: '这里是第三类产品的占位描述文案', products: [] }
  };

  // 将产品分配到对应分类
  allProducts.forEach(product => {
    product.categories.forEach(cat => {
      if (categories[cat]) {
        categories[cat].products.push(product);
      }
    });
  });

  // 渲染每个分类
  let html = '';
  let categoryIndex = 0;

  Object.entries(categories).forEach(([key, category]) => {
    if (category.products.length === 0) return;

    html += `
      <div class="fade-in" style="--delay: ${categoryIndex * 150}ms;">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${category.title}</h2>
          <p class="text-gray-600">${category.description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${category.products.map((product, index) =>
            productManager.renderProductCard(product, (index + 1) * 100)
          ).join('')}
        </div>
      </div>
    `;

    categoryIndex++;
  });

  container.innerHTML = html;

  // 重新初始化滚动观察器
  if (typeof scrollObserver !== 'undefined' && scrollObserver.observeAll) {
    scrollObserver.observeAll(container.querySelectorAll('.stagger-item, .fade-in'));
  }
}

// ========================================
// 导出全局可用的函数
// ========================================
window.smoothScrollTo = smoothScrollTo;
window.debounce = debounce;
window.throttle = throttle;
window.renderFeaturedProductsOnHomepage = renderFeaturedProductsOnHomepage;
window.renderAllProductsOnListPage = renderAllProductsOnListPage;
