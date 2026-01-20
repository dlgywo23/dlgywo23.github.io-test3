document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const techGrid = document.getElementById('techGrid');
    const searchInput = document.getElementById('searchInput');
    const companyModal = document.getElementById('companyModal');
    const closeModal = document.getElementById('closeModal');
    const companyList = document.getElementById('companyList');
    const modalTitle = document.getElementById('modalTitle');

    // State
    let allCompanyData = [];

    // Tech Content Data
    const techContent = [
        {
            id: 'manufacturing',
            title: '제조기술 (Manufacturing)',
            theme: 'orange',
            icon: 'fa-industry',
            concept: '재료를 가공하여 유용한 제품을 만드는 과정',
            practice: {
                title: '카프라 구조물 & 스테인 도색',
                video: 'https://youtu.be/t0yI4BjVVUA'
            },
            safety: '공구 사용 시 보호장갑 착용 필수, 환기가 잘 되는 곳에서 도색 작업 진행.',
            advanced: ['스마트 팩토리', '3D 프린팅', '로봇 자동화'],
            keyword: '제조기술'
        },
        {
            id: 'construction',
            title: '건설기술 (Construction)',
            theme: 'yellow',
            icon: 'fa-hard-hat',
            concept: '쾌적하고 안전한 생활 공간을 만드는 기술',
            practice: {
                title: '종이 기둥 하중 실험',
                video: 'https://youtu.be/xG9aN7_CbX4'
            },
            safety: '실습 재료 절단 시 손 조심, 무거운 물체 낙하 주의.',
            advanced: ['모듈러 주택', '스마트 시티', 'BIM 설계'],
            keyword: '건설기술'
        },
        {
            id: 'transportation',
            title: '수송기술 (Transportation)',
            theme: 'blue',
            icon: 'fa-plane',
            concept: '사람이나 물건을 효율적으로 이동시키는 기술',
            practice: {
                title: '에그카(Egg Car) 충격 완화 설계',
                video: 'https://youtu.be/c0bfmj6pRNA'
            },
            safety: '주행 실험 시 주변 안전 거리 확보, 날카로운 부품 마감 처리.',
            advanced: ['전기차 배터리', 'UAM(도심 항공)', '자율주행'],
            keyword: '수송기술'
        },
        {
            id: 'communication',
            title: '통신기술 (Communication)',
            theme: 'purple',
            icon: 'fa-wifi',
            concept: '정보를 빠르고 정확하게 전달하는 기술',
            practice: {
                title: 'NFC 태그 & 스마트 제어',
                video: 'https://youtu.be/_gTVdQeCZw0'
            },
            safety: '전자기기 사용 시 올바른 자세 유지, 개인정보 보호 유의.',
            advanced: ['5G/6G 네트워크', '양자 암호', 'IoT'],
            keyword: '통신기술'
        },
        {
            id: 'bio',
            title: '생물기술 (Bio-technology)',
            theme: 'green',
            icon: 'fa-dna',
            concept: '생명체의 기능을 활용하여 유용한 물질 생산',
            practice: {
                title: '발효, DNA, 복제양 돌리의 역사',
                video: 'https://youtu.be/RrpqdPiCRm4'
            },
            safety: '시약 사용 시 보호안경 착용, 실험 후 철저한 세정.',
            advanced: ['CRISPR 유전자 가위', '맞춤형 의료', '바이오 연료'],
            keyword: '생명기술' // Note: JSON might use '생명기술' or '생물기술', need to check
        }
    ];

    // Initialize
    init();

    async function init() {
        try {
            const res = await fetch('technology_data.json');
            if (res.ok) {
                allCompanyData = await res.json();
            } else {
                console.warn('JSON data not found.');
            }
        } catch (e) {
            console.error('Failed to fetch JSON:', e);
        }

        renderCards(techContent);
        setupEventListeners();
    }

    // Render Tech Cards
    function renderCards(data) {
        techGrid.innerHTML = data.map(item => `
            <div class="tech-card card-${item.id}">
                <div class="card-header">
                    <span class="card-theme-title">${item.id.toUpperCase()}</span>
                    <h3 class="card-title"><i class="fas ${item.icon}"></i> ${item.title.split('(')[0]}</h3>
                </div>
                <div class="card-body">
                    <div class="concept-box">
                        <strong><i class="fas fa-lightbulb"></i> 개념:</strong> ${item.concept}
                    </div>
                    
                    <div class="practice-section">
                        <div class="section-label">실습 & 영상</div>
                        <a href="${item.practice.video}" target="_blank" class="video-link">
                            <i class="fab fa-youtube"></i> ${item.practice.title}
                        </a>
                        <div class="safety-note">
                            <strong><i class="fas fa-triangle-exclamation"></i> Safety First:</strong>
                            ${item.safety}
                        </div>
                    </div>

                    <div class="future-box">
                        <div class="section-label">심화 & 미래 전망</div>
                        <div>
                            ${item.advanced.map(tag => `<span class="badge">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-match" onclick="openCompanyModal('${item.keyword}')">
                        <i class="fas fa-search"></i> 관련 기업 & 기술 확인
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Modal Logic
    window.openCompanyModal = (keyword) => {
        // Filter data based on keyword
        // The JSON keys are "기술분야", "기업명", "주요 사업 및 수행 업무"
        const filtered = allCompanyData.filter(c => c['기술분야'].includes(keyword));

        modalTitle.textContent = `${keyword} 관련 대표 기업`;

        if (filtered.length === 0) {
            companyList.innerHTML = '<p style="text-align:center; padding: 2rem;">데이터를 불러오는 중이거나 결과가 없습니다.</p>';
        } else {
            companyList.innerHTML = filtered.map(c => `
                <div class="company-item">
                    <div class="comp-name">${c['기업명']}</div>
                    <div class="comp-desc">${c['주요 사업 및 수행 업무']}</div>
                </div>
            `).join('');
        }

        companyModal.classList.add('active');
    };

    // Close Modal
    closeModal.addEventListener('click', () => {
        companyModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === companyModal) {
            companyModal.classList.remove('active');
        }
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        // We can either filter cards or show a global search result. 
        // Given the requirement "Search and Filter ... output interactive list", 
        // adapting the grid to show relevant fields seems appropriate.
        // Or simply checking if the term matches any content in the card.

        const filteredCards = techContent.filter(item => {
            const combinedText = (item.title + item.concept + item.advanced.join(' ')).toLowerCase();
            return combinedText.includes(term);
        });

        renderCards(filteredCards);
    });
});
