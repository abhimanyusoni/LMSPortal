/* Course-menu-toggler-js */

$('.course-menu-toggler').click(function () {
    $(this).siblings('.course-inside-menu').toggleClass('opened');
    $('.course-inside-menu').removeClass('opened');
})

$(document).mouseup(function (e) {
    var container = $(".course-inside-menu");
    var toggler = $(".course-menu-toggler");

    // if the target of the click isn't the container nor a descendant of the container
    if ((!container.is(e.target) && container.has(e.target).length === 0) && (!toggler.is(e.target) && toggler.has(e.target).length === 0)) {
        container.removeClass('opened');
    }
});

/* Leftpanel mobile toggler js */

$('.main-menu-handler').click(function () {
    $('.dashboard-main-wrapper .left-panel').toggleClass('showed');
    $(this).children('span').toggleClass('close')
})

/* Calendar js */

let pastDates = true, availableDates = false, availableWeekDays = false

let calendar = new VanillaCalendar({
    selector: "#myCalendar",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    shortWeekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    onSelect: (data, elem) => {
        console.log(data, elem)
    }
})

let btnPastDates = document.querySelector('[name=pastDates]')
btnPastDates.addEventListener('click', () => {
    pastDates = !pastDates
    calendar.set({ pastDates: pastDates })
    btnPastDates.innerText = `${(pastDates ? 'Disable' : 'Enable')} past dates`
})

let btnAvailableDates = document.querySelector('[name=availableDates]')
btnAvailableDates.addEventListener('click', () => {
    availableDates = !availableDates
    btnAvailableDates.innerText = `${(availableDates ? 'Clear available dates' : 'Set available dates')}`
    if (!availableDates) {
        calendar.set({ availableDates: [], datesFilter: false })
        return
    }
    let dates = () => {
        let result = []
        for (let i = 1; i < 15; ++i) {
            if (i % 2) continue
            let date = new Date(new Date().getTime() + (60 * 60 * 24 * 1000) * i)
            result.push({ date: `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}` })
        }
        return result
    }
    calendar.set({ availableDates: dates(), availableWeekDays: [], datesFilter: true })
})

let btnAvailableWeekDays = document.querySelector('[name=availableWeekDays]')
btnAvailableWeekDays.addEventListener('click', () => {
    availableWeekDays = !availableWeekDays
    btnAvailableWeekDays.innerText = `${(availableWeekDays ? 'Clear available weekdays' : 'Set available weekdays')}`
    if (!availableWeekDays) {
        calendar.set({ availableWeekDays: [], datesFilter: false })
        return
    }
    let days = [{
        day: 'monday'
    }, {
        day: 'tuesday'
    }, {
        day: 'wednesday'
    }, {
        day: 'friday'
    }]
    calendar.set({ availableWeekDays: days, availableDates: [], datesFilter: true })
})
