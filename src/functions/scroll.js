//enable scroll
export function enableScroll() {
    if (document.querySelector(".page-scroll .simplebar-content-wrapper")) {
        document.querySelector(".page-scroll .simplebar-content-wrapper").classList.remove("noscroll")
    }
}
//disable scroll
export function disableScroll() {
    if (document.querySelector(".page-scroll .simplebar-content-wrapper")) {
        document.querySelector(".page-scroll .simplebar-content-wrapper").classList.add("noscroll")
    }
}

//return scroll Position
export const scrollPos = () => {
    if (document.querySelector('.page-scroll .simplebar-content-wrapper')) {
        return document.querySelector('.page-scroll .simplebar-content-wrapper').scrollTop
    } else {
        return window.pageYOffset || document.documentElement.scrollTop
    }
   
}
//return modal scroll Position
export const modalScrollPos = () => {
    if (document.querySelector('.modal__overlay .simplebar-content-wrapper')) {
        return document.querySelector('.modal__overlay .simplebar-content-wrapper').scrollTop
    } else if (document.querySelector('.modal__overlay')) {
        return document.querySelector('.modal__overlay').scrollTop
    } else {
        return 0
    }
}