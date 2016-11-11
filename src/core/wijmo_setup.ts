namespace Origin.Core.Wijmo {
    export interface IColumnDefinition {
        name: string;
        header?: string;
        canHideColumn: boolean;
        visible: boolean;
        type?: number;
        iscusomattributes?: boolean;
    }

    export class Setup {

        defaultPageSize: number
        defaultPage: number;
        showfilter: boolean;
        hideGroupPanel: boolean;
        flexgridfilter: wijmo.grid.filter.ColumnFilter;
        grid: wijmo.grid.FlexGrid;
        selectedUsersArray: wijmo.grid.Row[];
        totalItems: number;
        numItems: number;
        isFilterActive: boolean;
        sortfieldname: string;
        source;
        page: number;
        pagesize: number;


        selectItems = [
            { value: 10, label: 10 },
            { value: 25, label: 25 },
            { value: 50, label: 50 },
            { value: 100, label: 100 }
        ];


        constructor(private columnDefinitions: IColumnDefinition[], ) {
            this.defaultPageSize = 10;
            this.defaultPage = 1;
            this.showfilter = true;
            this.hideGroupPanel = true;
            this.totalItems = 0;
            this.numItems = 10;
            this.isFilterActive = false;
            this.sortfieldname = 'lastmodified';
            this.page = this.defaultPage;
            this.pagesize = this.defaultPageSize;
        }

        setupGridStyleAndFilter = (grid, thisobj) => {
            if (grid) {
                // Set default row height to 28 px
                grid.rows.defaultSize = 48;

                // Set the header row height to 48
                grid.columnHeaders.rows[0].height = 48;

                Origin.Core.Wijmo.SetupCulture();
                thisobj.flexgridfilter = new wijmo.grid.filter.FlexGridFilter(grid);
                thisobj.flexgridfilter.defaultFilterType = wijmo.grid.filter.FilterType.Value;
                thisobj.flexgridfilter.clear();
                thisobj.flexgridfilter.filterChanged.addHandler(function (s, e) {
                    var cf = thisobj.flexgridfilter.getColumnFilter(e.col);
                    if (cf.isActive) {
                        thisobj.columnDefinitions[e.col]["filterapplied"] = true;
                    } else {
                        thisobj.columnDefinitions[e.col]["filterapplied"] = false;
                    }
                    thisobj.isFilterActive = thisobj.columnDefinitions.isExist("filterapplied", true) >= 0 ? true : false;
                    thisobj.page = 1;
                    //$timeout(function() {
                    grid.collapseGroupsToLevel(0);
                    //}, 0);
                });
            }
        };

        setGridData = (data: any, callback?: Function, sortfieldname?: string) => {
            let g = this;
            this.sortfieldname = sortfieldname || this.sortfieldname;
            this.source = new wijmo.collections.CollectionView(data);
            this.source.pageSize = this.defaultPageSize;
            this.totalItems = data.length;
            this.selectedUsersArray = [];
            this.source.sortDescriptions.push(new wijmo.collections.SortDescription(this.sortfieldname, false));
            this.collapseGrid();

            function onCollectionChanged(cv) {
                //$timeout(function() {
                g.totalItems = cv.totalItemCount;
                //});
            }
            //$timeout(function() {
            g.grid.refresh();
            g.source.collectionChanged.addHandler(onCollectionChanged);
            //}, 100);
            if (callback) {
                callback(this.flexgridfilter);
            }
        };

        initflexgrid = (s, e) => {
            this.grid = s;
            this.setupGridStyleAndFilter(s, this);
        };

        onPageChanged = (page: number) => {
            this.page = page;
            this.grid.collectionView.moveToPage(page - 1);
            this.collapseGrid();
        };

        onSelectChanged = (size) => {
            this.pagesize = size;
            //analyticsService.trackEvent('changed', 'Pagination', 'Page Size : ' + size);
            this.grid.collectionView.pagesize = size;
            this.collapseGrid();
        };

        toggleFilter = () => {
            this.isFilterActive = false;
            this.flexgridfilter.clear();
            this.flexgridfilter.showFilterIcons = this.showfilter = !this.showfilter;
            this.collapseGrid();
        };

        toggleGroupPanel = () => {
            this.hideGroupPanel = !this.hideGroupPanel;
            this.grid.refresh();
            this.collapseGrid();
        };

        toggleVisibility = (index) => {
            this.columnDefinitions[index]['visible'] = !this.columnDefinitions[index]['visible'];
        };

        sortedcolumn = () => {
            this.collapseGrid();
        };

        private collapseGrid = () => {
            var g = this;
            //this.$timeout(function () {
            g.grid.collapseGroupsToLevel(0);
            // }, 0);
        };



    }
}