// 確保 DOM 完全載入後才執行內部所有邏輯，避免出現 null 錯誤
document.addEventListener('DOMContentLoaded', () => {

    // 預設美食清單
    const foods = [
        {
            name: "小吃店",
            image: "https://i.postimg.cc/J07MRsMK/image.png",
            map: "https://maps.app.goo.gl/9q1acRufffkEVGHL8"
        },
        {
            name: "日式炸豬排",
            image: "https://i.postimg.cc/rFFxPgX0/image.png",
            map: "https://maps.app.goo.gl/pY8jDyoQ4SdW1JdJA"
        },
        {
            name: "披薩",
            image: "https://i.postimg.cc/Fs8zVx9k/image.png",
            map: "https://maps.app.goo.gl/XiBCxxFucq8HpLBy6"
        },
        {
            name: "鬆餅冰淇淋",
            image: "https://i.postimg.cc/1RgfnTQ0/image.png",
            map: "https://maps.app.goo.gl/L3eHEHxf4DrAjsUJ6"
        },
        {
            name: "蒜蓉蝦",
            image: "https://i.postimg.cc/RCPL92Ty/image.png",
            map: "https://maps.app.goo.gl/wbTMdru4XhrjdXRU6"
        }
    ];

    let isSpinning = false;

    // DOM 元素取得
    const themeToggleBtn = document.getElementById('themeToggle');
    const drawBtn = document.getElementById('drawBtn');
    const viewMenuBtn = document.getElementById('viewMenuBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalBottomBtn = document.getElementById('closeModalBottomBtn');
    const menuModal = document.getElementById('menuModal');
    const welcomeState = document.getElementById('welcomeState');
    const resultState = document.getElementById('resultState');
    const foodTitle = document.getElementById('foodTitle');
    const foodImage = document.getElementById('foodImage');
    const mapBtn = document.getElementById('mapBtn');
    const drawBtnText = document.getElementById('drawBtnText');
    const rouletteOverlay = document.getElementById('rouletteOverlay');
    const menuGrid = document.getElementById('menuGrid');

    // 1. 暗黑模式切換
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }

    // 2. 抽籤功能 (輪盤切換動畫)
    function drawFood() {
        if (isSpinning) return;
        isSpinning = true;

        welcomeState.classList.add('hidden');
        resultState.classList.remove('hidden');
        rouletteOverlay.classList.remove('hidden');
        drawBtnText.textContent = "抽取中...";

        let counter = 0;
        const totalRounds = 15;
        const interval = setInterval(() => {
            const randomTemp = foods[Math.floor(Math.random() * foods.length)];
            foodTitle.textContent = randomTemp.name;
            foodImage.src = randomTemp.image;
            counter++;

            if (counter >= totalRounds) {
                clearInterval(interval);
                
                // 最終確定餐點
                const finalFood = foods[Math.floor(Math.random() * foods.length)];
                foodTitle.textContent = finalFood.name;
                foodImage.src = finalFood.image;
                mapBtn.href = finalFood.map;

                rouletteOverlay.classList.add('hidden');
                drawBtnText.textContent = "抽別的";
                isSpinning = false;

                // 慶祝紙花特效
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 60,
                        spread: 70,
                        origin: { y: 0.7 }
                    });
                }
            }
        }, 100);
    }

    // 3. 渲染菜單列表
    function renderMenuList() {
        if (!menuGrid) return;
        menuGrid.innerHTML = foods.map(food => `
            <div class="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <img src="${food.image}" alt="${food.name}" class="w-14 h-14 object-cover rounded-lg">
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-slate-800 dark:text-slate-100 truncate">${food.name}</h4>
                    <a href="${food.map}" target="_blank" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1 mt-0.5">
                        <i class="fa-solid fa-location-dot"></i> Maps
                    </a>
                </div>
            </div>
        `).join('');
    }

    // 4. 切換菜單彈窗
    function toggleMenuModal() {
        if (!menuModal) return;
        menuModal.classList.toggle('hidden');
        if (!menuModal.classList.contains('hidden')) {
            renderMenuList();
        }
    }

    // 綁定按鈕點擊事件
    if (drawBtn) drawBtn.addEventListener('click', drawFood);
    if (viewMenuBtn) viewMenuBtn.addEventListener('click', toggleMenuModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', toggleMenuModal);
    if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', toggleMenuModal);

});