# 全页滚动捕捉系统 - 更新文档

## 📅 更新日期
2025-11-05

## 🎯 核心功能
实现了专业的全页滚动捕捉系统，每次滚动直接跳转到下一个section，门自动打开。

---

## 📦 技术栈

| 功能 | 技术方案 |
|------|---------|
| **门动画** | GSAP Timeline (自动播放，延迟0.5秒) |
| **页面滚动** | useSmoothScroll Hook (GSAP控制) |
| **滚动捕捉** | 纯JS控制 (移除CSS scroll-snap避免冲突) |
| **内容动画** | Intersection Observer |
| **滚动速度** | 1秒 (power3.out 缓动函数) |
| **滚动条** | 完全隐藏 (所有浏览器) |
| **移动支持** | 触摸滑动事件 |

---

## 🔑 关键实现

### 1. 自定义滚动Hook (`src/hooks/useSmoothScroll.js`)

```javascript
import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useSmoothScroll = () => {
    useEffect(() => {
        const container = document.querySelector('.snap-container');
        if (!container) return;

        let isScrolling = false;
        let currentSection = 0;
        const sections = document.querySelectorAll('.snap-section');

        const scrollToSection = (index) => {
            if (index < 0 || index >= sections.length || isScrolling) return;
            
            isScrolling = true;
            currentSection = index;
            const targetPosition = index * window.innerHeight;
            
            gsap.to(container, {
                scrollTop: targetPosition,
                duration: 1,
                ease: 'power3.out',
                onComplete: () => {
                    isScrolling = false;
                }
            });
        };

        const handleWheel = (e) => {
            if (isScrolling) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const delta = e.deltaY;
            
            if (delta > 0) {
                scrollToSection(currentSection + 1);
            } else if (delta < 0) {
                scrollToSection(currentSection - 1);
            }
        };

        // 触摸支持
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    scrollToSection(currentSection + 1);
                } else {
                    scrollToSection(currentSection - 1);
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
};
```

### 2. 全局CSS配置 (`app/globals.css`)

```css
body {
  margin: 0;
  padding: 0;
  overflow: auto;
}

/* 滚动容器 - 移除CSS scroll-snap，完全由JS控制 */
.snap-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.snap-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.snap-section {
  min-height: 100vh;
  height: 100vh;
  position: relative;
}
```

### 3. 主页面配置 (`app/page.js`)

```javascript
'use client';

import React from 'react';
import HeroSection from '../src/components/sections/HeroSection';
import AboutSection from '../src/components/sections/AboutSection';
import ValuesSection from '../src/components/sections/ValuesSection';
import MenuSelectionSection from '../src/components/sections/MenuSelectionSection';
import MapSection from '../src/components/sections/MapSection';
import { useSmoothScroll } from '../src/hooks/useSmoothScroll';

export default function Home() {
  useSmoothScroll();

  return (
    <div className="snap-container">
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <MenuSelectionSection />
      <MapSection />
    </div>
  );
}
```

### 4. Section配置（以AboutSection为例）

```javascript
// 移除 ScrollTrigger，改用 Intersection Observer

useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(aboutContainerRef.current, {
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    const section = document.querySelector('.about-section');
    if (section) {
        observer.observe(section);
    }

    return () => {
        if (section) {
            observer.unobserve(section);
        }
    };
}, []);
```

---

## ⚠️ 关键注意事项

### 1. **不要使用CSS scroll-snap**
❌ 会与GSAP动画产生冲突，导致滚动不流畅

### 2. **不要使用ScrollTrigger**
❌ 在scroll-snap环境下不可靠，改用Intersection Observer

### 3. **移除scroll-behavior: smooth**
❌ 会与GSAP的scrollTop动画冲突

### 4. **缓动函数选择**
✅ 使用 `power3.out` 而不是 `power2.inOut`
- power3.out 模拟真实物理减速，更自然流畅

### 5. **速度设置**
```javascript
duration: 1  // 1秒配合power3.out最佳
// 可选范围：0.8-1.2秒
```

---

## 📁 修改的文件清单

1. ✅ `app/page.js` - 添加 'use client' 和 useSmoothScroll
2. ✅ `app/globals.css` - 配置滚动容器和隐藏滚动条
3. ✅ `src/hooks/useSmoothScroll.js` - **新建** 滚动控制Hook
4. ✅ `src/components/sections/HeroSection/HeroSection.jsx` - 门自动打开
5. ✅ `src/components/sections/AboutSection/AboutSection.jsx` - 改用Intersection Observer
6. ✅ `src/components/sections/ValuesSection/ValuesSection.jsx` - 添加snap-section
7. ✅ `src/components/sections/MenuSelectionSection/MenuSelectionSection.jsx` - 改用Intersection Observer
8. ✅ `src/components/sections/MapSection/MapSection.jsx` - 改用Intersection Observer

---

## 🎨 参考网站

参考了 [Kunzz Holdings](https://kunzzgroup.com/frontend/index.php) 的实现：
- 使用 Swiper.js (我们使用GSAP)
- 滚动速度：800ms (我们使用1000ms配合power3.out)
- 垂直方向滚动
- 平滑的slide切换效果

---

## 🚀 最终效果

✅ 滚动一次直接跳到下一个section  
✅ 门在页面加载0.5秒后自动打开（1.5秒动画）  
✅ 滚动条完全隐藏  
✅ 所有section内容正常显示  
✅ 丝滑流畅的滚动动画  
✅ 支持移动设备触摸滑动  
✅ 代码简洁，无冲突  

---

## 💡 调试技巧

如果滚动不流畅：
1. 检查是否有CSS scroll-snap冲突
2. 检查是否有scroll-behavior: smooth
3. 确认GSAP动画的ease函数
4. 查看浏览器控制台是否有错误

如果元素不显示：
1. 确认使用了Intersection Observer
2. 检查threshold设置（建议0.3）
3. 查看元素的初始opacity设置

---

## 📚 依赖包

```json
{
  "dependencies": {
    "gsap": "^3.x.x",
    "next": "14.x.x",
    "react": "^18.x.x"
  }
}
```

**注意**：不需要 `gsap/ScrollTrigger` 插件！

---

## 🔄 如何在其他项目应用

1. 复制 `src/hooks/useSmoothScroll.js` 文件
2. 在 `app/globals.css` 添加相应CSS
3. 在主页面添加 `'use client'` 和使用 `useSmoothScroll()`
4. 给每个全屏section添加 `snap-section` 类
5. 将ScrollTrigger改为Intersection Observer
6. 测试并根据需要调整速度和缓动函数

---

生成日期：2025-11-05  
作者：AI Assistant  
版本：1.0

