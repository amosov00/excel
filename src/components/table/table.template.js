const CODES = {
    A: 65,
    Z: 90,
}

function createCell(col, row) {
    return `<div 
              class="cell" 
              contenteditable 
              data-col="${String.fromCharCode(CODES.A + col)}" 
            > 
            </div>`
}

function createCol(col) {
    return `
        <div class="column" data-col="${col}">
            ${col}
            <div 
                class="col-resize" 
                data-resize="col" 
                data-resizer-for-col="${col}"
            >
            </div>
        </div>
    `
}
function createRow(index, content) {
    // eslint-disable-next-line max-len
    const resize = index ? `<div class="row-resize" data-resize="row" data-resizer-for-row="${index}"></div>` : ''
    return `
        <div class="row" data-row="${index}">
            <div class="row-info">
                ${index}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map((el, index) => {
            return String.fromCharCode(CODES.A + index)
        })
        .map(createCol)
        .join('')
    rows.push(createRow('', cols))


    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map((el, index) => createCell(index, i))
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}
