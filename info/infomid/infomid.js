// Info Mid - 아코디언 인터랙션

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.infomid-item');
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // 모든 아이템 닫기
            items.forEach(otherItem => {
                otherItem.classList.remove('expanded');
                const icon = otherItem.querySelector('.infomid-item-icon');
                if (icon) {
                    icon.textContent = '+';
                }
            });
            
            // 클릭한 아이템이 닫혀있었다면 열기
            if (!isExpanded) {
                this.classList.add('expanded');
                const icon = this.querySelector('.infomid-item-icon');
                if (icon) {
                    icon.textContent = '+';
                }
            }
        });
    });
});
