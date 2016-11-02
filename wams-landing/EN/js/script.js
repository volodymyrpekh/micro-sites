function toggle() {
    var mydiv = document.getElementById('modal');
    if (mydiv.style.display === 'block' || mydiv.style.display === '')
        mydiv.style.display = 'none';
    else
        mydiv.style.display = 'block'
}
