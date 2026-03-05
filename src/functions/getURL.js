export const getImageURL = (path) => {
    if (path.webp && document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0) {
        return path.webp
    } else {
        return path.url
    }
}
export const getVideoURL = (path) => {
    return path.url
}
