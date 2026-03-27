document.addEventListener('DOMContentLoaded', () => {
    // スクロールアニメーション (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // 少しスクロールしてから表示
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // 一度表示されたら監視を終了
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // アコーディオン (FAQ)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            // 他の開いているアイテムを閉じる（オプション機能）
            // const activeItem = document.querySelector('.accordion-item.active');
            // if(activeItem && activeItem !== item) {
            //     activeItem.classList.remove('active');
            //     activeItem.querySelector('.accordion-content').style.maxHeight = null;
            // }

            // 現在のアイテムの開閉
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // スムーススクロール (アンカーリンク)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーの高さを考慮
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ヘッダーのスクロール影付け
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // メッセージの「続きを読む」機能
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            document.querySelector('.message-collapsed-content').classList.add('open');
            readMoreBtn.classList.add('hidden');
        });
    }

    // 口コミ画像のアコーディオン機能
    const reviewBtn = document.querySelector('.review-read-more-btn');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', () => {
            const content = document.querySelector('.review-collapsed-content');
            if(content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                reviewBtn.innerHTML = '閉じる 🔼';
            } else {
                content.style.display = 'none';
                reviewBtn.innerHTML = 'すべてのお客様の声を見る 🔽';
            }
        });
    }
});
