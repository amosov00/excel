import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'mouseup', 'mousemove'],
        });
        this.resizing = false
        this.initialWidth = null
        this.initialHeight = null
        this.initialScreenX = null
        this.initialScreenY = null
        this.resizingColumnLetter = null
        this.resizingRowNumber = null
    }
    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            if (event.target.dataset.resize === 'col') {
                this.resizingColumnLetter = event.target.dataset.resizerForCol
                const firstElem = document.querySelector(`[data-col="${this.resizingColumnLetter}"]`)
                const width = getComputedStyle(firstElem).getPropertyValue('width');
                this.initialWidth = parseInt(width)
                this.initialScreenX = event.screenX
            }
            if (event.target.dataset.resize === 'row') {
                this.resizingRowNumber = event.target.dataset.resizerForRow
                const firstElem = document.querySelector(`[data-row="${this.resizingRowNumber}"]`)
                const height = getComputedStyle(firstElem).getPropertyValue('height');
                this.initialHeight = parseInt(height)
                this.initialScreenY = event.screenY
            }
        }
        this.resizing = event.target.dataset.resize
    }

    onMouseup() {
        this.resizing = false
        this.initialWidth = null
        this.initialHeight = null
        this.initialScreenX = null
        this.initialScreenY = null
        this.resizingColumnLetter = null
        this.resizingRowNumber = null
    }

    onMousemove(event) {
        if (this.resizing === 'col') {
            const offset = event.screenX - this.initialScreenX
            const allCellsFromColumn = document.querySelectorAll(`[data-col="${this.resizingColumnLetter}"]`)
            allCellsFromColumn.forEach((el) => el.style.width = this.initialWidth + offset + 'px')
        }

        if (this.resizing === 'row') {
            const offset = event.screenY - this.initialScreenY
            const allRows = document.querySelectorAll(`[data-row="${this.resizingRowNumber}"]`)
            allRows.forEach((el) => el.style.height = this.initialHeight + offset + 'px' )
        }
    }
}

