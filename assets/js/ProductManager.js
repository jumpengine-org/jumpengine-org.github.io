/**
 * ProductManager - 产品管理模块
 * 负责加载、管理和渲染产品信息
 */

class ProductManager {
  constructor() {
    this.products = [];
    this.dataLoaded = false;
    this.basePath = this._detectBasePath();
  }

  /**
   * 检测当前页面相对于项目根目录的路径层级
   * 返回适当的基础路径前缀
   */
  _detectBasePath() {
    const path = window.location.pathname;

    // 检查是否在版本下载页面 (如 /product-1/v1.0.0/download.html)
    if (path.match(/\/[^\/]+\/v[\d\.]+\/download\.html$/)) {
      return '../..';
    }

    // 检查是否在版本页面 (如 /product-1/v1.0.0/index.html)
    if (path.match(/\/[^\/]+\/v[\d\.]+/)) {
      return '../..';
    }

    // 检查是否在產品详情页 (如 /product-1/index.html 或 /product-1/)
    if (path.match(/\/product-[\d]+/)) {
      return '..';
    }

    // 其他情况（根目录页面）
    return '.';
  }

  /**
   * 加载产品数据
   * @returns {Promise<void>}
   */
  async loadProducts() {
    if (this.dataLoaded) {
      return;
    }

    try {
      const response = await fetch(`${this.basePath}/assets/data/products.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.products = data.products;
      this.dataLoaded = true;
      console.log('ProductManager: 成功加载', this.products.length, '个产品');
    } catch (error) {
      console.error('ProductManager: 加载产品数据失败', error);
      // 降级方案：使用空数组，避免页面崩溃
      this.products = [];
      this.dataLoaded = true;
    }
  }

  /**
   * 根据ID获取单个产品
   * @param {string} id - 产品ID
   * @returns {Object|null} 产品对象或null
   */
  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  /**
   * 获取招牌产品（featured: true）
   * @param {number} limit - 返回数量限制，默认2
   * @returns {Array} 招牌产品数组
   */
  getFeaturedProducts(limit = 2) {
    return this.products.filter(p => p.featured).slice(0, limit);
  }

  /**
   * 获取所有产品
   * @returns {Array} 所有产品数组
   */
  getAllProducts() {
    return this.products;
  }

  /**
   * 按分类获取产品
   * @param {string} category - 分类名称
   * @returns {Array} 该分类下的产品数组
   */
  getProductsByCategory(category) {
    return this.products.filter(p => p.categories.includes(category));
  }

  /**
   * 生成SEO meta标签HTML字符串
   * @param {Object} product - 产品对象
   * @returns {string} meta标签HTML
   */
  generateMetaTags(product) {
    const keywords = product.keywords.join(', ');
    return `
    <meta name="keywords" content="${keywords}">
    <meta name="description" content="${product.description}">
    <meta property="og:title" content="${product.name}">
    <meta property="og:description" content="${product.description}">
    <meta property="og:type" content="website">
    `;
  }

  /**
   * 渲染产品卡片HTML（用于产品列表页）
   * @param {Object} product - 产品对象
   * @param {number} delay - 动画延迟毫秒数
   * @returns {string} HTML字符串
   */
  renderProductCard(product, delay = 0) {
    const shortDesc = product.description.length > 60
      ? product.description.substring(0, 60) + '...'
      : product.description;

    return `
      <div class="stagger-item p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300" style="--delay: ${delay}ms;">
        <div class="icon-placeholder ${product.iconGradient} mb-4">${product.shortName.charAt(0)}</div>
        <h4 class="text-lg font-semibold text-gray-900 mb-2">${product.name}</h4>
        <p class="text-sm text-gray-600 mb-4">${shortDesc}</p>
        <a href="${this.basePath}/${product.id}/" class="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center group">
          了解详情
          <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    `;
  }

  /**
   * 渲染招牌产品卡片HTML（用于主页）
   * @param {Object} product - 产品对象
   * @param {number} index - 索引位置
   * @returns {string} HTML字符串
   */
  renderFeaturedCard(product, index) {
    return `
      <div class="card p-8 stagger-item" style="--delay: ${index * 100}ms;">
        <div class="flex items-start gap-6">
          <div class="icon-placeholder ${product.iconGradient} w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
            ${product.shortName.charAt(0)}
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.featuredDescription}</p>
            <div class="flex gap-3">
              <a href="${this.basePath}/${product.id}/" class="btn btn-primary">了解详情</a>
              <a href="${this.basePath}/download.html#${product.id}" class="btn btn-outline">立即下载</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 渲染功能特性网格HTML
   * @param {Array} features - 特性数组
   * @returns {string} HTML字符串
   */
  renderFeaturesGrid(features) {
    return features.map((feature, index) => `
      <div class="card p-6 stagger-item" style="--delay: ${index * 100}ms;">
        <div class="feature-icon ${feature.iconGradient || 'icon-gradient-1'} mb-4 text-4xl">
          ${feature.icon}
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${feature.title}</h3>
        <p class="text-gray-600">${feature.description}</p>
      </div>
    `).join('');
  }

  /**
   * 渲染功能模块网格HTML
   * @param {Array} modules - 模块数组
   * @returns {string} HTML字符串
   */
  renderModulesGrid(modules) {
    return modules.map((module, index) => `
      <div class="module-card stagger-item" style="--delay: ${index * 100}ms;">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">${module.name}</h3>
        <ul class="space-y-2">
          ${module.items.map(item => `
            <li class="text-sm text-gray-600 flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              ${item}
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  /**
   * 渲染下载区域HTML
   * @param {Object} version - 版本对象
   * @param {string} productId - 产品ID
   * @returns {string} HTML字符串
   */
  renderDownloadSection(version, productId) {
    const downloads = version.downloads;

    return `
      <div class="card p-8 fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">最新版本 v${version.version}</h3>
            <p class="text-gray-600">发布日期：${version.releaseDate} | 文件大小：${version.fileSize}</p>
          </div>
          <span class="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">稳定版</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${downloads.windows.installer ? `
            <a href="${downloads.windows.installer.url}" class="btn btn-primary flex items-center justify-center gap-2 py-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <div class="text-left">
                <div class="font-semibold">Windows 安装包</div>
                <div class="text-sm opacity-90">推荐 · 自动安装</div>
              </div>
            </a>
          ` : ''}

          ${downloads.windows.portable ? `
            <a href="${downloads.windows.portable.url}" class="btn btn-outline flex items-center justify-center gap-2 py-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <div class="text-left">
                <div class="font-semibold">Windows 便携版</div>
                <div class="text-sm opacity-90">无需安装 · 即开即用</div>
              </div>
            </a>
          ` : ''}
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>系统要求：</strong>Windows 10 或更高版本，64位操作系统
          </p>
        </div>
      </div>
    `;
  }

  /**
   * 渲染版本历史时间线HTML
   * @param {Array} versions - 版本数组
   * @param {string} productId - 产品ID
   * @returns {string} HTML字符串
   */
  renderVersionTimeline(versions, productId) {
    return versions.map((version, index) => `
      <div class="timeline-item fade-in" style="--delay: ${index * 150}ms;">
        <div class="flex items-baseline gap-4 mb-2">
          <h3 class="text-lg font-semibold text-gray-900">v${version.version}</h3>
          <span class="text-sm text-gray-500">${version.releaseDate}</span>
        </div>
        <p class="text-gray-600">${version.changelog}</p>
        <a href="${this.basePath}/${productId}/v${version.version}/download.html" class="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
          查看该版本下载选项 &rarr;
        </a>
      </div>
    `).join('');
  }

  /**
   * 渲染版本选择列表HTML（用于版本页面）
   * @param {Array} versions - 版本数组
   * @param {string} currentVersion - 当前版本号
   * @param {string} productId - 产品ID
   * @returns {string} HTML字符串
   */
  renderOtherVersions(versions, currentVersion, productId) {
    const otherVersions = versions.filter(v => v.version !== currentVersion);

    if (otherVersions.length === 0) {
      return '<p class="text-gray-600 text-center">暂无其他版本</p>';
    }

    return otherVersions.map(version => `
      <div class="card p-6 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">v${version.version}</h3>
            <p class="text-sm text-gray-600">${version.releaseDate}</p>
          </div>
          <a href="${this.basePath}/${productId}/v${version.version}/download.html" class="btn btn-outline text-sm">
            查看下载
          </a>
        </div>
      </div>
    `).join('');
  }
}

// 创建全局实例
const productManager = new ProductManager();
