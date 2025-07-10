// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// アクティブナビゲーション
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-right a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skills-card-inner, .products-card-inner').forEach(card => {
    observer.observe(card);
});

// プロダクトカードに個別の遅延を設定
document.querySelectorAll('.products-card-inner').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// 画像遅延読み込み
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ヘッダー背景変更とトップに戻るボタン
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('back-to-top');
    
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// トップに戻るボタンクリック
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// スキルバーアニメーション
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-bar');
            if (skillBar) {
                const level = skillBar.getAttribute('data-level');
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 200);
            }
            entry.target.classList.add('animate');
        } else {
            const skillBar = entry.target.querySelector('.skill-bar');
            if (skillBar) {
                skillBar.style.width = '0%';
            }
            entry.target.classList.remove('animate');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-card-inner').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    skillObserver.observe(card);
});

// タイピングエフェクト
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// タイトルのタイピングエフェクト
window.addEventListener('load', () => {
    const title = document.querySelector('.top-title');
    if (title) {
        typeWriter(title, 'My Portfolio', 150);
    }
});