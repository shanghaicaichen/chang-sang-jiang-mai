/* js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 导航栏滚动效果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
            // header.classList.remove('scrolled'); // 视需求可以保留或移除
        }
    });

    // 2. 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. 页面滚动不再需要单页的滚动高亮逻辑，因为已经是多页面架构了
    // 移除单页滚动监听，各页面的 active 类已经在 HTML 中静态指定。

    // 4. 脉息比计算器逻辑 (仅在理论体系页面生效)
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const hrInput = document.getElementById('heartRate').value;
            const rrInput = document.getElementById('respRate').value;
            const resultCard = document.getElementById('resultCard');
            const resultTitle = document.getElementById('resultTitle');
            const resultStat = document.getElementById('resultStat');
            const resultDesc = document.getElementById('resultDesc');

            const isEnglish = document.documentElement.lang === 'en';

            if (!hrInput || !rrInput || hrInput <= 0 || rrInput <= 0) {
                alert(isEnglish ? 'Please enter valid heart rate and respiratory rate!' : '请输入有效的心跳和呼吸次数！');
                return;
            }

            const hr = parseFloat(hrInput);
            const rr = parseFloat(rrInput);
            const ratio = (hr / rr).toFixed(2);

            // 移除旧的状态类
            resultCard.classList.remove('result-status-low', 'result-status-normal', 'result-status-high');
            
            // 默认显示结果卡片
            resultCard.classList.add('active');
            resultStat.textContent = isEnglish ? `Pulse Ratio: ${ratio}` : `脉息比：${ratio}`;

            // 根据脉息比判断体质状态
            if (ratio < 4) {
                resultCard.classList.add('result-status-low');
                if (isEnglish) {
                    resultTitle.innerHTML = `<i class="fas fa-snowflake"></i> <span>Qi Deficiency (Ratio < 4)</span>`;
                    resultDesc.innerHTML = `<strong>Diagnosis:</strong> Primarily deficiency and cold syndromes.<br><strong>Advice:</strong> Warm tonification. Moxibustion is suitable.`;
                } else {
                    resultTitle.innerHTML = `<i class="fas fa-snowflake"></i> <span>少气 (脉息比 < 4)</span>`;
                    resultDesc.innerHTML = `<strong>诊断：</strong>虚证、寒证为主。<br><strong>调理建议：</strong>宜温补。推荐使用小建中汤类方剂调理，外治适合使用艾灸温通经络。`;
                }
            } else if (ratio >= 4 && ratio <= 5) {
                resultCard.classList.add('result-status-normal');
                if (isEnglish) {
                    resultTitle.innerHTML = `<i class="fas fa-leaf"></i> <span>Balanced State (Ratio 4-5)</span>`;
                    resultDesc.innerHTML = `<strong>Diagnosis:</strong> Balanced or mixed deficiency-excess.<br><strong>Advice:</strong> Treat according to specific symptoms.`;
                } else {
                    resultTitle.innerHTML = `<i class="fas fa-leaf"></i> <span>平人 (脉息比 4～5)</span>`;
                    resultDesc.innerHTML = `<strong>诊断：</strong>平和状态或虚实夹杂。<br><strong>调理建议：</strong>可根据具体症状辨证论治。如有夹杂，可参考小建中汤合大柴胡汤加减。`;
                }
            } else {
                resultCard.classList.add('result-status-high');
                if (isEnglish) {
                    resultTitle.innerHTML = `<i class="fas fa-fire"></i> <span>Rapid Pulse (Ratio > 5)</span>`;
                    resultDesc.innerHTML = `<strong>Diagnosis:</strong> Primarily excess and heat syndromes.<br><strong>Advice:</strong> Clear heat. <strong>Moxibustion is contraindicated.</strong>`;
                } else {
                    resultTitle.innerHTML = `<i class="fas fa-fire"></i> <span>脉躁 (脉息比 > 5)</span>`;
                    resultDesc.innerHTML = `<strong>诊断：</strong>实证、热证为主。<br><strong>调理建议：</strong>宜清热泻实。推荐使用大柴胡汤类方剂调理。外治可选用针刺，<strong>不宜使用艾灸</strong>以免助热。`;
                }
            }
        });
    }
});
