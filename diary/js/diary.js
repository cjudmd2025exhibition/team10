// ============================================
// 달 위상 데이터
// ============================================
const moonPhases = [
    { name: '신월', image: '신월.webp' },
    { name: '초승달', image: '초승달.webp' },
    { name: '상현달', image: '상현달.webp' },
    { name: '상현망', image: '상현망.webp' },
    { name: '보름달', image: '보름달.webp' },
    { name: '하현망', image: '하현망.webp' },
    { name: '하현달', image: '하현달.webp' },
    { name: '그믐달', image: '그믐달.webp' }
];

// ============================================
// 날짜 및 달 위상 관리
// ============================================
let currentDate = new Date();
let currentMoonPhaseIndex = 4; // 초기값: 보름달

// 날짜를 한국어 형식으로 포맷
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

// 날짜에 따른 달 위상 계산 (간단한 버전 - 실제로는 천문학적 계산이 필요)
function getMoonPhaseByDate(date) {
    // 달의 주기는 약 29.5일
    const knownNewMoon = new Date('2025-01-01'); // 기준 신월 날짜
    const daysSinceNewMoon = Math.floor((date - knownNewMoon) / (1000 * 60 * 60 * 24));
    const phaseIndex = Math.floor((daysSinceNewMoon % 29.5) / 29.5 * 8) % 8;
    return phaseIndex;
}

// UI 업데이트
function updateDisplay() {
    const dateDisplay = document.getElementById('dateDisplay');
    const moonName = document.getElementById('moonName');
    const moonImage = document.getElementById('moonImage');
    
    if (dateDisplay) {
        dateDisplay.textContent = formatDate(currentDate);
    }
    
    currentMoonPhaseIndex = getMoonPhaseByDate(currentDate);
    const currentPhase = moonPhases[currentMoonPhaseIndex];
    
    if (moonName) {
        moonName.value = currentPhase.name;
    }
    
    if (moonImage) {
        moonImage.src = `../sub/img/${currentPhase.image}`;
        moonImage.alt = currentPhase.name;
    }
    
    // 저장된 데이터 불러오기
    loadDiaryEntry(currentDate);
}

// ============================================
// 날짜 네비게이션
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const prevDateBtn = document.getElementById('prevDate');
    const nextDateBtn = document.getElementById('nextDate');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // 이전 날짜
    if (prevDateBtn) {
        prevDateBtn.addEventListener('click', function() {
            currentDate.setDate(currentDate.getDate() - 1);
            updateDisplay();
        });
    }
    
    // 다음 날짜
    if (nextDateBtn) {
        nextDateBtn.addEventListener('click', function() {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDisplay();
        });
    }
    
    // 저장 버튼
    if (saveBtn) {
        saveBtn.addEventListener('click', saveDiaryEntry);
    }
    
    // 지우기 버튼
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const moonMemoInput = document.getElementById('moonMemo');
            if (moonMemoInput) {
                moonMemoInput.value = '';
            }
        });
    }
    
    // 초기 표시
    updateDisplay();
    
    // ============================================
    // 무한 스크롤 버튼 - 화면에서 보이지 않게 복제
    // ============================================
    const rows = document.querySelectorAll('.choice-buttons-row');
    
    rows.forEach((row, index) => {
        const track = row.querySelector('.choice-buttons-track');
        
        if (track) {
            // 복제 전 애니메이션 일시 정지 및 투명도 0
            track.style.opacity = '0';
            track.style.animationPlayState = 'paused';
            
            // 원본 버튼들을 복제하여 끊김 없는 루프 생성
            const buttons = track.innerHTML;
            track.innerHTML = buttons + buttons;
            
            // 각 행에 약간 다른 속도 설정
            if (index === 0) {
                track.style.animationDuration = '30s';
            } else {
                track.style.animationDuration = '35s';
            }
            
            // 짧은 지연 후 애니메이션 재개 및 표시
            setTimeout(() => {
                track.style.opacity = '1';
                track.style.animationPlayState = 'running';
            }, 100);
        }
    });
    
    // 선택 버튼 클릭 이벤트 - 클릭한 단어로만 표시 (추가하지 않음)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('choice-btn')) {
            const moonMemoInput = document.getElementById('moonMemo');
            if (moonMemoInput) {
                const selectedText = e.target.textContent.trim();
                // 입력 필드에 선택한 단어로 표시 (기존 내용 대체)
                moonMemoInput.value = selectedText;
            }
        }
    });

    // ============================================
    // 모바일: 메모 입력 클릭 시 단어 선택 Bottom Sheet 열기
    // ============================================
    const moonMemoInput = document.getElementById('moonMemo');
    const choiceSheetOverlay = document.querySelector('.choice-sheet-overlay');
    const choiceSheetClose = document.querySelector('.choice-sheet-close');

    const mobileQuery = window.matchMedia('(max-width: 768px)');

    // 모바일에서 기본적으로 페이지 스크롤 가능하도록 전역 overflow 설정 덮어쓰기
    if (mobileQuery.matches) {
        document.documentElement.style.height = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
    }

    // Bottom Sheet 활성화 시 스크롤 잠금에 사용할 현재 스크롤 위치 저장용
    let scrollPosition = 0;

    function openChoiceSheet() {
        // 뷰포트가 작을 때(모바일/태블릿)만 아래에서 중앙으로 올라오는 모달 열기
        if (!mobileQuery.matches) return;

        // 현재 스크롤 위치 저장 후 바디 스크롤 잠금
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';

        document.body.classList.add('choice-sheet-open');
    }

    function closeChoiceSheet() {
        // Bottom Sheet 상태 해제
        document.body.classList.remove('choice-sheet-open');

        // 바디 스크롤 잠금 해제 및 원래 위치로 복귀
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';

        if (scrollPosition) {
            window.scrollTo(0, scrollPosition);
        }
    }

    if (moonMemoInput && choiceSheetOverlay && choiceSheetClose) {
        moonMemoInput.addEventListener('click', openChoiceSheet);
        choiceSheetOverlay.addEventListener('click', closeChoiceSheet);
        choiceSheetClose.addEventListener('click', closeChoiceSheet);
    }

    // 화면 크기 변경 시 데스크톱으로 전환되면 시트 상태 초기화
    mobileQuery.addEventListener('change', (e) => {
        // 데스크톱으로 전환될 때는 Bottom Sheet와 스크롤 잠금 상태를 모두 초기화
        if (!e.matches) {
            closeChoiceSheet();
        } else {
            // 다시 모바일로 돌아오면 페이지 자체는 스크롤 가능하도록 유지
            document.documentElement.style.height = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.overflowY = 'auto';
            document.body.style.overflowY = 'auto';
        }
    });
});

// ============================================
// 일지 저장 및 불러오기
// ============================================
function getDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 사용자 정보 가져오기 (닉네임과 사용자 ID)
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

// 모든 일지 불러오기
function loadAllDiaries() {
    const diariesJson = localStorage.getItem('moon-diaries');
    if (!diariesJson) {
        return [];
    }
    
    try {
        return JSON.parse(diariesJson);
    } catch (e) {
        console.error('일지 데이터를 불러오는 중 오류 발생:', e);
        return [];
    }
}

// 일지 저장
function saveDiaryEntry() {
    const moonMemo = document.getElementById('moonMemo');
    
    if (!moonMemo || !moonMemo.value.trim()) {
        alert('달 관찰 내용을 입력해주세요!');
        return;
    }
    
    const userInfo = getUserInfo();
    const dateKey = getDateKey(currentDate);
    const timestamp = new Date().toISOString();
    
    const entry = {
        nickname: userInfo.nickname,
        userId: userInfo.userId,
        date: dateKey,
        moonPhase: moonPhases[currentMoonPhaseIndex].name,
        memo: moonMemo.value.trim(),
        timestamp: timestamp
    };
    
    // 모든 일지 불러오기
    const diaries = loadAllDiaries();
    
    // 새 일지 추가
    diaries.push(entry);
    
    // localStorage에 저장
    localStorage.setItem('moon-diaries', JSON.stringify(diaries));
    
    // 개별 키로도 저장 (현재 사용자의 날짜별 일지 불러오기용)
    const userDateKey = `moon-diary-${userInfo.userId}-${dateKey}`;
    localStorage.setItem(userDateKey, JSON.stringify(entry));
    
    alert('일지가 저장되었습니다! 🌙');
    
    // 저장 후 저장 페이지로 이동할지 물어보기
    if (confirm('저장된 일지 페이지로 이동하시겠습니까?')) {
        window.location.href = './diarysave/diarysave.html';
    }
}

// 일지 불러오기 (현재 사용자의 현재 날짜 일지)
function loadDiaryEntry(date) {
    const userInfo = getUserInfo();
    const dateKey = getDateKey(date);
    const userDateKey = `moon-diary-${userInfo.userId}-${dateKey}`;
    const savedEntry = localStorage.getItem(userDateKey);
    const moonMemo = document.getElementById('moonMemo');
    
    if (moonMemo) {
        if (savedEntry) {
            const entry = JSON.parse(savedEntry);
            moonMemo.value = entry.memo;
        } else {
            moonMemo.value = '';
        }
    }
}

