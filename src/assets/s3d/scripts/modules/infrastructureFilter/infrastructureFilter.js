import { BehaviorSubject } from "rxjs";

function infrastructureFilter(modalManager = {}) {

    const isVisible = new BehaviorSubject(false);
    const openerId = 's3d-map-call-mobile';
    
    if (modalManager.push) {
        modalManager.push({
            id: openerId,
            close: () => {
                document.querySelector(`#${openerId}`).checked = false;
                document.querySelectorAll(`label[for="${openerId}"]`).forEach(el => el.classList.remove('active'));
                data.next(new Set());
            }
        })
    }

    document.querySelector(`#${openerId}`).addEventListener('change',function(evt){
        if (evt.target.checked) modalManager.open(openerId);
    });

    isVisible.subscribe(data => {
        if (data && modalManager.open) modalManager.open(openerId);
    })

    const initialFilter = new Set();
    document.querySelectorAll('[data-filter-map-button]').forEach(button => {
        const clickedFilterValue = button.getAttribute('data-filter-map-button');
        if (button.classList.contains('active')) {
            initialFilter.add(clickedFilterValue);
        }
    });

    const data = new BehaviorSubject(initialFilter);
    data.subscribe((el) => {
        renderFilteredItems(el);
    });

    data.subscribe((filters) => {
        document.querySelectorAll('[data-filter-map-button]').forEach(button => {
            const clickedFilterValue = button.getAttribute('data-filter-map-button');
            if (filters.has(clickedFilterValue)) {
                button.classList.add('active')
            } else {
                button.classList.remove('active')

            }
        })
    })
    document.body.addEventListener('click', (evt) => {
        if (evt.target.closest('[data-filter-map-button]') === null) return;
        const button = evt.target.closest('[data-filter-map-button]');
        const clickedFilterValue = button.getAttribute('data-filter-map-button');
        if (data.value.has(clickedFilterValue)) {
            data.value.delete(clickedFilterValue);
            data.next(data.value);
            // button.classList.remove('active');
        } else {
            data.value.add(clickedFilterValue);
            data.next(data.value);
            // button.classList.add('active');
        }
    });
    document.body.addEventListener('click', (evt) => {
        if (evt.target.closest('[data-map-filter-reset]') === null) return;
        data.next(new Set());
    });

    window.addEventListener('visit-page',function(evt){
        if (!document.querySelector(`#${openerId}`).checked) return;
        data.next(new Set());
        document.querySelector(`label[for="${openerId}"]`).click();
    });




    return data;
}


function renderFilteredItems(filter) { 
    document.body.querySelectorAll('svg [data-infra-filter]').forEach(pin => {
        if (filter.has(pin.dataset.infraFilter) || filter.size === 0 || pin.dataset.infraFilter === 'main') {
            pin.classList.remove('transparent');
            pin.classList.add('active');
            
        } else {
            pin.classList.add('transparent');
            pin.classList.remove('active');
        }
        
        if (filter.size === 0) {
            pin.classList.remove('active');
        }
    });

    
    
}


export default infrastructureFilter;

/*

    initFilter() {
        this.filter = new Set();

        document.querySelectorAll('[data-filter-map-button]').forEach(button => {
            const clickedFilterValue = button.getAttribute('data-filter-map-button');
            if (button.classList.contains('active')) {
                this.filter.add(clickedFilterValue);
            }
        });
        this.renderFilteredItems();

        this.$wrapper.addEventListener('click', (evt) => {
            if (evt.target.closest('[data-filter-map-button]') === null) return;
            const button = evt.target.closest('[data-filter-map-button]');
            const clickedFilterValue = button.getAttribute('data-filter-map-button');
            if (this.filter.has(clickedFilterValue)) {
                this.filter.delete(clickedFilterValue);
                button.classList.remove('active');
            } else {
                this.filter.add(clickedFilterValue);
                button.classList.add('active');
            }
            this.renderFilteredItems();
        })
        this.$wrapper.addEventListener('click', (evt) => { 
            if (evt.target.closest('[data-map-filter-reset]') === null) return;
            // this.filter.clear();
            document.querySelectorAll('[data-filter-map-button]').forEach(el => {
                this.filter.add(el.dataset.filterMapButton);
            })
            this.renderFilteredItems();
            console.log(this.filter);
            this.$wrapper.querySelectorAll('[data-filter-map-button]').forEach(el => el.classList.add('active'));
        })
    }

    renderFilteredItems() { 
        this.$wrapper.querySelectorAll('[data-title]').forEach(pin => {
            (this.filter.has(pin.dataset.title) || pin.dataset.title === 'main') 
            ?
            pin.classList.remove('transparent')
            :
            pin.classList.add('transparent');
        })
    }
*/