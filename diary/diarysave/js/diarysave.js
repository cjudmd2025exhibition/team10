// ============================================
// 저장된 일지 관리 및 표시
// ============================================

// 모든 일지 불러오기
function loadAllDiaries() {
    const diariesJson = localStorage.getItem('moon-diaries');
    if (!diariesJson) {
        return [];
    }
    
    try {
        const diaries = JSON.parse(diariesJson);
        // timestamp 기준으로 최신순 정렬
        return diaries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
        console.error('일지 데이터를 불러오는 중 오류 발생:', e);
        return [];
    }
}

// 닉네임과 사용자 ID 생성 (없으면)
function getUserInfo() {
    let userNickname = localStorage.getItem('userNickname');
    let userId = localStorage.getItem('userId');
    
    // 사용자 ID가 없으면 6자리 랜덤 숫자 생성
    if (!userId) {
        userId = String(Math.floor(Math.random() * 900000) + 100000);
        localStorage.setItem('userId', userId);
    }
    
    // 닉네임이 없으면 기본값 사용
    if (!userNickname) {
        userNickname = '익명';
    }
    
    return {
        nickname: userNickname,
        userId: userId
    };
}

// 날짜를 포맷 (년월일)
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

// 시간을 포맷 (시:분)
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 날짜와 시간을 함께 포맷
function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

// 좌측 목록에 일지 항목 표시
function renderDiaryList() {
    const diaryList = document.getElementById('diaryList');
    const diaryCount = document.getElementById('diaryCount');
    const diaries = loadAllDiaries();
    
    if (!diaryList) return;
    
    // 개수 업데이트
    if (diaryCount) {
        diaryCount.textContent = `${diaries.length}개`;
    }
    
    // 일지가 없으면 메시지 표시
    if (diaries.length === 0) {
        diaryList.innerHTML = `
            <div class="no-diary-message">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>저장된 관찰 일지가 없습니다</p>
            </div>
        `;
        return;
    }
    
    // 일지 목록 생성
    diaryList.innerHTML = diaries.map((diary, index) => `
        <div class="diary-item" data-index="${index}" onclick="selectDiary(${index})">
            <div class="diary-item-user">${diary.nickname}#${diary.userId}</div>
            <div class="diary-item-date">${formatDateTime(diary.timestamp)}</div>
            <div class="diary-item-moon">${diary.moonPhase}</div>
        </div>
    `).join('');
}

// 일지 선택 시 우측에 내용 표시
function selectDiary(index) {
    const diaries = loadAllDiaries();
    const diary = diaries[index];
    
    if (!diary) return;
    
    // 모든 항목의 active 클래스 제거
    document.querySelectorAll('.diary-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 선택한 항목에 active 클래스 추가
    const selectedItem = document.querySelector(`[data-index="${index}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
    
    // 우측에 내용 표시
    const diaryContent = document.getElementById('diaryContent');
    if (!diaryContent) return;
    
    // 달 이미지 경로 생성
    const moonImagePath = getMoonImagePath(diary.moonPhase);
    
    diaryContent.innerHTML = `
        <div class="diary-display-container">
            <!-- 달 이미지 -->
            <div class="diary-moon-image-container">
                <img src="../../sub/img/${moonImagePath}" alt="${diary.moonPhase}" class="diary-moon-image">
            </div>
            
            <!-- 일지 정보 카드 -->
            <div class="diary-display-card">
                <!-- 날짜 표시 -->
                <div class="diary-display-date">
                    <p class="diary-display-date-text">${formatDate(diary.date)}</p>
                </div>
                
                <!-- 사용자 정보 -->
                <div class="diary-display-row">
                    <div class="diary-display-label">작성자</div>
                    <div class="diary-display-value">${diary.nickname}#${diary.userId}</div>
                </div>
                
                <!-- 작성 시간 -->
                <div class="diary-display-row">
                    <div class="diary-display-label">작성 시간</div>
                    <div class="diary-display-value">${formatTime(diary.timestamp)}</div>
                </div>
                
                <!-- 달 이름 -->
                <div class="diary-display-row">
                    <div class="diary-display-label">달 이름</div>
                    <div class="diary-display-value">${diary.moonPhase}</div>
                </div>
                
                <!-- 달 관찰 메모 -->
                <div class="diary-display-row">
                    <div class="diary-display-label">오늘 달은 마치</div>
                    <div class="diary-display-memo-wrapper">
                        <div class="diary-display-memo">${diary.memo}</div>
                        <span class="diary-display-memo-suffix">같아!</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 달 위상에 따른 이미지 파일명 반환
function getMoonImagePath(moonPhase) {
    const moonPhaseMap = {
        '신월': '신월.webp',
        '초승달': '초승달.webp',
        '상현달': '상현달.webp',
        '상현망': '상현망.webp',
        '보름달': '보름달.webp',
        '하현망': '하현망.webp',
        '하현달': '하현달.webp',
        '그믐달': '그믐달.webp'
    };
    
    return moonPhaseMap[moonPhase] || '보름달.webp';
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    renderDiaryList();
});

