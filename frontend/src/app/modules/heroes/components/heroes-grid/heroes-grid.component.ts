import './heroes-grid.component.less';
import './templates/difficulty.cell.html';
import './templates/role.cell.html';

import * as _ from 'lodash';

import { Hero } from '../../models/hero.model';


class HeroesGridController {
    // @Input
    heroes: Hero[];
    selectedHeroId: number;
    loading: boolean;

    // @Output
    onSelect;

    // Local Variables
    gridOptions;
    gridApi;

    constructor(private uiGridConstants) {
    }

    $onInit() {
        const columnDefs = [
            {
                field: 'name',
                displayName: 'Название героя'
            },
            {
                field: 'role',
                displayName: 'Роль',
                cellTemplate: require('./templates/role.cell.html'),
                enableSorting: false
            },
            {
                field: 'difficulty',
                displayName: 'Сложность',
                cellTemplate: require('./templates/difficulty.cell.html')
            }
        ];

        this.gridOptions = {
            columnDefs,
            multiSelect: false,
            noUnselect: true,
            data: this.heroes,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableColumnMenus: false,
            gridMenuShowHideColumns: false,
            enableHorizontalScrollbar: this.uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: this.uiGridConstants.scrollbars.WHEN_NEEDED,
            onRegisterApi: this.onRegisterGridApi.bind(this)
        };
    }

    $onChanges() {
        if (this.gridOptions) {
            this.gridOptions.data = this.heroes;
        }
    }

    getRoleText(role) {
        switch (role) {
            case 'offense':
                return 'Штурм';
            case 'defense':
                return 'Защита';
            case 'tank':
                return 'Танк';
            case 'support':
                return 'Поддержка';
            default:
                return;
        }
    }

    private onRegisterGridApi(gridApi) {
        this.gridApi = gridApi;

        this.gridApi.selection.on.rowSelectionChanged(gridApi.grid.appScope, this.onGridRowsSelection.bind(this));
    }

    private onGridRowsSelection() {
        const selectedRow = _.last(this.gridApi.selection.getSelectedRows()) as Hero;

        this.onSelect({ heroId: selectedRow.id });
    }
}

HeroesGridController.$inject = ['uiGridConstants'];

export const HeroesGridComponent = {
    controller: HeroesGridController,
    template: require('./heroes-grid.component.html'),
    bindings: {
        heroes: '<',
        selectedHeroId: '<',
        loading: '<',
        onSelect: '&'
    }
};
