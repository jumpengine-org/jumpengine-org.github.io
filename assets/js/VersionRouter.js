/**
 * VersionRouter - 版本路由模块
 * 负责解析URL路径，提取产品ID和版本号，构建页面链接
 */

class VersionRouter {
  constructor() {
    this.currentPath = window.location.pathname;
  }

  /**
   * 解析当前URL路径，提取产品ID和版本号
   * @returns {Object|null} 包含productId和version的对象，或null
   */
  parseCurrentPath() {
    // 匹配模式: /{productId}/v{version}.html
    const versionMatch = this.currentPath.match(/\/([^\/]+)\/v([\d\.]+)\.html$/);
    if (versionMatch) {
      return {
        productId: versionMatch[1],
        version: versionMatch[2],
        type: 'version'
      };
    }

    // 匹配模式: /{productId}/v{version}/download.html
    const downloadMatch = this.currentPath.match(/\/([^\/]+)\/v([\d\.]+)\/download\.html$/);
    if (downloadMatch) {
      return {
        productId: downloadMatch[1],
        version: downloadMatch[2],
        type: 'download'
      };
    }

    // 匹配模式: /products/{productId}.html
    const productMatch = this.currentPath.match(/\/products\/([^\/]+)\.html$/);
    if (productMatch) {
      return {
        productId: productMatch[1],
        type: 'product'
      };
    }

    return null;
  }

  /**
   * 验证产品是否存在
   * @param {string} productId - 产品ID
   * @param {ProductManager} productManager - 产品管理器实例
   * @returns {boolean}
   */
  validateProduct(productId, productManager) {
    return productManager.getProductById(productId) !== null;
  }

  /**
   * 验证版本是否存在
   * @param {string} productId - 产品ID
   * @param {string} version - 版本号
   * @param {ProductManager} productManager - 产品管理器实例
   * @returns {boolean}
   */
  validateVersion(productId, version, productManager) {
    const product = productManager.getProductById(productId);
    if (!product) return false;

    return product.versions.some(v => v.version === version);
  }

  /**
   * 获取产品的最新版本号
   * @param {string} productId - 产品ID
   * @param {ProductManager} productManager - 产品管理器实例
   * @returns {string|null} 最新版本号或null
   */
  getLatestVersion(productId, productManager) {
    const product = productManager.getProductById(productId);
    if (!product || !product.versions || product.versions.length === 0) {
      return null;
    }
    return product.versions[0].version;
  }

  /**
   * 构建版本页面URL
   * @param {string} productId - 产品ID
   * @param {string} version - 版本号
   * @returns {string} 版本页面URL
   */
  buildVersionUrl(productId, version) {
    return `/${productId}/v${version}.html`;
  }

  /**
   * 构建下载页面URL
   * @param {string} productId - 产品ID
   * @param {string} version - 版本号
   * @returns {string} 下载页面URL
   */
  buildDownloadUrl(productId, version) {
    return `/${productId}/v${version}/download.html`;
  }

  /**
   * 构建产品详情页URL
   * @param {string} productId - 产品ID
   * @returns {string} 产品详情页URL
   */
  buildProductUrl(productId) {
    return `/products/${productId}.html`;
  }

  /**
   * 重定向到指定URL
   * @param {string} url - 目标URL
   */
  redirectTo(url) {
    window.location.href = url;
  }

  /**
   * 如果产品不存在，重定向到产品列表页
   * @param {string} productId - 产品ID
   * @param {ProductManager} productManager - 产品管理器实例
   */
  redirectIfProductNotFound(productId, productManager) {
    if (!this.validateProduct(productId, productManager)) {
      console.warn(`产品 "${productId}" 不存在，重定向到产品列表页`);
      this.redirectTo('/products.html');
      return true;
    }
    return false;
  }

  /**
   * 如果版本不存在，重定向到最新版本页
   * @param {string} productId - 产品ID
   * @param {string} version - 请求的版本号
   * @param {ProductManager} productManager - 产品管理器实例
   */
  redirectIfVersionNotFound(productId, version, productManager) {
    if (!this.validateVersion(productId, version, productManager)) {
      const latestVersion = this.getLatestVersion(productId, productManager);
      if (latestVersion) {
        console.warn(`版本 "${version}" 不存在，重定向到最新版本 "${latestVersion}"`);
        this.redirectTo(this.buildVersionUrl(productId, latestVersion));
      } else {
        console.warn(`产品 "${productId}" 没有可用版本，重定向到产品列表页`);
        this.redirectTo('/products.html');
      }
      return true;
    }
    return false;
  }
}

// 创建全局实例
const versionRouter = new VersionRouter();
