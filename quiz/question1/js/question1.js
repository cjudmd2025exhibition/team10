// 퀴즈 문제 데이터
const oxQuestions = [
    {
        question: "달은 스스로 빛을 낸다.",
        answer: false,
        type: "OX"
    },
    {
        question: "달의 모양 변화는 달이 지구 주위를 도는 동안 태양빛이 비치는 각도가 달라서 생긴다.",
        answer: true,
        type: "OX"
    },
    {
        question: "보름달은 달이 지구와 태양 사이에 있을 때 보인다.",
        answer: false,
        type: "OX"
    },
    {
        question: "초승달은 달의 일부분만 보이는 상태이다.",
        answer: true,
        type: "OX"
    },
    {
        question: "달의 표면에는 대기가 거의 없다.",
        answer: true,
        type: "OX"
    },
    {
        question: "달의 자전 주기와 공전 주기는 동일하다.",
        answer: true,
        type: "OX"
    },
    {
        question: "우리가 항상 달의 같은 면을 보는 이유는 달이 지구의 중력에 묶여 있기 때문이다.",
        answer: true,
        type: "OX"
    },
    {
        question: "달에는 날씨 변화(비, 바람)가 있다.",
        answer: false,
        type: "OX"
    },
    {
        question: "지구의 조수간만(밀물·썰물) 현상은 달과 태양의 영향으로 생긴다.",
        answer: true,
        type: "OX"
    },
    {
        question: "달의 둘레는 지구의 둘레보다 크다.",
        answer: false,
        type: "OX"
    }
];

const easyQuestions = [
    {
        question: "초승달은 어느 시기에 볼 수 있는가?",
        options: [
            "밤늦게만 보인다",
            "해 뜨기 직전에 보인다",
            "해지고 얼마 안 된 저녁에 보인다",
            "한밤중에만 보인다"
        ],
        answer: 2,
        type: "4choice",
        difficulty: "easy"
    },
    {
        question: "달의 뒷면을 관찰할 수 있는 방법은?",
        options: [
            "지구에서 망원경으로 볼 수 있다",
            "달이 빠르게 회전할 때 보인다",
            "우주선이나 인공위성 촬영으로 볼 수 있다",
            "보름달 때만 보인다"
        ],
        answer: 2,
        type: "4choice",
        difficulty: "easy"
    },
    {
        question: "다음 중 달의 위상 변화 순서로 맞는 것은?",
        options: [
            "보름달 → 상현달 → 그믐달",
            "초승달 → 상현달 → 보름달",
            "그믐달 → 초승달 → 상현달",
            "상현달 → 초승달 → 보름달"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "easy"
    },
    {
        question: "달의 크기와 가장 가까운 비교는?",
        options: [
            "지구보다 훨씬 크다",
            "지구의 1/4 정도 크기",
            "지구와 거의 비슷하다",
            "지구보다 약간 크다"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "easy"
    },
    {
        question: "달이 지구에서 보여지는 최대 크기 변화를 설명하는 원인은?",
        options: [
            "지구의 자전 변화",
            "달의 타원형 공전 궤도",
            "태양의 온도 변화",
            "지구 대기의 굴절"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "easy"
    }
];

const mediumQuestions = [
    {
        question: "달에서 낮과 밤의 길이가 긴 이유는?",
        options: [
            "달이 자전하지 않아서",
            "달의 자전 속도가 매우 느려서",
            "태양빛이 달에 닿지 않아서",
            "달의 공전 속도가 빠르기 때문"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "medium"
    },
    {
        question: "일식·월식이 매달 일어나지 않는 이유는?",
        options: [
            "달이 구름에 가려지기 때문",
            "달의 공전 궤도가 지구의 공전면과 기울어져 있기 때문",
            "태양빛이 항상 일정하지 않기 때문",
            "보름달과 그믐달이 규칙적이지 않기 때문"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "medium"
    },
    {
        question: "아래 중 달의 중력이 지구 중력보다 약하기 때문에 나타나는 현상은?",
        options: [
            "달에서 자유낙하 속도가 지구보다 빠르다",
            "달에서 물체를 던지면 곧 떨어진다",
            "달에서는 점프하면 더 높이 뛸 수 있다",
            "달에서 공기가 더 무겁다"
        ],
        answer: 2,
        type: "4choice",
        difficulty: "medium"
    }
];

const hardQuestions = [
    {
        question: "달의 위상이 다시 초기 상태(예: 초승달)로 돌아오기까지 걸리는 시간을 무엇이라고 하는가?",
        options: [
            "항성월",
            "태음월",
            "이심월",
            "회합주기"
        ],
        answer: 1,
        type: "4choice",
        difficulty: "hard"
    },
    {
        question: "달의 중력 때문에 지구의 자전 속도가 아주 느리게 감소하며, 하루 길이가 길어지는 현상을 무엇이라고 하는가?",
        options: [
            "조석 감속",
            "대기 마찰",
            "공전 공명",
            "중력 동기화"
        ],
        answer: 0,
        type: "4choice",
        difficulty: "hard"
    }
];

// 퀴즈 상태 변수
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// 퀴즈 문제 랜덤 선택 함수 (순서대로 출제)
function selectRandomQuestions() {
    const selected = [];
    
    // 1. OX 문제 5개 랜덤 선택
    const shuffledOX = [...oxQuestions].sort(() => Math.random() - 0.5);
    selected.push(...shuffledOX.slice(0, 5));
    
    // 2. 쉬운 문제 3개 랜덤 선택
    const shuffledEasy = [...easyQuestions].sort(() => Math.random() - 0.5);
    selected.push(...shuffledEasy.slice(0, 3));
    
    // 3. 중간/어려운 문제 선택 로직
    const mediumOrHard = Math.random() < 0.5; // 50% 확률로 결정
    
    if (mediumOrHard) {
        // 중간 2개
        const shuffledMedium = [...mediumQuestions].sort(() => Math.random() - 0.5);
        selected.push(...shuffledMedium.slice(0, 2));
    } else {
        // 중간 1개, 어려운 1개
        const shuffledMedium = [...mediumQuestions].sort(() => Math.random() - 0.5);
        const shuffledHard = [...hardQuestions].sort(() => Math.random() - 0.5);
        selected.push(shuffledMedium[0]);
        selected.push(shuffledHard[0]);
    }
    
    // 순서대로 출제 (섞지 않음)
    return selected;
}

// 페이지 로드 시 퀴즈 시작
document.addEventListener('DOMContentLoaded', () => {
    selectedQuestions = selectRandomQuestions();
    loadQuestion();
    updateProgressBar();
});

// 진행 게이지 업데이트 함수
function updateProgressBar() {
    const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
}

// 문제 로드 함수
function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const answerOptionsElement = document.getElementById('answerOptions');
    const nextBtn = document.getElementById('nextBtn');
    
    // 문제 번호 업데이트
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // 문제 표시
    questionElement.textContent = question.question;
    
    // 답변 옵션 초기화
    answerOptionsElement.innerHTML = '';
    nextBtn.disabled = true;
    
    if (question.type === 'OX') {
        // OX 문제
        const options = ['O', 'X'];
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.onclick = () => checkOXAnswer(index === 0, question.answer);
            answerOptionsElement.appendChild(button);
        });
    } else {
        // 4지선다 문제
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            button.onclick = () => checkAnswer(index, question.answer);
            answerOptionsElement.appendChild(button);
        });
    }
}

// OX 답안 체크 함수
function checkOXAnswer(userAnswer, correctAnswer) {
    const buttons = document.querySelectorAll('.answer-btn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 모든 버튼 비활성화
    buttons.forEach(btn => btn.disabled = true);
    
    if (userAnswer === correctAnswer) {
        // 정답
        buttons[userAnswer ? 0 : 1].classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
    } else {
        // 오답
        buttons[userAnswer ? 0 : 1].classList.add('wrong');
        buttons[correctAnswer ? 0 : 1].classList.add('correct');
    }
    
    nextBtn.disabled = false;
}

// 4지선다 답안 체크 함수
function checkAnswer(userAnswer, correctAnswer) {
    const buttons = document.querySelectorAll('.answer-btn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 모든 버튼 비활성화
    buttons.forEach(btn => btn.disabled = true);
    
    if (userAnswer === correctAnswer) {
        // 정답
        buttons[userAnswer].classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
    } else {
        // 오답
        buttons[userAnswer].classList.add('wrong');
        buttons[correctAnswer].classList.add('correct');
    }
    
    nextBtn.disabled = false;
}

// 다음 문제 버튼 이벤트
document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestionIndex++;
    updateProgressBar();
    
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// 결과 화면 표시
function showResult() {
    document.querySelector('.quiz-content').style.display = 'none';
    document.getElementById('resultScreen').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
    
    // 로컬스토리지에 점수 영구 저장
    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizDate', new Date().toISOString());
    
    // 전체 랭킹 기록 업데이트 (최고 점수 기록)
    const allTimeScores = JSON.parse(localStorage.getItem('allTimeScores') || '[]');
    allTimeScores.push({
        score: score,
        date: new Date().toISOString()
    });
    // 최근 100개만 유지
    if (allTimeScores.length > 100) {
        allTimeScores.shift();
    }
    localStorage.setItem('allTimeScores', JSON.stringify(allTimeScores));
    
    // 오늘의 랭킹 기록 업데이트
    const today = new Date().toLocaleDateString('ko-KR');
    const todayScores = JSON.parse(localStorage.getItem('todayScores') || '{"date":"","scores":[]}');
    
    // 날짜가 바뀌면 초기화
    if (todayScores.date !== today) {
        todayScores.date = today;
        todayScores.scores = [];
    }
    
    todayScores.scores.push({
        score: score,
        time: new Date().toISOString()
    });
    localStorage.setItem('todayScores', JSON.stringify(todayScores));
    
    const resultMessage = document.getElementById('resultMessage');
    let message = '';
    
    if (score === 10) {
        message = '완벽합니다! 달 박사님이시네요!';
    } else if (score >= 8) {
        message = '훌륭해요! 달에 대해 많이 알고 계시네요!';
    } else if (score >= 6) {
        message = '잘했어요! 조금만 더 공부하면 완벽해질 거예요!';
    } else if (score >= 4) {
        message = '좋은 시작이에요! 다시 한번 도전해보세요!';
    } else {
        message = '포기하지 마세요! 다시 공부하고 도전해봐요!';
    }
    
    resultMessage.textContent = message;
}
