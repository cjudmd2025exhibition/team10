// 랭킹 계산 함수
function calculateRanking(score) {
    // 전체 랭킹 계산
    const allTimeScores = JSON.parse(localStorage.getItem('allTimeScores') || '[]');
    // 현재 점수보다 높은 점수의 개수를 세어 랭킹 계산
    let totalRank = 1;
    allTimeScores.forEach(record => {
        if (record.score > score) {
            totalRank++;
        }
    });
    
    // 오늘의 랭킹 계산
    const today = new Date().toLocaleDateString('ko-KR');
    let todayScores = JSON.parse(localStorage.getItem('todayScores') || '{"date":"","scores":[]}');
    
    // 날짜가 바뀌면 초기화
    if (todayScores.date !== today) {
        todayScores = {
            date: today,
            scores: []
        };
        localStorage.setItem('todayScores', JSON.stringify(todayScores));
    }
    
    // 오늘의 랭킹 계산 (현재 점수보다 높은 점수의 개수)
    let todayRank = 1;
    todayScores.scores.forEach(record => {
        if (record.score > score) {
            todayRank++;
        }
    });
    
    return { totalRank, todayRank };
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로컬스토리지에서 점수 가져오기
    const quizScore = localStorage.getItem('quizScore');
    
    if (quizScore !== null) {
        const score = parseInt(quizScore);
        
        // 점수 표시
        document.querySelector('.stat-score .stat-value').textContent = score;
        
        // 랭킹 계산 및 표시
        const ranking = calculateRanking(score);
        document.querySelector('.stat-total-rank .stat-value').textContent = ranking.totalRank;
        document.querySelector('.stat-today-rank .stat-value').textContent = ranking.todayRank;
    } else {
        // 점수가 없으면 기본값 표시
        document.querySelector('.stat-score .stat-value').textContent = '0';
        document.querySelector('.stat-total-rank .stat-value').textContent = '-';
        document.querySelector('.stat-today-rank .stat-value').textContent = '-';
    }
    
    // 랭킹 확인하기 버튼 클릭 이벤트
    const rankingBtn = document.querySelector('.ranking-btn');
    if (rankingBtn) {
        rankingBtn.addEventListener('click', () => {
            // 점수 섹션으로 스크롤
            document.querySelector('.stats-container').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
    
    // 학습 카드 클릭 시 정보 페이지로 이동
    const studyCards = document.querySelectorAll('.study-card');
    studyCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // info.html 페이지로 이동
            window.location.href = '../../info/info.html';
        });
    });
    
    // 매일 자정에 오늘의 랭킹 초기화 체크
    checkAndResetTodayScores();
});

// 오늘의 랭킹 자정 초기화 체크
function checkAndResetTodayScores() {
    const today = new Date().toLocaleDateString('ko-KR');
    const todayScores = JSON.parse(localStorage.getItem('todayScores') || '{"date":"","scores":[]}');
    
    // 날짜가 바뀌면 초기화
    if (todayScores.date !== today && todayScores.date !== '') {
        localStorage.setItem('todayScores', JSON.stringify({
            date: today,
            scores: []
        }));
    }
}

