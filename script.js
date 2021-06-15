const radios = document.querySelectorAll('input')
const body = document.querySelector('body')
const theme = window.getComputedStyle(body, "::before").content;


const handleThemeChange = (e) => {
    body.className = e.target.id;
}

radios.forEach(radio => radio.addEventListener('change', handleThemeChange))

window.onload = () => {
    
    if (theme === `"dark"`) {
        body.className = "themeThree"
        document.querySelector('#themeThree').checked = true;
        return
    }
    body.className = "themeTwo";
    document.querySelector("#themeTwo").checked = true;
}

