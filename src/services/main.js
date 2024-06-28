export const initTracker = () => {
    if (localStorage.getItem('tracker')) {
        return JSON.parse(localStorage.getItem('tracker'));
    }

    let tracker = [];

    localStorage.setItem('tracker', JSON.stringify(tracker));

    return tracker;
}

export const convertSecondsToDate = (seconds) => {
    let date = new Date(seconds);

    const monthNames = ["Jan", "Feb", "march", "Apr", "may", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = date.getUTCDate();
    let month = monthNames[date.getUTCMonth()];
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');

    let formattedDate = `${day} ${month} - ${formattedHours}:${formattedMinutes}`;

    return formattedDate;
}

export const themeToggler = () => {
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    let themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    let themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function() {

        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
        
    });
}