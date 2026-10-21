# JumpEngine 开源许可证使用指南

## 许可证选择说明

本项目提供两种许可证选项，您可以根据需求选择使用：

### 1. MIT License（宽松许可证）

**特点：**
- 允许任何人自由使用、修改、分发代码
- 允许商业使用和闭源使用
- 唯一要求：保留版权声明和许可证文件
- 适合希望最大化传播和采用的项目

**适用场景：**
- 希望被广泛使用，包括商业用途
- 不介意别人基于您的代码开发闭源产品
- 想要最简单的许可证条款

### 2. GNU GPL v3（严格Copyleft许可证）

**特点：**
- 允许任何人自由使用、修改、分发代码
- 允许商业销售
- **关键要求**：如果分发修改后的版本，必须公开源代码
- **关键要求**：修改后的作品也必须使用GPL v3许可证
- 防止别人将您的代码用于闭源商业产品

**适用场景：**
- 希望确保所有改进都回馈给社区
- 不想让别人将您的代码用于闭源商业产品
- 想要保护用户的自由使用权利

## 如何应用许可证到您的产品

### 步骤一：选择许可证

决定每个产品使用哪种许可证：
- MIT License：更开放，适合工具类软件
- GPL v3：更严格，适合希望保持开源的项目

### 步骤二：在GitHub仓库中添加许可证文件

#### 如果使用MIT License：

1. 在每个产品仓库根目录创建 `LICENSE` 文件
2. 复制以下内容并修改年份和作者名：

```
MIT License

Copyright (c) 2026 JumpEngine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

#### 如果使用GPL v3：

1. 在每个产品仓库根目录创建 `LICENSE` 文件
2. 从本目录复制 `LICENSE-GPL-v3` 文件的完整内容
3. 在文件顶部添加以下声明：

```
Copyright (C) 2026 JumpEngine

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
```

### 步骤三：在README中声明许可证

在每个产品的 `README.md` 文件中添加许可证声明部分：

#### MIT License示例：

```markdown
## 许可证

本项目采用 MIT License 开源协议。

Copyright (c) 2026 JumpEngine

详见 LICENSE 文件。
```

#### GPL v3示例：

```markdown
## 许可证

本项目采用 GNU General Public License v3 (GPL-3.0) 开源协议。

Copyright (C) 2026 JumpEngine

这是一个自由软件：您可以根据自由软件基金会发布的GNU通用公共许可证第3版
或（根据您的选择）任何更高版本的条款来重新发布和/或修改它。

本软件的发布是希望它能发挥作用，但没有任何保证；甚至没有对适销性或
特定用途适用性的暗示保证。有关详细信息，请参阅GNU通用公共许可证。

您应该已经收到了一份GNU通用公共许可证的副本。如果没有，
请访问 <https://www.gnu.org/licenses/>。

详见 LICENSE 文件。
```

### 步骤四：在软件中添加版权声明

在每个Python源代码文件的开头添加：

#### MIT License：

```python
"""
JumpEngine Mathbox - 专业数学计算工具

Copyright (c) 2026 JumpEngine

This software is licensed under the MIT License.
See the LICENSE file for details.
"""
```

#### GPL v3：

```python
"""
JumpEngine Mathbox - 专业数学计算工具

Copyright (C) 2026 JumpEngine

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
"""
```

## 许可证对比总结

| 特性 | MIT License | GPL v3 |
|------|-------------|---------|
| 商业使用 | 允许 | 允许 |
| 修改代码 | 允许 | 允许 |
| 分发代码 | 允许 | 允许 |
| 私有使用 | 允许 | 允许 |
| 专利使用 | 允许 | 允许 |
| **闭源分发** | **允许** | **不允许** |
| **修改后必须开源** | **不要求** | **必须** |
| **相同许可证** | **不要求** | **必须使用GPL v3** |
| 保留版权和许可证声明 | 必须 | 必须 |
| 标注修改 | 不要求 | 建议 |
| 披露源代码 | 不要求 | 分发时必须 |

## 常见问题

### Q1: 别人可以卖我的软件吗？

**MIT License：** 可以，但他们必须保留您的版权声明和LICENSE文件。

**GPL v3：** 可以，但如果他们分发修改后的版本，必须公开源代码，并且也必须使用GPL v3许可证。

### Q2: 别人可以说软件是他们开发的吗？

**两种许可证都不允许完全声称是他们的：**
- 他们必须保留您的版权声明
- 如果他们修改了代码，应该标注"基于JumpEngine的XX软件修改"
- GPL v3还要求标注修改日期和修改内容

### Q3: 我想防止别人完全说是他们的，该选哪个？

**建议选择GPL v3**，因为：
1. 必须保留您的版权声明
2. 修改后的版本也必须开源
3. 不能使用其他许可证（防止通过改变许可证来规避）
4. 用户知道这是基于您的作品

### Q4: GPL v3是否阻止别人赚钱？

**不阻止**。GPL v3明确允许：
- 销售软件副本
- 收取服务费
- 商业使用

但是要求：
- 必须提供源代码
- 接收者也有同样的自由（可以再分发）

### Q5: 我应该为所有产品使用相同的许可证吗？

**建议：**
- 如果您希望保持一致性，所有产品使用相同许可证
- 如果不同产品有不同目标，可以分别选择
  - 工具类产品：MIT（最大化采用）
  - 核心平台类产品：GPL v3（保护生态）

## 推荐方案

基于您的需求（不希望别人完全声称是他们的），**推荐使用GPL v3许可证**。

**理由：**
1. 防止闭源商业化（别人不能拿了您的代码做闭源产品卖）
2. 强制开源回馈（别人的改进必须开源，您也能受益）
3. 保护品牌声誉（必须标注基于您的作品）
4. 仍然允许自由使用和分享

**下一步行动：**
1. 为每个产品仓库创建 `LICENSE` 文件（使用GPL v3）
2. 更新每个产品的 `README.md` 添加许可证声明
3. 在每个源代码文件添加GPL头部声明
4. 提交到GitHub

---

如需了解更多关于开源许可证的信息，请访问：
- GNU官方网站：https://www.gnu.org/licenses/gpl-3.0.html
- 选择许可证指南：https://choosealicense.com/
