// Info page card interaction
// 데스크톱: 호버 시 카드 뒷면 노출 + 한 번 클릭 시 바로 이동
// 태블릿/모바일(좁은 화면): 첫 클릭 시 카드 뒤집기, 두 번째 클릭 시 페이지 이동

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');

    if (!cards.length) return;

    // 현재 레이아웃이 태블릿/모바일용인지 여부 (viewport 기준)
    const isTouchLayout = () => window.matchMedia('(max-width: 1200px)').matches;

    cards.forEach((card) => {
        const target = card.dataset.target;
        if (!target) return;

        card.addEventListener('click', (e) => {
            // 자식 요소에서의 클릭도 카드 기준으로 처리
            e.preventDefault();

            // 데스크톱 레이아웃: 기존처럼 바로 이동
            if (!isTouchLayout()) {
                window.location.href = target;
                return;
            }

            // 태블릿/모바일 레이아웃:
            // 1) 아직 뒤집히지 않았다면 -> 다른 카드들을 초기화하고 이 카드만 뒤집기
            if (!card.classList.contains('flipped')) {
                // 이미 뒤집혀 있는 다른 카드들은 모두 앞면으로 복귀
                document
                    .querySelectorAll('.info-card.flipped')
                    .forEach((otherCard) => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('flipped');
                        }
                    });

                card.classList.add('flipped');
                return;
            }

            // 2) 이미 뒤집힌 상태에서 한 번 더 클릭 -> 페이지 이동
            window.location.href = target;
        });
    });

    // 화면 크기가 다시 커져서 데스크톱 레이아웃이 되면 flipped 상태 초기화
    const handleResize = () => {
        if (!isTouchLayout()) {
            document
                .querySelectorAll('.info-card.flipped')
                .forEach((card) => card.classList.remove('flipped'));
        }
    };

    window.addEventListener('resize', handleResize);
});


