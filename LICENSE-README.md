# JumpEngine 许可证使用指南（已定稿：GPL-3.0）

> 2026-10-21 决定：全部项目统一采用 **GNU GPL v3**。原 MIT/GPL 双选项文档作废。

## 一、定稿内容

- 适用范围：jumpengine.org 网站及全部产品（Mathbox、PinyinBox、Photo Converter、Video Converter、Translator、Games）
- 协议：GNU General Public License v3（GPL-3.0）
- 版权：Copyright (C) 2026 jumpengine-org
- 协议全文：本仓库 `LICENSE-GPL-v3`（协议正文不可修改）

## 二、每个项目的 README 许可证声明模板

```
## 许可证

本项目采用 GNU General Public License v3 (GPL-3.0) 开源协议。
Copyright (C) 2026 jumpengine-org

这是一个自由软件：您可以根据自由软件基金会发布的 GNU 通用公共许可证第 3 版
或（根据您的选择）任何更高版本的条款来重新发布和/或修改它。
本软件的发布是希望它能发挥作用，但没有任何保证；甚至没有对适销性或
特定用途适用性的暗示保证。有关详细信息，请参阅 GNU 通用公共许可证。
详见 LICENSE 文件（GPL v3 全文）。
```

## 三、每个 Python 源码文件头部模板（可选，逐步补全）

```python
"""
jumpengine <产品名> - <一句话描述>

Copyright (C) 2026 jumpengine-org

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
"""
```

## 四、GPL v3 对你意味着什么（要点）

- 任何人可以：自由使用、修改、分发、商用、售卖副本、收取服务费
- 任何人**不可以**：把你的代码改改闭源卖（分发修改版必须公开源码）
- 分发修改版必须：附带源码 + 同样使用 GPL-3.0 + 保留版权声明

## 五、常见问题

**Q: 别人能卖我的软件吗？**
A: 能。但若修改后分发，必须公开修改后的全部源码并继续使用 GPL-3.0。

**Q: 别人能闭源白嫖吗？**
A: 不能。闭源分发 GPL 代码属于违反协议。

**Q: 我自己的后续版本必须继续 GPL 吗？**
A: 你作为版权所有人可以选择变更，但已按 GPL 发出的版本，接收者仍保有 GPL 赋予的权利。