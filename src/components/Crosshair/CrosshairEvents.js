const onMouseEnter = () => {
    for (const cursor of [ '#crosshair-inner', '#crosshair-mid', '#crosshair-outer' ]) {
        const ele = document.querySelector(cursor)
        ele.classList.add('active')
    }
}

const onMouseLeave = () => {
    for (const cursor of [ '#crosshair-inner', '#crosshair-mid', '#crosshair-outer' ]) {
        const ele = document.querySelector(cursor)
        ele.classList.remove('active')
    }
}

export default { onMouseEnter, onMouseLeave }