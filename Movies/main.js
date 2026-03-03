const toggleBtn = document.querySelector('.bars')
const toggleBtnIcon = document.querySelector('.bars i')
const dropDownMenu = document.querySelector('.dropDownMenu')

toggleBtn.addEventListener('click', () =>{
    dropDownMenu.classList.toggle('open')
    isopen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isopen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'

})