﻿/*
    *
    * Wijmo Library 5.20162.198
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
var wj;
(function (wj) {
    // prevent double loading
    //if (wijmo && wijmo.interop) {
    //    return;
    //}
    var interop;
    (function (interop) {
        /*
            Represents shared metadata (control properties/events descriptions) used by interop services like
            Angular directives and Knockout custom bindings.

            Control metadata is retrieved using the getMetaData method by passing the control's metaDataId (see the
            method description for details).

            Descriptor objects are created using the CreateProp, CreateEvent and CreateComplexProp static methods.

            The specific interop service should create a class derived from ControlMetaFactory and override these methods to
            create descriptors of the platform specific types (see the wijmo.angular.MetaFactory class as an example).

            To initialize platform specific properties of the descriptors an interop services can use the findProp, findEvent and
            findComplexProp methods to find a necessary descriptor object by name.
        */
        var ControlMetaFactory = (function () {
            function ControlMetaFactory() {
            }
            // Creates a property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                return new PropDescBase(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
            };
            // Creates an event descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateEvent = function (eventName, isPropChanged) {
                return new EventDescBase(eventName, isPropChanged);
            };
            // Creates a complex property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
                return new ComplexPropDescBase(propertyName, isArray, ownsObject);
            };
            // Finds a property descriptor by the property name in the specified array.
            ControlMetaFactory.findProp = function (propName, props) {
                return this.findInArr(props, 'propertyName', propName);
            };
            // Finds an event descriptor by the event name in the specified array.
            ControlMetaFactory.findEvent = function (eventName, events) {
                return this.findInArr(events, 'eventName', eventName);
            };
            // Finds a complex property descriptor by the property name in the specified array.
            ControlMetaFactory.findComplexProp = function (propName, props) {
                return this.findInArr(props, 'propertyName', propName);
            };
            /*
                Returns metadata for the control by its metadata ID.In the most cases the control type (constructor function)
                is used as metadata ID. In cases where this is not applicable an arbitrary object can be used as an ID, e.g.
                'MenuItem' string is used as the ID for Menu Item.

                The sets of descriptors returned for the specific metadata ID take into account the controls inheritance chain
                and include metadata defined for the control's base classes.
                In case of a control that has no a base class metadata you create its metadata object with a constructor:
                return new MetaDataBase(... descriptor arrays ...);

                If the control has the base control metadata then you create its metadata object by a recursive call to
                the getMetaData method with the base control's metadata ID passed, and add the controls own metadata to
                the returned object using the 'add' method. E.g. for the ComboBox derived from the DropDown this looks like:
                return this.getMetaData(wijmo.input.DropDown).add(... descriptor arrays ...);

                The specific platforms provide the following implementations of the metadata ID support:

                Angular
                =======
                The WjDirective._getMetaDataId method returns a metadata ID. By default it returns a value of the
                WjDirective._controlConstructor property. Because of this approach it's reasonable to override the
                _controlConstructor property even in the abstract classes like WjDropDown, in this case it's not necessary
                to override the _getMetaDataId method itself.
                ----------------
                WARNING: if you override the _getMetaDataId method, don't forget to override it in the derived classes!
                ----------------
                You usually need to override the _getMetaDataId method only for classes like WjMenuItem and WjCollectionViewNavigator
                for which the _controlConstructor as an ID approach doesn't work.

                Knockout
                ========
                TBD
            */
            ControlMetaFactory.getMetaData = function (metaDataId) {
                switch (metaDataId) {
                    // wijmo.Control *************************************************************
                    case wijmo.Control:
                        return new MetaDataBase([
                            this.CreateProp('isDisabled', PropertyType.Boolean),
                            this.CreateProp('disabled', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('gotFocus'),
                            this.CreateEvent('lostFocus')
                        ]);
                    // wijmo.input *************************************************************
                    case wijmo.input && wijmo.input.DropDown:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('isDroppedDown', PropertyType.Boolean, 'isDroppedDownChanged'),
                            this.CreateProp('showDropDownButton', PropertyType.Boolean),
                            this.CreateProp('autoExpandSelection', PropertyType.Boolean),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('dropDownCssClass', PropertyType.String),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('required', PropertyType.Boolean),
                            this.CreateProp('text', PropertyType.String, 'textChanged', null, true, 1000) // textChanged
                        ], [
                            this.CreateEvent('isDroppedDownChanging'),
                            this.CreateEvent('isDroppedDownChanged', true),
                            this.CreateEvent('textChanged', true)
                        ]);
                    case wijmo.input && wijmo.input.ComboBox:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('displayMemberPath', PropertyType.String),
                            this.CreateProp('selectedValuePath', PropertyType.String),
                            this.CreateProp('headerPath', PropertyType.String),
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('isEditable', PropertyType.Boolean),
                            this.CreateProp('maxDropDownHeight', PropertyType.Number),
                            this.CreateProp('maxDropDownWidth', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemsSource', PropertyType.Any, '', null, true, 900),
                            this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged', null, true, 1000),
                            this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                            this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                        ], [
                            this.CreateEvent('selectedIndexChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'selectedValue' });
                    case wijmo.input && wijmo.input.AutoComplete:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('delay', PropertyType.Number),
                            this.CreateProp('maxItems', PropertyType.Number),
                            this.CreateProp('minLength', PropertyType.Number),
                            this.CreateProp('cssMatch', PropertyType.String),
                            this.CreateProp('itemsSourceFunction', PropertyType.Function),
                            this.CreateProp('searchMemberPath', PropertyType.String)
                        ]);
                    case wijmo.input && wijmo.input.Calendar:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('monthView', PropertyType.Boolean),
                            this.CreateProp('showHeader', PropertyType.Boolean),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemValidator', PropertyType.Function),
                            this.CreateProp('displayMonth', PropertyType.Date, 'displayMonthChanged'),
                            this.CreateProp('firstDayOfWeek', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged'),
                        ], [
                            this.CreateEvent('valueChanged', true),
                            this.CreateEvent('displayMonthChanged', true),
                            this.CreateEvent('formatItem', false)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.ColorPicker:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                            this.CreateProp('showColorString', PropertyType.Boolean),
                            this.CreateProp('palette', PropertyType.Any),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.ListBox:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('maxHeight', PropertyType.Number),
                            this.CreateProp('selectedValuePath', PropertyType.String),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('displayMemberPath', PropertyType.String),
                            this.CreateProp('checkedMemberPath', PropertyType.String),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged'),
                            this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged'),
                            this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged'),
                        ], [
                            this.CreateEvent('formatItem', false),
                            this.CreateEvent('itemsChanged', true),
                            //AlexI: isPropChanged must be true, in order to run a digest and update bound expressions
                            this.CreateEvent('itemChecked', true),
                            this.CreateEvent('selectedIndexChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'selectedValue' });
                    case 'ItemTemplate':
                        return new MetaDataBase([], [], [], undefined, undefined, undefined, 'owner');
                    case wijmo.input && wijmo.input.Menu:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('commandParameterPath', PropertyType.String),
                            this.CreateProp('commandPath', PropertyType.String),
                            this.CreateProp('isButton', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.Any, 'selectedIndexChanged', null, false, 1000)
                        ], [
                            this.CreateEvent('itemClicked')
                        ]);
                    case 'MenuItem':
                        return new MetaDataBase([
                            //TBD: check whether they should be two-way
                            //this.CreateProp('value', PropertyType.String, BindingMode.TwoWay),
                            //this.CreateProp('cmd', PropertyType.String, BindingMode.TwoWay),
                            //this.CreateProp('cmdParam', PropertyType.String, BindingMode.TwoWay)
                            this.CreateProp('value', PropertyType.Any, ''),
                            this.CreateProp('cmd', PropertyType.Any, ''),
                            this.CreateProp('cmdParam', PropertyType.Any, '')
                        ], [], [], 'itemsSource', true);
                    case 'MenuSeparator':
                        return new MetaDataBase([], [], [], 'itemsSource', true);
                    case wijmo.input && wijmo.input.InputDate:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                            this.CreateProp('itemValidator', PropertyType.Function),
                            this.CreateProp('itemFormatter', PropertyType.Function)
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputDateTime:
                        return this.getMetaData(wijmo.input.InputDate).add([
                            this.CreateProp('timeMax', PropertyType.Date),
                            this.CreateProp('timeMin', PropertyType.Date),
                            this.CreateProp('timeStep', PropertyType.Number),
                            this.CreateProp('timeFormat', PropertyType.String),
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputNumber:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('showSpinner', PropertyType.Boolean),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('required', PropertyType.Boolean),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                            this.CreateProp('text', PropertyType.String, 'textChanged')
                        ], [
                            this.CreateEvent('valueChanged', true),
                            this.CreateEvent('textChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputMask:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('promptChar', PropertyType.String),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('rawValue', PropertyType.String, 'valueChanged'),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true),
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputTime:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputColor:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.Popup:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('owner', PropertyType.String),
                            this.CreateProp('showTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                            this.CreateProp('hideTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                            this.CreateProp('fadeIn', PropertyType.Boolean),
                            this.CreateProp('fadeOut', PropertyType.Boolean),
                            this.CreateProp('dialogResultEnter', PropertyType.String),
                            this.CreateProp('modal', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('showing'),
                            this.CreateEvent('shown'),
                            this.CreateEvent('hiding'),
                            this.CreateEvent('hidden'),
                        ]);
                    case wijmo.input && wijmo.input.MultiSelect:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('checkedMemberPath', PropertyType.String),
                            this.CreateProp('maxHeaderItems', PropertyType.Number),
                            this.CreateProp('headerFormat', PropertyType.String),
                            this.CreateProp('headerFormatter', PropertyType.Function),
                            // initialized after itemsSource but before selectedXXX
                            this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged', BindingMode.TwoWay, true, 950),
                        ], [
                            this.CreateEvent('checkedItemsChanged', true)
                        ]);
                    case 'CollectionViewNavigator':
                        return new MetaDataBase([
                            this.CreateProp('cv', PropertyType.Any)
                        ]);
                    case 'CollectionViewPager':
                        return new MetaDataBase([
                            this.CreateProp('cv', PropertyType.Any)
                        ]);
                    // wijmo.grid *************************************************************
                    case wijmo.grid && wijmo.grid.FlexGrid:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('allowAddNew', PropertyType.Boolean),
                            this.CreateProp('allowDelete', PropertyType.Boolean),
                            this.CreateProp('allowDragging', PropertyType.Enum, '', wijmo.grid.AllowDragging),
                            this.CreateProp('allowMerging', PropertyType.Enum, '', wijmo.grid.AllowMerging),
                            this.CreateProp('allowResizing', PropertyType.Enum, '', wijmo.grid.AllowResizing),
                            this.CreateProp('allowSorting', PropertyType.Boolean),
                            this.CreateProp('autoSizeMode', PropertyType.Enum, '', wijmo.grid.AutoSizeMode),
                            this.CreateProp('autoGenerateColumns', PropertyType.Boolean),
                            this.CreateProp('childItemsPath', PropertyType.Any),
                            this.CreateProp('groupHeaderFormat', PropertyType.String),
                            this.CreateProp('headersVisibility', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                            this.CreateProp('showSelectedHeaders', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                            this.CreateProp('showMarquee', PropertyType.Boolean),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('imeEnabled', PropertyType.Boolean),
                            this.CreateProp('mergeManager', PropertyType.Any),
                            // REVIEW: This breaks the grid too, see TFS 82636
                            //this.CreateProp('scrollPosition', PropertyType.Any, '='),
                            // REVIEW: this screws up the grid when selectionMode == ListBox.
                            // When the directive applies a selection to the grid and selectionMode == ListBox,
                            // the grid clears the row[x].isSelected properties of rows that are not in the selection.
                            // I think a possible fix would be for the directive to not set the grid's selection if it
                            // is the same range as the current selection property. I cannot do that in the grid because
                            // when the user does it, this side-effect is expected.
                            //this.CreateProp('selection', PropertyType.Any, '='),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.grid.SelectionMode),
                            this.CreateProp('showGroups', PropertyType.Boolean),
                            this.CreateProp('showSort', PropertyType.Boolean),
                            this.CreateProp('showAlternatingRows', PropertyType.Boolean),
                            this.CreateProp('treeIndent', PropertyType.Number),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('autoClipboard', PropertyType.Boolean),
                            this.CreateProp('frozenRows', PropertyType.Number),
                            this.CreateProp('frozenColumns', PropertyType.Number),
                            this.CreateProp('deferResizing', PropertyType.Boolean),
                            this.CreateProp('sortRowIndex', PropertyType.Number),
                            this.CreateProp('stickyHeaders', PropertyType.Boolean),
                            this.CreateProp('preserveSelection', PropertyType.Boolean),
                            this.CreateProp('preserveOutlineState', PropertyType.Boolean)
                        ], [
                            // Cell events
                            this.CreateEvent('beginningEdit'),
                            this.CreateEvent('cellEditEnded'),
                            this.CreateEvent('cellEditEnding'),
                            this.CreateEvent('prepareCellForEdit'),
                            this.CreateEvent('formatItem'),
                            // Column events
                            this.CreateEvent('resizingColumn'),
                            this.CreateEvent('resizedColumn'),
                            this.CreateEvent('autoSizingColumn'),
                            this.CreateEvent('autoSizedColumn'),
                            this.CreateEvent('draggingColumn'),
                            this.CreateEvent('draggedColumn'),
                            this.CreateEvent('sortingColumn'),
                            this.CreateEvent('sortedColumn'),
                            // Row Events
                            this.CreateEvent('resizingRow'),
                            this.CreateEvent('resizedRow'),
                            this.CreateEvent('autoSizingRow'),
                            this.CreateEvent('autoSizedRow'),
                            this.CreateEvent('draggingRow'),
                            this.CreateEvent('draggedRow'),
                            this.CreateEvent('deletingRow'),
                            this.CreateEvent('loadingRows'),
                            this.CreateEvent('loadedRows'),
                            this.CreateEvent('rowEditEnded'),
                            this.CreateEvent('rowEditEnding'),
                            this.CreateEvent('rowAdded'),
                            this.CreateEvent('groupCollapsedChanged'),
                            this.CreateEvent('groupCollapsedChanging'),
                            this.CreateEvent('itemsSourceChanged', true),
                            this.CreateEvent('selectionChanging'),
                            this.CreateEvent('selectionChanged', true),
                            this.CreateEvent('scrollPositionChanged', false),
                            this.CreateEvent('updatingView'),
                            this.CreateEvent('updatedView'),
                            this.CreateEvent('updatingLayout'),
                            this.CreateEvent('updatedLayout'),
                            // Clipboard events
                            this.CreateEvent('pasting'),
                            this.CreateEvent('pasted'),
                            this.CreateEvent('copying'),
                            this.CreateEvent('copied')
                        ]);
                    case wijmo.grid && wijmo.grid.Column:
                        return new MetaDataBase([
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('dataMap', PropertyType.Any),
                            this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('sortMemberPath', PropertyType.String),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('width', PropertyType.Number),
                            this.CreateProp('minWidth', PropertyType.Number),
                            this.CreateProp('maxWidth', PropertyType.Number),
                            this.CreateProp('align', PropertyType.String),
                            this.CreateProp('allowDragging', PropertyType.Boolean),
                            this.CreateProp('allowSorting', PropertyType.Boolean),
                            this.CreateProp('allowResizing', PropertyType.Boolean),
                            this.CreateProp('allowMerging', PropertyType.Boolean),
                            this.CreateProp('aggregate', PropertyType.Enum, '', wijmo.Aggregate),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('cssClass', PropertyType.String),
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('isSelected', PropertyType.Boolean, 'grid.selectionChanged'),
                            this.CreateProp('visible', PropertyType.Boolean),
                            this.CreateProp('wordWrap', PropertyType.Boolean),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('required', PropertyType.Boolean),
                            this.CreateProp('showDropDown', PropertyType.Boolean),
                            this.CreateProp('dropDownCssClass', PropertyType.String),
                        ], [], [], 'columns', true);
                    case 'FlexGridCellTemplate':
                        return new MetaDataBase([
                            this.CreateProp('cellType', PropertyType.String, '', null, false),
                            this.CreateProp('cellOverflow', PropertyType.String, ''),
                        ], [], [], undefined, undefined, undefined, 'owner');
                    case wijmo.grid && wijmo.grid.filter && wijmo.grid.filter.FlexGridFilter:
                        return new MetaDataBase([
                            this.CreateProp('showFilterIcons', PropertyType.Boolean),
                            this.CreateProp('showSortButtons', PropertyType.Boolean),
                            this.CreateProp('defaultFilterType', PropertyType.Enum, '', wijmo.grid.filter.FilterType),
                            this.CreateProp('filterColumns', PropertyType.Any),
                        ], [
                            this.CreateEvent('filterChanging'),
                            this.CreateEvent('filterChanged'),
                            this.CreateEvent('filterApplied')
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.grid && wijmo.grid.grouppanel && wijmo.grid.grouppanel.GroupPanel:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('hideGroupedColumns', PropertyType.Boolean),
                            this.CreateProp('maxGroups', PropertyType.Number),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('grid', PropertyType.Any),
                        ]);
                    case wijmo.grid && wijmo.grid.detail && wijmo.grid.detail.FlexGridDetailProvider:
                        return new MetaDataBase([
                            this.CreateProp('maxHeight', PropertyType.Number),
                            this.CreateProp('detailVisibilityMode', PropertyType.Enum, '', wijmo.grid.detail.DetailVisibilityMode),
                            this.CreateProp('rowHasDetail', PropertyType.Function),
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.FlexSheet:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('isTabHolderVisible', PropertyType.Boolean),
                            this.CreateProp('selectedSheetIndex', PropertyType.Number, 'selectedSheetChanged'),
                        ], [
                            this.CreateEvent('selectedSheetChanged', true),
                            this.CreateEvent('draggingRowColumn'),
                            this.CreateEvent('droppingRowColumn'),
                            this.CreateEvent('loaded'),
                        ]);
                    case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.Sheet:
                        return new MetaDataBase([
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('visible', PropertyType.Boolean),
                            this.CreateProp('rowCount', PropertyType.Number, '', null, false),
                            this.CreateProp('columnCount', PropertyType.Number, '', null, false)
                        ], [
                            this.CreateEvent('nameChanged'),
                        ])
                            .addOptions({ parentReferenceProperty: '' });
                    case wijmo.grid && wijmo.grid.multirow && wijmo.grid.multirow.MultiRow:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('layoutDefinition', PropertyType.Any),
                            this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                            this.CreateProp('collapsedHeaders', PropertyType.Boolean),
                            this.CreateProp('showHeaderCollapseButton', PropertyType.Boolean)
                        ]);
                    // Chart *************************************************************
                    case wijmo.chart && wijmo.chart.FlexChartBase:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('footer', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.chart.SelectionMode),
                            this.CreateProp('palette', PropertyType.Any),
                            this.CreateProp('plotMargin', PropertyType.Any),
                            this.CreateProp('footerStyle', PropertyType.Any),
                            this.CreateProp('headerStyle', PropertyType.Any),
                            this.CreateProp('tooltipContent', PropertyType.String, '', null, false),
                            this.CreateProp('itemsSource', PropertyType.Any)
                        ], [
                            this.CreateEvent('rendering'),
                            this.CreateEvent('rendered'),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexChartCore:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingX', PropertyType.String),
                            // this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                            this.CreateProp('interpolateNulls', PropertyType.Boolean),
                            this.CreateProp('legendToggle', PropertyType.Boolean),
                            this.CreateProp('symbolSize', PropertyType.Number),
                            this.CreateProp('options', PropertyType.Any),
                            this.CreateProp('selection', PropertyType.Any, 'selectionChanged'),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                        ], [
                            this.CreateEvent('seriesVisibilityChanged'),
                            this.CreateEvent('selectionChanged', true),
                        ], [
                            this.CreateComplexProp('axisX', false, false),
                            this.CreateComplexProp('axisY', false, false),
                            this.CreateComplexProp('axes', true),
                            this.CreateComplexProp('plotAreas', true)
                        ]);
                    case wijmo.chart && wijmo.chart.FlexChart:
                        return this.getMetaData(wijmo.chart.FlexChartCore).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                            this.CreateProp('rotated', PropertyType.Boolean),
                            this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexPie:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingName', PropertyType.String),
                            this.CreateProp('innerRadius', PropertyType.Number),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('offset', PropertyType.Number),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('selectedItemOffset', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexPie && wijmo.chart.hierarchical && wijmo.chart.hierarchical.Sunburst:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingName', PropertyType.Any),
                            this.CreateProp('innerRadius', PropertyType.Number),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('offset', PropertyType.Number),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('selectedItemOffset', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            this.CreateProp('childItemsPath', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.Axis:
                        return new MetaDataBase([
                            this.CreateProp('axisLine', PropertyType.Boolean),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('labels', PropertyType.Boolean),
                            this.CreateProp('majorGrid', PropertyType.Boolean),
                            this.CreateProp('majorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                            this.CreateProp('majorUnit', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('title', PropertyType.String),
                            this.CreateProp('labelAngle', PropertyType.Number),
                            this.CreateProp('minorGrid', PropertyType.Boolean),
                            this.CreateProp('minorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                            this.CreateProp('minorUnit', PropertyType.Number),
                            this.CreateProp('origin', PropertyType.Number),
                            this.CreateProp('logBase', PropertyType.Number),
                            this.CreateProp('plotArea', PropertyType.Any),
                            this.CreateProp('labelAlign', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('overlappingLabels', PropertyType.Enum, '', wijmo.chart.OverlappingLabels),
                            this.CreateProp('labelPadding', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('binding', PropertyType.String),
                        ], [
                            this.CreateEvent('rangeChanged'),
                        ], [], 'axes', true); //use wj-property attribute on directive to define axisX or axisY
                    case wijmo.chart && wijmo.chart.Legend:
                        return new MetaDataBase([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position)
                        ], [], [], 'legend', false, false);
                    case wijmo.chart && wijmo.chart.DataLabelBase:
                        return new MetaDataBase([
                            this.CreateProp('content', PropertyType.Any, ''),
                            this.CreateProp('border', PropertyType.Boolean),
                        ], [], [], 'dataLabel', false, false);
                    case wijmo.chart && wijmo.chart.DataLabel:
                        return this.getMetaData(wijmo.chart.DataLabelBase).add([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                        ]);
                    case wijmo.chart && wijmo.chart.PieDataLabel:
                        return this.getMetaData(wijmo.chart.DataLabelBase).add([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.PieLabelPosition),
                        ]);
                    case wijmo.chart && wijmo.chart.SeriesBase:
                        return new MetaDataBase([
                            this.CreateProp('axisX', PropertyType.Any),
                            this.CreateProp('axisY', PropertyType.Any),
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('bindingX', PropertyType.String),
                            this.CreateProp('cssClass', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('altStyle', PropertyType.Any),
                            this.CreateProp('symbolMarker', PropertyType.Enum, '', wijmo.chart.Marker),
                            this.CreateProp('symbolSize', PropertyType.Number),
                            this.CreateProp('symbolStyle', PropertyType.Any),
                            this.CreateProp('visibility', PropertyType.Enum, 'chart.seriesVisibilityChanged', wijmo.chart.SeriesVisibility),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ], [], [
                            this.CreateComplexProp('axisX', false, true),
                            this.CreateComplexProp('axisY', false, true),
                        ], 'series', true);
                    case wijmo.chart && wijmo.chart.Series:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType)
                        ]);
                    case wijmo.chart && wijmo.chart.LineMarker:
                        return new MetaDataBase([
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('seriesIndex', PropertyType.Number),
                            this.CreateProp('horizontalPosition', PropertyType.Number),
                            this.CreateProp('content', PropertyType.Function),
                            this.CreateProp('verticalPosition', PropertyType.Number),
                            this.CreateProp('alignment', PropertyType.Enum, '', wijmo.chart.LineMarkerAlignment),
                            this.CreateProp('lines', PropertyType.Enum, '', wijmo.chart.LineMarkerLines),
                            this.CreateProp('interaction', PropertyType.Enum, '', wijmo.chart.LineMarkerInteraction),
                            this.CreateProp('dragLines', PropertyType.Boolean),
                            this.CreateProp('dragThreshold', PropertyType.Number),
                            this.CreateProp('dragContent', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('positionChanged'),
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.DataPoint:
                        return new MetaDataBase([
                            this.CreateProp('x', PropertyType.AnyPrimitive),
                            this.CreateProp('y', PropertyType.AnyPrimitive)
                        ], [], [], '');
                    case wijmo.chart && wijmo.chart.annotation && wijmo.chart.annotation.AnnotationLayer:
                        return new MetaDataBase([], [], [], undefined, undefined, undefined, '');
                    case 'FlexChartAnnotation':
                        return new MetaDataBase([
                            this.CreateProp('type', PropertyType.String, '', null, false),
                            this.CreateProp('attachment', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationAttachment),
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationPosition),
                            this.CreateProp('point', PropertyType.Any),
                            this.CreateProp('seriesIndex', PropertyType.Number),
                            this.CreateProp('pointIndex', PropertyType.Number),
                            this.CreateProp('offset', PropertyType.Any),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('tooltip', PropertyType.String),
                            this.CreateProp('text', PropertyType.String),
                            this.CreateProp('content', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('width', PropertyType.Number),
                            this.CreateProp('height', PropertyType.Number),
                            this.CreateProp('start', PropertyType.Any),
                            this.CreateProp('end', PropertyType.Any),
                            this.CreateProp('radius', PropertyType.Number),
                            this.CreateProp('length', PropertyType.Number),
                            this.CreateProp('href', PropertyType.String)
                        ], [], [
                            this.CreateComplexProp('point', false, true),
                            this.CreateComplexProp('start', false, true),
                            this.CreateComplexProp('end', false, true),
                            this.CreateComplexProp('points', true),
                        ], 'items', true);
                    case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.RangeSelector:
                        return new MetaDataBase([
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('orientation', PropertyType.Enum, '', wijmo.chart.interaction.Orientation),
                            this.CreateProp('seamless', PropertyType.Boolean),
                            this.CreateProp('minScale', PropertyType.Number),
                            this.CreateProp('maxScale', PropertyType.Number),
                        ], [
                            this.CreateEvent('rangeChanged'),
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.ChartGestures:
                        return new MetaDataBase([
                            this.CreateProp('mouseAction', PropertyType.Enum, '', wijmo.chart.interaction.MouseAction),
                            this.CreateProp('interactiveAxes', PropertyType.Enum, '', wijmo.chart.interaction.InteractiveAxes),
                            this.CreateProp('enable', PropertyType.Boolean),
                            this.CreateProp('scaleX', PropertyType.Number),
                            this.CreateProp('scaleY', PropertyType.Number),
                            this.CreateProp('posX', PropertyType.Number),
                            this.CreateProp('posY', PropertyType.Number),
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.animation && wijmo.chart.animation.ChartAnimation:
                        return new MetaDataBase([
                            this.CreateProp('animationMode', PropertyType.Enum, '', wijmo.chart.animation.AnimationMode),
                            this.CreateProp('easing', PropertyType.Enum, '', wijmo.chart.animation.Easing),
                            this.CreateProp('duration', PropertyType.Number),
                            this.CreateProp('axisAnimation', PropertyType.Boolean)
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialChart:
                        return this.getMetaData(wijmo.chart.FlexChartCore).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType),
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialSeries:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLineBase:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('sampleCount', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLine:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('order', PropertyType.Number),
                            this.CreateProp('fitType', PropertyType.Enum, '', wijmo.chart.analytics.TrendLineFitType)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.MovingAverage:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.analytics.MovingAverageType)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.FunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.YFunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                            this.CreateProp('func', PropertyType.Function),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.ParametricFunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                            //Add func property for xFunc property in angular1.
                            //Attribute names beginning with "x-" is reserved for user agent use, 'x-func' is parsed to 'func'
                            //Set func value to xFunc property in WjFlexChartParametricFunctionSeries._initProps function in wijmo.angular.chart.ts file.
                            this.CreateProp('func', PropertyType.Function),
                            this.CreateProp('xFunc', PropertyType.Function),
                            this.CreateProp('yFunc', PropertyType.Function),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.Waterfall:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('relativeData', PropertyType.Boolean),
                            this.CreateProp('start', PropertyType.Number),
                            this.CreateProp('startLabel', PropertyType.String),
                            this.CreateProp('showTotal', PropertyType.Boolean),
                            this.CreateProp('totalLabel', PropertyType.String),
                            this.CreateProp('showIntermediateTotal', PropertyType.Boolean),
                            this.CreateProp('intermediateTotalPositions', PropertyType.Any),
                            this.CreateProp('intermediateTotalLabels', PropertyType.Any),
                            this.CreateProp('connectorLines', PropertyType.Boolean),
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.PlotArea:
                        return new MetaDataBase([
                            this.CreateProp('column', PropertyType.Number),
                            this.CreateProp('height', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('row', PropertyType.Number),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('width', PropertyType.String),
                        ], [], [], 'plotAreas', true);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Fibonacci:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('high', PropertyType.Number),
                            this.CreateProp('low', PropertyType.Number),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any),
                            this.CreateProp('minX', PropertyType.AnyPrimitive),
                            this.CreateProp('maxX', PropertyType.AnyPrimitive),
                            this.CreateProp('uptrend', PropertyType.Boolean)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciTimeZones:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('startX', PropertyType.Any),
                            this.CreateProp('endX', PropertyType.Any),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciArcs:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciFans:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('start', PropertyType.Any),
                            this.CreateProp('end', PropertyType.Any),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.OverlayIndicatorBase:
                        return this.getMetaData(wijmo.chart.SeriesBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.SingleOverlayIndicatorBase:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdBase:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('fastPeriod', PropertyType.Number),
                            this.CreateProp('slowPeriod', PropertyType.Number),
                            this.CreateProp('smoothingPeriod', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Macd:
                        return this.getMetaData(wijmo.chart.finance.analytics.MacdBase).add([
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdHistogram:
                        return this.getMetaData(wijmo.chart.finance.analytics.MacdBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.ATR:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.RSI:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.WilliamsR:
                        return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.CCI:
                        return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase).add([
                            this.CreateProp('constant', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Stochastic:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('dPeriod', PropertyType.Number),
                            this.CreateProp('kPeriod', PropertyType.Number),
                            this.CreateProp('smoothingPeriod', PropertyType.Number),
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Envelopes:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('size', PropertyType.Number),
                            this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.finance.analytics.MovingAverageType)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.BollingerBands:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('multiplier', PropertyType.Number)
                        ]);
                    // *************************** Gauge *************************************************************
                    //case 'Gauge':
                    case wijmo.gauge && wijmo.gauge.Gauge:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('origin', PropertyType.Number),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('thickness', PropertyType.Number),
                            this.CreateProp('hasShadow', PropertyType.Boolean),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('showText', PropertyType.Enum, '', wijmo.gauge.ShowText),
                            this.CreateProp('showRanges', PropertyType.Boolean),
                            this.CreateProp('thumbSize', PropertyType.Number),
                            this.CreateProp('getText', PropertyType.Function)
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ], [
                            this.CreateComplexProp('ranges', true),
                            this.CreateComplexProp('pointer', false, false),
                            this.CreateComplexProp('face', false, false)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    //case 'LinearGauge':
                    case wijmo.gauge && wijmo.gauge.LinearGauge:
                        return this.getMetaData(wijmo.gauge.Gauge).add([
                            this.CreateProp('direction', PropertyType.Enum, '', wijmo.gauge.GaugeDirection)
                        ]);
                    case wijmo.gauge && wijmo.gauge.BulletGraph:
                        return this.getMetaData(wijmo.gauge.LinearGauge).add([
                            this.CreateProp('target', PropertyType.Number),
                            this.CreateProp('good', PropertyType.Number),
                            this.CreateProp('bad', PropertyType.Number)
                        ]);
                    case wijmo.gauge && wijmo.gauge.RadialGauge:
                        return this.getMetaData(wijmo.gauge.Gauge).add([
                            this.CreateProp('autoScale', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('sweepAngle', PropertyType.Number)
                        ]);
                    case wijmo.gauge && wijmo.gauge.Range:
                        return new MetaDataBase([
                            this.CreateProp('color', PropertyType.String),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('thickness', PropertyType.Number)
                        ], [], [], 'ranges', true);
                    // *************************** Olap *************************************************************
                    case wijmo.olap && wijmo.olap.PivotGrid:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('showDetailOnDoubleClick', PropertyType.Boolean),
                            this.CreateProp('customContextMenu', PropertyType.Boolean),
                            this.CreateProp('collapsibleSubtotals', PropertyType.Boolean),
                            this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                        ]);
                    case wijmo.olap && wijmo.olap.PivotChart:
                        return new MetaDataBase([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.olap.PivotChartType),
                            this.CreateProp('showHierarchicalAxes', PropertyType.Boolean),
                            this.CreateProp('showTotals', PropertyType.Boolean),
                            this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                            this.CreateProp('maxSeries', PropertyType.Number),
                            this.CreateProp('maxPoints', PropertyType.Number),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ]);
                    case wijmo.olap && wijmo.olap.PivotPanel:
                        return new MetaDataBase([
                            this.CreateProp('autoGenerateFields', PropertyType.Boolean),
                            this.CreateProp('viewDefinition', PropertyType.String),
                            this.CreateProp('engine', PropertyType.Any),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ], [
                            this.CreateEvent('itemsSourceChanged'),
                            this.CreateEvent('viewDefinitionChanged'),
                            this.CreateEvent('updatingView'),
                            this.CreateEvent('updatedView')
                        ]);
                    case wijmo.olap && wijmo.olap.PivotField:
                        return new MetaDataBase([
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                        ], [], [], '', true, true, '');
                }
                return new MetaDataBase([]);
            };
            // For the specified class reference returns its name as a string, e.g.
            // getClassName(wijmo.input.ComboBox) returns 'ComboBox'.
            ControlMetaFactory.getClassName = function (classRef) {
                return (classRef.toString().match(/function (.+?)\(/) || [, ''])[1];
            };
            // Returns a camel case representation of the dash delimited name.
            ControlMetaFactory.toCamelCase = function (s) {
                return s.toLowerCase().replace(/-(.)/g, function (match, group1) {
                    return group1.toUpperCase();
                });
            };
            ControlMetaFactory.findInArr = function (arr, propName, value) {
                for (var i in arr) {
                    if (arr[i][propName] === value) {
                        return arr[i];
                    }
                }
                return null;
            };
            return ControlMetaFactory;
        }());
        interop.ControlMetaFactory = ControlMetaFactory;
        // Describes a scope property: name, type, binding mode.
        // Also defines enum type and custom watcher function extender
        var PropDescBase = (function () {
            // Initializes a new instance of a PropDesc
            function PropDescBase(propertyName, propertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/ changeEvent, enumType, isNativeControlProperty, priority) {
                if (isNativeControlProperty === void 0) { isNativeControlProperty = true; }
                if (priority === void 0) { priority = 0; }
                this._priority = 0;
                this._propertyName = propertyName;
                this._propertyType = propertyType;
                //this._bindingMode = bindingMode;
                this._changeEvent = changeEvent;
                this._enumType = enumType;
                this._isNativeControlProperty = isNativeControlProperty;
                this._priority = priority;
            }
            Object.defineProperty(PropDescBase.prototype, "propertyName", {
                // Gets the property name
                get: function () {
                    return this._propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "propertyType", {
                // Gets the property type (number, string, boolean, enum, or any)
                get: function () {
                    return this._propertyType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "changeEvent", {
                get: function () {
                    return this._changeEvent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "enumType", {
                // Gets the property enum type
                get: function () { return this._enumType; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "bindingMode", {
                // Gets the property binding mode
                get: function () {
                    //return this._bindingMode;
                    return this.changeEvent ? BindingMode.TwoWay : BindingMode.OneWay;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "isNativeControlProperty", {
                // Gets whether the property belongs to the control is just to the directive
                get: function () {
                    return this._isNativeControlProperty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "priority", {
                // Gets an initialization priority. Properties with higher priority are assigned to directive's underlying control
                // property later than properties with lower priority. Properties with the same priority are assigned in the order of
                // their index in the _props collection.
                get: function () {
                    return this._priority;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "shouldUpdateSource", {
                // Indicates whether a bound 'controller' property should be updated on this property change (i.e. two-way binding).
                get: function () {
                    return this.bindingMode === BindingMode.TwoWay && this.propertyType != PropertyType.EventHandler;
                },
                enumerable: true,
                configurable: true
            });
            PropDescBase.prototype.initialize = function (options) {
                wijmo.copy(this, options);
            };
            // Casts value to the property type
            PropDescBase.prototype.castValueToType = function (value) {
                if (value == undefined) {
                    return value;
                }
                var type = this.propertyType, pt = PropertyType;
                if (type === pt.AnyPrimitive) {
                    if (!wijmo.isString(value)) {
                        return value;
                    }
                    if (value === 'true' || value === 'false') {
                        type = pt.Boolean;
                    }
                    else {
                        castVal = +value;
                        if (!isNaN(castVal)) {
                            return castVal;
                        }
                        var castVal = this._parseDate(value);
                        if (!wijmo.isString(castVal)) {
                            return castVal;
                        }
                        return value;
                    }
                }
                switch (type) {
                    case pt.Number:
                        if (typeof value == 'string') {
                            if (value.indexOf('*') >= 0) {
                                return value;
                            }
                            if (value.trim() === '') {
                                return null;
                            }
                        }
                        return +value; // cast to number
                    case pt.Boolean:
                        if (value === 'true') {
                            return true;
                        }
                        if (value === 'false') {
                            return false;
                        }
                        return !!value; // cast to bool
                    case pt.String:
                        return value + ''; // cast to string
                    case pt.Date:
                        return this._parseDate(value);
                    case pt.Enum:
                        if (typeof value === 'number') {
                            return value;
                        }
                        return this.enumType[value];
                    default:
                        return value;
                }
            };
            // Parsing DateTime values from string
            PropDescBase.prototype._parseDate = function (value) {
                if (value && wijmo.isString(value)) {
                    // For by-val attributes Angular converts a Date object to a
                    // string wrapped in quotation marks, so we strip them.
                    value = value.replace(/["']/g, '');
                    // parse date/time using RFC 3339 pattern
                    var dt = wijmo.changeType(value, wijmo.DataType.Date, 'r');
                    if (wijmo.isDate(dt)) {
                        return dt;
                    }
                }
                return value;
            };
            return PropDescBase;
        }());
        interop.PropDescBase = PropDescBase;
        // Property types as used in the PropDesc class.
        (function (PropertyType) {
            PropertyType[PropertyType["Boolean"] = 0] = "Boolean";
            PropertyType[PropertyType["Number"] = 1] = "Number";
            PropertyType[PropertyType["Date"] = 2] = "Date";
            PropertyType[PropertyType["String"] = 3] = "String";
            // Allows a value of any primitive type above, that can be parsed from string
            PropertyType[PropertyType["AnyPrimitive"] = 4] = "AnyPrimitive";
            PropertyType[PropertyType["Enum"] = 5] = "Enum";
            PropertyType[PropertyType["Function"] = 6] = "Function";
            PropertyType[PropertyType["EventHandler"] = 7] = "EventHandler";
            PropertyType[PropertyType["Any"] = 8] = "Any";
        })(interop.PropertyType || (interop.PropertyType = {}));
        var PropertyType = interop.PropertyType;
        // Gets a value that indicates whether the specified type is simple (true) or complex (false).
        function isSimpleType(type) {
            return type <= PropertyType.Enum;
        }
        interop.isSimpleType = isSimpleType;
        (function (BindingMode) {
            BindingMode[BindingMode["OneWay"] = 0] = "OneWay";
            BindingMode[BindingMode["TwoWay"] = 1] = "TwoWay";
        })(interop.BindingMode || (interop.BindingMode = {}));
        var BindingMode = interop.BindingMode;
        // Describes a scope event
        var EventDescBase = (function () {
            // Initializes a new instance of an EventDesc
            function EventDescBase(eventName, isPropChanged) {
                this._eventName = eventName;
                this._isPropChanged = isPropChanged;
            }
            Object.defineProperty(EventDescBase.prototype, "eventName", {
                // Gets the event name
                get: function () {
                    return this._eventName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventDescBase.prototype, "isPropChanged", {
                // Gets whether this event is a property change notification
                get: function () {
                    return this._isPropChanged === true;
                },
                enumerable: true,
                configurable: true
            });
            return EventDescBase;
        }());
        interop.EventDescBase = EventDescBase;
        // Describe property info for nested directives.
        var ComplexPropDescBase = (function () {
            function ComplexPropDescBase(propertyName, isArray, ownsObject) {
                if (ownsObject === void 0) { ownsObject = false; }
                this.isArray = false;
                this._ownsObject = false;
                this.propertyName = propertyName;
                this.isArray = isArray;
                this._ownsObject = ownsObject;
            }
            Object.defineProperty(ComplexPropDescBase.prototype, "ownsObject", {
                get: function () {
                    return this.isArray || this._ownsObject;
                },
                enumerable: true,
                configurable: true
            });
            return ComplexPropDescBase;
        }());
        interop.ComplexPropDescBase = ComplexPropDescBase;
        // Stores a control metadata as arrays of property, event and complex property descriptors.
        var MetaDataBase = (function () {
            function MetaDataBase(props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                this._props = [];
                this._events = [];
                this._complexProps = [];
                this.props = props;
                this.events = events;
                this.complexProps = complexProps;
                this.parentProperty = parentProperty;
                this.isParentPropertyArray = isParentPropertyArray;
                this.ownsObject = ownsObject;
                this.parentReferenceProperty = parentReferenceProperty;
                this.ngModelProperty = ngModelProperty;
            }
            Object.defineProperty(MetaDataBase.prototype, "props", {
                get: function () {
                    return this._props;
                },
                set: function (value) {
                    this._props = value || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MetaDataBase.prototype, "events", {
                get: function () {
                    return this._events;
                },
                set: function (value) {
                    this._events = value || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MetaDataBase.prototype, "complexProps", {
                get: function () {
                    return this._complexProps;
                },
                set: function (value) {
                    this._complexProps = value || [];
                },
                enumerable: true,
                configurable: true
            });
            // Adds the specified arrays to the end of corresponding arrays of this object, and overwrite the simple properties
            // if specified. Returns 'this'.
            MetaDataBase.prototype.add = function (props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                return this.addOptions({
                    props: props,
                    events: events,
                    complexProps: complexProps,
                    parentProperty: parentProperty,
                    isParentPropertyArray: isParentPropertyArray,
                    ownsObject: ownsObject,
                    parentReferenceProperty: parentReferenceProperty,
                    ngModelProperty: ngModelProperty
                });
                //this._props = this._props.concat(props || []);
                //this._events = this._events.concat(events || []);
                //this._complexProps = this._complexProps.concat(complexProps || []);
                //if (parentProperty !== undefined) {
                //    this.parentProperty = parentProperty;
                //}
                //if (isParentPropertyArray !== undefined) {
                //    this.isParentPropertyArray = isParentPropertyArray;
                //}
                //if (ownsObject !== undefined) {
                //    this.ownsObject = ownsObject;
                //}
                //if (parentReferenceProperty !== undefined) {
                //    this.parentReferenceProperty = parentReferenceProperty;
                //}
                //if (ngModelProperty !== undefined) {
                //    this.ngModelProperty = ngModelProperty;
                //}
                //return this;
            };
            MetaDataBase.prototype.addOptions = function (options) {
                for (var prop in options) {
                    var thisValue = this[prop], optionsValue = options[prop];
                    if (thisValue instanceof Array) {
                        this[prop] = thisValue.concat(optionsValue || []);
                    }
                    else if (optionsValue !== undefined) {
                        this[prop] = optionsValue;
                    }
                }
                return this;
            };
            // Prepares a raw defined metadata for a usage, for example sorts the props array on priority.
            MetaDataBase.prototype.prepare = function () {
                // stable sort of props on priority
                var baseArr = [].concat(this._props);
                this._props.sort(function (a, b) {
                    var ret = a.priority - b.priority;
                    if (!ret) {
                        ret = baseArr.indexOf(a) - baseArr.indexOf(b);
                    }
                    return ret;
                });
            };
            return MetaDataBase;
        }());
        interop.MetaDataBase = MetaDataBase;
    })(interop = wj.interop || (wj.interop = {}));
})(wj || (wj = {}));
//# sourceMappingURL=ControlMetaFactory.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        var MetaFactory = (function (_super) {
            __extends(MetaFactory, _super);
            function MetaFactory() {
                _super.apply(this, arguments);
            }
            // Override to return wijmo.angular.PropDesc
            MetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
            };
            // Override to return wijmo.angular.EventDesc
            MetaFactory.CreateEvent = function (eventName, isPropChanged) {
                return new EventDesc(eventName, isPropChanged);
            };
            // Override to return wijmo.angular.ComplexPropDesc
            MetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
                return new ComplexPropDesc(propertyName, isArray, ownsObject);
            };
            // Typecast override.
            MetaFactory.findProp = function (propName, props) {
                return wj.interop.ControlMetaFactory.findProp(propName, props);
            };
            // Typecast override.
            MetaFactory.findEvent = function (eventName, events) {
                return wj.interop.ControlMetaFactory.findEvent(eventName, events);
            };
            // Typecast override.
            MetaFactory.findComplexProp = function (propName, props) {
                return wj.interop.ControlMetaFactory.findComplexProp(propName, props);
            };
            return MetaFactory;
        }(wj.interop.ControlMetaFactory));
        angular.MetaFactory = MetaFactory;
        // Describes a scope property: name, type, binding mode. 
        // Also defines enum type and custom watcher function extender
        var PropDesc = (function (_super) {
            __extends(PropDesc, _super);
            // Initializes a new instance of a PropDesc
            function PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                _super.call(this, propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
                this._scopeBindingMode = this.propertyType === wj.interop.PropertyType.EventHandler ? '&' :
                    (this.bindingMode == wj.interop.BindingMode.OneWay &&
                        wj.interop.isSimpleType(this.propertyType) ? '@' : '=');
            }
            Object.defineProperty(PropDesc.prototype, "scopeBindingMode", {
                // Gets or sets the property binding mode ('@' - by val, '=' - by ref, '&' - expression)
                get: function () {
                    return this._scopeBindingMode;
                },
                set: function (value) {
                    this._scopeBindingMode = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDesc.prototype, "customHandler", {
                // Defines a custom handler function called before assigning a new value to the control property.
                // The handler may optionally return a 'true' value that indicates that assignment is handled 
                // by the handler and prevents the directive from performing the assignment by itself.
                get: function () {
                    return this._customHandler;
                },
                set: function (value) {
                    this._customHandler = value;
                },
                enumerable: true,
                configurable: true
            });
            return PropDesc;
        }(wj.interop.PropDescBase));
        angular.PropDesc = PropDesc;
        // Describes a scope event
        var EventDesc = (function (_super) {
            __extends(EventDesc, _super);
            function EventDesc() {
                _super.apply(this, arguments);
            }
            return EventDesc;
        }(wj.interop.EventDescBase));
        angular.EventDesc = EventDesc;
        // Describes property info for nested directives.
        var ComplexPropDesc = (function (_super) {
            __extends(ComplexPropDesc, _super);
            function ComplexPropDesc() {
                _super.apply(this, arguments);
            }
            return ComplexPropDesc;
        }(wj.interop.ComplexPropDescBase));
        angular.ComplexPropDesc = ComplexPropDesc;
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.MetaFactory.js.map
//
// AngularJS base directive class
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        // Base class for AngularJS directives (abstract class).
        var WjDirective = (function () {
            // Initializes a new instance of the DirectiveBase class 
            function WjDirective() {
                // Tells directive to replace or not original tag with the template
                this.replace = true;
                // Defines the way directive can be used in HTML
                this.restrict = 'E'; // all directives are HTML elements
                // Defines directive's template
                this.template = '<div />';
                // Tells directive to move content into template element marked with
                // 'ng-transclude' attribute
                this.transclude = false;
                //#endregion Settings
                // Directive property map
                // Holds PropDesc[] array with Wijmo control's properties available in directive's scope
                this._props = [];
                // Directive events map
                // Holds EventDesc[] array with Wijmo control's events available in directive's scope
                this._events = [];
                // Property descriptions used by nested directives.
                this._complexProps = [];
                var self = this;
                this._dirId = (++WjDirective._dirIdCounter) + '';
                this.link = this._postLinkFn();
                this.controller = ['$scope', '$parse', '$element', function ($scope, $parse, $element) {
                        // 'this' points to the controller instance here
                        self._$parse = $parse;
                        this[WjDirective._cntrlScopeProp] = $scope;
                        $scope[WjDirective._scopeChildrenProp] = [];
                        self._controllerImpl(this, $scope, $element);
                    }];
                this._initDirective();
            }
            Object.defineProperty(WjDirective.prototype, "_controlConstructor", {
                // Gets the constructor for the related Wijmo control. 
                // Abstract member, must be overridden in inherited class
                get: function () {
                    throw 'Abstract method call';
                },
                enumerable: true,
                configurable: true
            });
            // Gets the metadata ID, see the wijmo.interop.getMetaData method description for details.
            WjDirective.prototype._getMetaDataId = function () {
                return this._controlConstructor;
            };
            // Gets directive metadata.
            WjDirective.prototype._getMetaData = function () {
                return angular.MetaFactory.getMetaData(this._getMetaDataId());
            };
            // Initializes DDO properties
            WjDirective.prototype._initDirective = function () {
                this._initSharedMeta();
                this._prepareProps();
                this._initEvents();
                this._initScopeEvents();
                this._initScopeDescription();
            };
            // Initialize _props, _events and _complexProps with the shared metadata from wijmo.interop.ControlMetaFactory.
            WjDirective.prototype._initSharedMeta = function () {
                var meta = this._getMetaData();
                this._props = meta.props;
                this._events = meta.events;
                this._complexProps = meta.complexProps;
                this._property = meta.parentProperty;
                this._isPropertyArray = meta.isParentPropertyArray;
                this._ownObject = meta.ownsObject;
                this._parentReferenceProperty = meta.parentReferenceProperty;
                this._ngModelProperty = meta.ngModelProperty;
                // add wjRequired and wjDisabled wrapper properties
                var prop = angular.MetaFactory.findProp('required', this._props);
                if (prop) {
                    var idx = this._props.indexOf(prop);
                    if (idx > -1) {
                        var propDesc = new angular.PropDesc('wjRequired', wj.interop.PropertyType.Boolean);
                        propDesc.customHandler = function (scope, control, value) {
                            control['required'] = value;
                        };
                        this._props.splice(idx + 1, 0, propDesc);
                    }
                }
            };
            // Initializes control's property map. Abstract member, must be overridden in inherited class
            WjDirective.prototype._initProps = function () {
            };
            // Initializes control's event map. Abstract member, must be overridden in inherited class
            WjDirective.prototype._initEvents = function () {
            };
            // Creates and returns WjLink instance pertain to the directive.
            WjDirective.prototype._createLink = function () {
                return new WjLink();
            };
            // Implements a controller body, override it to implement a custom controller logic.
            // controller - a pointer to controller object.
            // scope - controller (and corresponding WjLink) scope.
            //
            // The DDO.controller property is occupied by our wrapper that creates a controller with the _cntrlScope property assigned
            // to the controller's scope. The wrapper then calls this method that is intended to implement a custom controller logic.
            WjDirective.prototype._controllerImpl = function (controller, scope, tElement) {
            };
            // Initializes control owned by the directive 
            WjDirective.prototype._initControl = function (element) {
                // Try to create Wijmo Control if directive is related to any
                try {
                    var controlConstructor = this._controlConstructor;
                    var control = new controlConstructor(element);
                    return control;
                }
                // if not - do nothing
                catch (e) {
                    // Do nothing. Return 'undefined' explicitly
                    return undefined;
                }
            };
            // Indicates whether this directive can operate as a child directive.
            WjDirective.prototype._isChild = function () {
                return this._isParentInitializer() || this._isParentReferencer();
            };
            // Indicates whether this directive operates as a child directive that initializes a property of its parent.
            WjDirective.prototype._isParentInitializer = function () {
                return this._property != undefined;
            };
            // Indicates whether this directive operates as a child directive that references a parent in its property or
            // a constructor.
            WjDirective.prototype._isParentReferencer = function () {
                return this._parentReferenceProperty != undefined;
            };
            // For the specified scope/control property name returns its corresponding directive tag attribute name.
            WjDirective.prototype._scopeToAttrName = function (scopeName) {
                var alias = this.scope[scopeName];
                if (alias) {
                    var bindMarkLen = 1, aliasLen = alias.length;
                    if (aliasLen < 2) {
                        return scopeName;
                    }
                    if (alias.charAt(1) === '?') {
                        bindMarkLen = 2;
                    }
                    if (aliasLen === bindMarkLen) {
                        return scopeName;
                    }
                    return alias.substr(bindMarkLen);
                }
                return scopeName;
            };
            WjDirective.prototype._getComplexPropDesc = function (propName) {
                return angular.MetaFactory.findComplexProp(propName, this._complexProps);
            };
            // Extends control's property map with events
            // Do not confuse with _initEvents(), which is abstract.
            WjDirective.prototype._initScopeEvents = function () {
                for (var i in this._events) {
                    var event = this._events[i];
                    this._props.push(new angular.PropDesc(event.eventName, wj.interop.PropertyType.EventHandler));
                }
            };
            // Creates isolated scope based on directive property map
            WjDirective.prototype._initScopeDescription = function () {
                var props = this._props, scope = {}, 
                // 1.1.1
                byRefMark = WjDirective._optionalAttr ? '=?' : '=';
                // fill result object with control properties
                if (props != null) {
                    var prop;
                    for (var i = 0; i < props.length; i++) {
                        prop = props[i];
                        scope[prop.propertyName] = prop.scopeBindingMode;
                        //1.1.1
                        if (WjDirective._optionalAttr && prop.scopeBindingMode == '=')
                            scope[prop.propertyName] = '=?';
                    }
                    if (scope['required']) {
                        scope['wjRequired'] = scope['required'];
                    }
                }
                // add property for control
                scope['control'] = byRefMark;
                scope[WjDirective._initPropAttr] = byRefMark;
                scope[WjDirective._initEventAttr] = '&';
                scope[WjDirective._parPropAttr] = '@';
                scope[WjDirective._wjModelPropAttr] = '@';
                // save result
                this.scope = scope;
            };
            // Returns the directive's 'link' function.
            // This is a virtual method, can be overridden by derived classes.
            // @param beforeLinkDelegate Delegate to run before the link function
            // @param afterLinkDelegate Delegate to run after the link function
            // @return Directive's link function
            WjDirective.prototype._postLinkFn = function () {
                var self = this;
                // Final directive link function
                var linkFunction = function (scope, tElement, tAttrs, controller) {
                    var link = self._createLink();
                    link.directive = self;
                    link.scope = scope;
                    link.tElement = tElement;
                    link.tAttrs = tAttrs;
                    if (wijmo.isArray(controller)) {
                        var parEl = tElement.parent();
                        // If working Angular version supports the isolateScope function then we use it, because in this case
                        // the scope function returns a non-isolated scope; otherwise we use scope that returns an isolated scope
                        // in this case.
                        var scopeFunc = parEl.isolateScope || parEl.scope;
                        var parScope = scopeFunc.call(parEl);
                        for (var i in controller) {
                            var curCntrl = controller[i];
                            if (curCntrl != undefined) {
                                //if (!link.controller) {
                                if (curCntrl[WjDirective._cntrlScopeProp] === scope) {
                                    //require parent controller by name
                                    curCntrl = tElement.parent().controller(self._stripRequire(+i));
                                }
                                if (curCntrl && curCntrl[WjDirective._cntrlScopeProp] === parScope) {
                                    link.controller = curCntrl;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        link.controller = controller;
                    }
                    link.ngModel = tElement.controller('ngModel');
                    link._link();
                };
                return linkFunction;
            };
            // Gathers PropertyDesc(s) and sorts them (using stable sort) in a priority order.
            WjDirective.prototype._prepareProps = function () {
                // gather property descriptors
                this._initProps();
                // stable sort on priority
                var baseArr = [].concat(this._props);
                this._props.sort(function (a, b) {
                    var ret = a.priority - b.priority;
                    if (!ret) {
                        ret = baseArr.indexOf(a) - baseArr.indexOf(b);
                    }
                    return ret;
                });
            };
            // For the 'require' property represented by an array, returns its value at the specified index stripped of a leading specifier.
            WjDirective.prototype._stripRequire = function (index) {
                if (!this._stripReq) {
                    this._stripReq = [];
                    this._stripReq.length = this['require'].length;
                }
                if (!this._stripReq[index]) {
                    var patt = /^[^A-Za-z]*(.*)/;
                    var res = patt.exec(this['require'][index]);
                    this._stripReq[index] = res ? res[1] : '';
                }
                return this._stripReq[index];
            };
            // Gets a directive unique ID
            WjDirective.prototype._getId = function () {
                return this._dirId;
            };
            // Determines whether the specified version is not older than the current Angular version.
            WjDirective._versionOk = function (minVer) {
                var angVer = window['angular'].version;
                var angVerParts = [angVer.major, angVer.minor, angVer.dot];
                var verParts = minVer.split(".");
                if (verParts.length !== angVerParts.length)
                    throw 'Unrecognizable version number.';
                for (var i = 0; i < verParts.length; i++) {
                    if (angVerParts[i] < verParts[i]) {
                        return false;
                    }
                    else if (angVerParts[i] > verParts[i]) {
                        return true;
                    }
                }
                return true;
            };
            // removes ng-transclude from the specified elements and all its child elements
            WjDirective._removeTransclude = function (html) {
                if (!html) {
                    return html;
                }
                var root = document.createElement('div');
                root.innerHTML = html;
                var transNodes = root.querySelectorAll('[ng-transclude]');
                [].forEach.call(transNodes, function (elem, idx) {
                    elem.removeAttribute('ng-transclude');
                });
                return root.innerHTML;
            };
            // Name of the child directive attribute defining a parent property name to assign to.
            WjDirective._parPropAttr = 'wjProperty';
            // Name of the attribute that allows to specify an alternative control property controlled by the ng-model directive.
            WjDirective._wjModelPropAttr = 'wjModelProperty';
            // Name of the attribute that provides the 'initialized' state value.
            WjDirective._initPropAttr = 'isInitialized';
            // Name of the attribute representing the 'initialized' event.
            WjDirective._initEventAttr = 'initialized';
            // Name of the property storing a reference to controller (link) scope in controllers.
            WjDirective._cntrlScopeProp = '_cntrlScope';
            // Name of the property in controller storing a reference to a link owning this controller.
            // Warning: the name must begin with '$', in order to not break tools like ng-inspector - this differentiate
            // special scope properties from scope's data properties.
            WjDirective._cntrlLinkProp = '$_thisLink';
            // Name of the scope property storing a collection of child links.
            WjDirective._scopeChildrenProp = '$_childLinks';
            // Name of an attribute storing a directive ID
            WjDirective._dirIdAttr = 'wj-directive-id';
            // Indicates whether optional scope attributes ('=?') are supported by the current version of Angular.
            WjDirective._optionalAttr = WjDirective._versionOk("1.1.4");
            // Indicates whether DDO.template function is supported by the current version of Angular.
            WjDirective._dynaTemplates = WjDirective._optionalAttr;
            // Attribute prefixes stripped by Angular
            WjDirective._angStripPrefixes = ['data', 'x'];
            WjDirective._dirIdCounter = 0;
            return WjDirective;
        }());
        angular.WjDirective = WjDirective;
        var WjLink = (function () {
            function WjLink() {
                // Hash containing <property name> - true pairs for scope properties that can't be assigned.
                this._nonAssignable = {};
                // Hash containing <property name> - PropDesc pairs for all properties that have defined tag attributes.
                this._definedProps = {};
                // Hash containing <event name> - EventDesc pairs for all events that have defined tag attributes.
                this._definedEvents = {};
                // Hash containing <property name> - any pairs containing previous scope values for the $watch function. 
                this._oldValues = {};
                /* private */ this._isInitialized = false;
                this._hasTriggeredInitialized = false;
                this._isNgModelInitialized = false;
                this._scopeSuspend = 0;
                this._suspendedEvents = [];
                this._areChlildrenReady = false;
                this._isDestroyed = false;
                // #region 'initialized' stuff
                this._isAppliedToParent = false;
            }
            WjLink.prototype._link = function () {
                var dir = this.directive, self = this;
                this.tElement[0].setAttribute(WjDirective._dirIdAttr, dir._getId());
                this.directiveTemplateElement = dir.replace ? this.tElement : window['angular'].element(this.tElement.children()[0]);
                this._initNonAssignable();
                if (this._isChild()) {
                    //Defines initial _parentPropDesc, which can be overridden later in the _parentReady method.
                    this._parentPropDesc = new angular.ComplexPropDesc(dir._property, dir._isPropertyArray, dir._ownObject);
                    // Register this link as a child in the parent link's scope and postpone initialization
                    this.controller[WjDirective._cntrlScopeProp][WjDirective._scopeChildrenProp].push(this);
                    var parentScope = this.controller[WjDirective._cntrlScopeProp], parentLink = parentScope[WjDirective._cntrlLinkProp];
                    if (parentLink && parentLink._areChlildrenReady) {
                        this._parentReady(parentLink);
                    }
                }
                else {
                    this._createInstance();
                    this._notifyReady();
                    this._prepareControl();
                }
                this._destroyEhUnreg = this.scope.$on('$destroy', function (event) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    self._destroy();
                });
            };
            // This method can be overridden to implement custom application of child directives. Child directives are already 
            // initialized at this moment. 
            WjLink.prototype._onChildrenReady = function () {
            };
            WjLink.prototype._createInstance = function () {
                this.control = this._initControl();
                this._safeApply(this.scope, 'control', this.control);
            };
            // This method is called by the parent link for the child link to notify that parent link's control is created.
            WjLink.prototype._parentReady = function (parentLink) {
                if (!this._isChild())
                    return;
                var self = this;
                // In case where parent property name is defined via attribute by a user, in early Angular versions (e.g. 1.1.1)
                // the scope is not initialized with attribute values defined on directive tag. To manage this we watch this attribute
                // and init the link when its value appears.
                if (this._isAttrDefined(WjDirective._parPropAttr) && !this.scope[WjDirective._parPropAttr]) {
                    this.scope.$watch(WjDirective._parPropAttr, function () {
                        self._parentReady(parentLink);
                    });
                    return;
                }
                var parProp = this._getParentProp();
                //Override _parentPropDesc if it's defined for the servicing property in the parent link's directive.
                var parPropDescOverride = parentLink.directive._getComplexPropDesc(parProp);
                if (parPropDescOverride) {
                    this._parentPropDesc = parPropDescOverride;
                }
                else {
                    this._parentPropDesc.propertyName = parProp;
                }
                this.parent = parentLink;
                if (this._useParentObj()) {
                    this.control = parentLink.control[parProp];
                    this._safeApply(this.scope, 'control', this.control);
                }
                else {
                    this._createInstance();
                }
                this._notifyReady();
                this._prepareControl();
                this._initParent();
                this.directiveTemplateElement[0].style.display = 'none';
                this._appliedToParent();
            };
            // Assigns/adds this directive's object to the parent object.
            WjLink.prototype._initParent = function () {
                if (this._useParentObj())
                    return;
                var dir = this.directive, propName = this._getParentProp(), parCtrl = this.parent.control, ctrl = this.control;
                if (this._isParentInitializer()) {
                    if (this._isParentArray()) {
                        // insert child at correct index, which is the same as an index of the directive element amid sibling directives
                        // of the same type
                        var parArr = parCtrl[propName], linkIdx = this._getIndex();
                        if (linkIdx < 0 || linkIdx >= parArr.length) {
                            linkIdx = parArr.length;
                        }
                        parArr.splice(linkIdx, 0, ctrl);
                        var self = this;
                        this._siblingInsertedEH = this._siblingInserted.bind(this);
                        this.tElement[0].addEventListener('DOMNodeInserted', this._siblingInsertedEH);
                    }
                    else {
                        parCtrl[propName] = ctrl;
                    }
                }
                if (this._isParentReferencer() && !this._parentInCtor()) {
                    ctrl[this._getParentReferenceProperty()] = parCtrl;
                }
            };
            // Performes directive removal (currently called for child directives only).
            WjLink.prototype._destroy = function () {
                if (this._isDestroyed) {
                    return;
                }
                this._isDestroyed = true;
                var control = this.control;
                if (this._destroyEhUnreg) {
                    //this._destroyEhUnreg();
                    this._destroyEhUnreg = null;
                }
                if (this._siblingInsertedEH) {
                    this.tElement[0].removeEventListener('DOMNodeInserted', this._siblingInsertedEH);
                }
                if (this._isParentArray() && !this.parent._isDestroyed) {
                    var parControl = this.parent.control, parProp = this._getParentProp();
                    if (parControl && parProp && control) {
                        var parArr = parControl[parProp];
                        if (parArr) {
                            var idx = parArr.indexOf(control);
                            if (idx >= 0) {
                                parArr.splice(idx, 1);
                            }
                        }
                    }
                }
                if (control instanceof wijmo.Control) {
                    // We call dispose() with a delay, to get directives such as ng-if/ng-repeat a chance to remove its child subtree
                    // before the control will be disposed. Otherwise, Control.dispose() replaces its host element with an assignment 
                    // to outerHTML, that creates an element clone in its parent with a different pointer, not the one that
                    // ng-if stores locally, so this clone is out of ng-if control and stays in DOM forever.
                    setTimeout(function () {
                        if (control.hostElement) {
                            control.dispose();
                        }
                    }, 0);
                }
            };
            WjLink.prototype._siblingInserted = function (e) {
                if (e.target === this.tElement[0]) {
                    var lIdx = this._getIndex(), parArr = this.parent.control[this._getParentProp()], ctrl = this.control, arrIdx = parArr.indexOf(ctrl);
                    if (lIdx >= 0 && arrIdx >= 0 && lIdx !== arrIdx) {
                        parArr.splice(arrIdx, 1);
                        lIdx = Math.min(lIdx, parArr.length);
                        parArr.splice(lIdx, 0, ctrl);
                    }
                }
            };
            // Notify child links after this directive was attached to its control.
            WjLink.prototype._notifyReady = function () {
                // Notify child links
                //
                this.scope[WjDirective._cntrlLinkProp] = this;
                //
                var childLinks = [].concat(this.scope[WjDirective._scopeChildrenProp]);
                for (var i = 0; i < childLinks.length; i++) {
                    childLinks[i]._parentReady(this);
                }
                // Clear children list to free references for GC.
                //childLinks.length = 0; //cleared one by one by the _childInitialized method
                this._areChlildrenReady = true;
                this._onChildrenReady();
            };
            // Creates a control instance owned by the directive. 
            WjLink.prototype._initControl = function () {
                return this.directive._initControl(this._parentInCtor() ? this.parent.control : this.directiveTemplateElement[0]);
            };
            // Defines scope's default values, registers properties watchers and event handlers
            WjLink.prototype._prepareControl = function () {
                this._addEventHandlers();
                this._addWatchers();
            };
            // Sets control's default values to scope properties
            WjLink.prototype._setupScopeWithControlProperties = function () {
                var prop, name, scopeValue, controlValue, control = this.control, scope = this.scope, props = this.directive._props;
                for (var i = 0; i < props.length; i++) {
                    prop = props[i];
                    if (prop.scopeBindingMode === '=' && prop.isNativeControlProperty && prop.shouldUpdateSource) {
                        name = prop.propertyName;
                        scopeValue = scope[name];
                        controlValue = control[name];
                        var isFunction = prop.propertyType == wj.interop.PropertyType.Function;
                        var isEventHandler = prop.propertyType == wj.interop.PropertyType.EventHandler;
                        if (this._canApply(scope, prop.propertyName) && controlValue != scopeValue && !isFunction && !isEventHandler) {
                            scope[prop.propertyName] = controlValue;
                        }
                    }
                }
                if (!scope['$root'].$$phase) {
                    scope.$apply();
                }
            };
            WjLink.prototype._initNonAssignable = function () {
                var parse = this.directive._$parse, scopeDef = this.directive.scope, 
                //props = Object.getOwnPropertyNames(scopeDef),
                binding;
                for (var name in scopeDef) {
                    if (scopeDef[name].charAt(0) === '=') {
                        binding = this.tAttrs[this.directive._scopeToAttrName(name)];
                        if (binding === undefined || parse(binding).assign == undefined) {
                            this._nonAssignable[name] = true;
                        }
                    }
                }
            };
            WjLink.prototype._suspendScope = function () {
                this._scopeSuspend++;
            };
            WjLink.prototype._resumeScope = function () {
                if (this._scopeSuspend > 0) {
                    if (--this._scopeSuspend === 0 && this._suspendedEvents.length > 0) {
                        this._updateScope();
                    }
                }
            };
            WjLink.prototype._isScopeSuspended = function () {
                return this._scopeSuspend > 0;
            };
            WjLink.prototype._isAttrDefined = function (name) {
                return this.tAttrs.$attr[this.directive._scopeToAttrName(name)] != null;
            };
            // Called by child link when its fully initialized
            WjLink.prototype._childInitialized = function (child) {
                var childLinks = this.scope[WjDirective._scopeChildrenProp], idx = childLinks.indexOf(child);
                if (idx >= 0) {
                    childLinks.splice(idx, 1);
                    this._checkRaiseInitialized();
                }
            };
            // Called after first watch on this links has worked out.
            WjLink.prototype._thisInitialized = function () {
                this._checkRaiseInitialized();
            };
            // Called after this control and all its child directives were initialized.
            WjLink.prototype._initialized = function () {
            };
            // For the child link, called after this link has applied (added to array, assigned) its object to the parent.
            WjLink.prototype._appliedToParent = function () {
                this._isAppliedToParent = true;
                this._checkRaiseInitialized();
            };
            WjLink.prototype._checkRaiseInitialized = function () {
                if (!this._hasTriggeredInitialized && this.scope[WjDirective._scopeChildrenProp].length === 0 && this._isInitialized
                    && (!this._isChild() || this._isAppliedToParent)) {
                    this._hasTriggeredInitialized = true;
                    this._initialized();
                    // set the scope isInitialized property to true
                    this._safeApply(this.scope, WjDirective._initPropAttr, true);
                    // raise the initialized event
                    var handler = this.scope[WjDirective._initEventAttr], self = this;
                    if (handler) {
                        // delay the event to allow the 'isInitialized' property value be propagated to a controller scope before 
                        // the event is raised
                        setTimeout(function () {
                            handler({ s: self.control, e: undefined });
                        }, 0);
                    }
                    //notify parent
                    if (this._isChild() && this.parent) {
                        this.parent._childInitialized(this);
                    }
                }
            };
            //#endregion 'initialized' stuff
            // Adds watchers for scope properties to update control values
            WjLink.prototype._addWatchers = function () {
                var self = this, props = this.directive._props, scope = this.scope;
                if (!props) {
                    return;
                }
                if (this.ngModel) {
                    var ngModel = this.ngModel;
                    // Patch: in Angular 1.3+ these classes are initially set but then removed by Angular,
                    // probably because directive's replace=true ???
                    if (ngModel.$pristine) {
                        wijmo.addClass(this.tElement[0], 'ng-pristine');
                    }
                    if (ngModel.$valid) {
                        wijmo.addClass(this.tElement[0], 'ng-valid');
                    }
                    if (ngModel.$untouched) {
                        wijmo.addClass(this.tElement[0], 'ng-untouched');
                    }
                    // end patch
                    ngModel.$render = this._ngModelRender.bind(this);
                    this._updateNgModelPropDesc();
                    if (this._isAttrDefined(WjDirective._wjModelPropAttr)) {
                        scope.$watch(WjDirective._wjModelPropAttr, function () {
                            self._updateNgModelPropDesc();
                            self._ngModelRender();
                        });
                    }
                }
                var i, name, prop;
                for (i = 0; i < props.length; i++) {
                    prop = props[i];
                    name = prop.propertyName;
                    if (prop.propertyType !== wj.interop.PropertyType.EventHandler && this._isAttrDefined(name)) {
                        this._definedProps[name] = prop;
                    }
                }
                var control = this.control;
                scope.$watch(function (scope) {
                    if (self._isDestroyed) {
                        return;
                    }
                    try {
                        var assignValues = {};
                        for (var name in self._definedProps) {
                            if (scope[name] !== self._oldValues[name]) {
                                assignValues[name] = scope[name];
                            }
                        }
                        for (var name in assignValues) {
                            var newVal = assignValues[name], oldVal = self._oldValues[name];
                            if (newVal !== oldVal) {
                                self._oldValues[name] = newVal;
                                if (self._isInitialized || newVal !== undefined) {
                                    // get value from scope
                                    var prop = self._definedProps[name], value = self._nullOrValue(self._castValueToType(newVal, prop));
                                    // check that the control value is out-of-date
                                    var oldCtrlVal = control[name];
                                    if (oldCtrlVal != value) {
                                        // invoke custom handler (if any) to handle the change
                                        var handled = false;
                                        if (prop.customHandler != null) {
                                            handled = prop.customHandler(scope, control, value, oldCtrlVal, self);
                                        }
                                        // apply value to control if it's a native property
                                        // (as opposed to directive-only property) and if custom handler
                                        // didn't signal that the assignment is already handled
                                        if (prop.isNativeControlProperty && handled !== true) {
                                            control[name] = value;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    finally {
                        if (!self._isInitialized) {
                            self._isNgModelInitialized = true;
                            //TBD: apply it according to the associated property's priority order
                            if (self.ngModel) {
                                if (self.ngModel.$viewValue !== undefined) {
                                    self._ngModelRender();
                                }
                                else if (self._ngModelPropDesc) {
                                    self.ngModel.$setViewValue(control[self._ngModelPropDesc.propertyName]);
                                    self.ngModel.$setPristine();
                                }
                            }
                            self._isInitialized = true;
                            self._setupScopeWithControlProperties();
                            self._thisInitialized();
                        }
                    }
                });
            };
            // Adds handlers for control events
            WjLink.prototype._addEventHandlers = function () {
                var i, event, evList = this.directive._events;
                for (i = 0; i < evList.length; i++) {
                    event = evList[i];
                    this._addEventHandler(event); // avoiding 'i' closure
                }
            };
            WjLink.prototype._addEventHandler = function (eventDesc) {
                var self = this, eventName = eventDesc.eventName, controlEvent = this.control[eventName];
                // check that the event name is valid
                if (controlEvent == null) {
                    throw 'Event "' + eventName + '" not found in ' + self.constructor.name;
                }
                var isDefined = this._isAttrDefined(eventName);
                if (isDefined) {
                    this._definedEvents[eventName] = eventDesc;
                }
                else if (!eventDesc.isPropChanged) {
                    // don't subscribe if event is neither subscribed nor "isPropChanged" event.
                    return;
                }
                var scope = this.scope, props = this.directive._props, control = this.control;
                // add the event handler
                controlEvent.addHandler(function (s, e) {
                    var eventInfo = { eventDesc: eventDesc, s: s, e: e };
                    if (self._isScopeSuspended()) {
                        self._suspendedEvents.push(eventInfo);
                    }
                    else {
                        self._updateScope(eventInfo);
                    }
                }, control);
            };
            // Updates scope values with control values for two-way bindings.
            WjLink.prototype._updateScope = function (eventInfo) {
                if (eventInfo === void 0) { eventInfo = null; }
                if (this._isDestroyed) {
                    return;
                }
                // apply changes to scope
                var update = eventInfo ? eventInfo.eventDesc.isPropChanged :
                    this._suspendedEvents.some(function (value) {
                        return value.eventDesc.isPropChanged;
                    }), self = this;
                //var hasChanges = false;
                if (update) {
                    var props = this.directive._props;
                    for (var i = 0; i < props.length; i++) {
                        var p = props[i];
                        if (p.scopeBindingMode == '=' && p.isNativeControlProperty && p.shouldUpdateSource) {
                            var name = p.propertyName, value = this.control[name];
                            if (this._shouldApply(this.scope, name, value)) {
                                this.scope[name] = value;
                                //
                                this.directive._$parse(this.tAttrs[this.directive._scopeToAttrName(name)]).assign(this.scope.$parent, value);
                            }
                            if (this._ngModelPropDesc && this._isInitialized &&
                                this._ngModelPropDesc.propertyName == name && this.ngModel.$viewValue !== value) {
                                this.ngModel.$setViewValue(value);
                            }
                        }
                    }
                }
                var raiseEvents = function () {
                    var suspEvArr = eventInfo ? [eventInfo] : this._suspendedEvents;
                    //for (var i in suspEvArr) { 
                    for (var i = 0; i < suspEvArr.length; i++) {
                        var suspInfo = suspEvArr[i], eventName = suspInfo.eventDesc.eventName, scopeHandler = this.scope[eventName];
                        if (self._definedEvents[eventName] && scopeHandler) {
                            scopeHandler({ s: suspInfo.s, e: suspInfo.e });
                        }
                    }
                    if (!eventInfo) {
                        this._suspendedEvents.length = 0;
                    }
                }.bind(this);
                if (update) {
                    if (!this.scope['$root'].$$phase) {
                        this.scope.$apply();
                    }
                    else {
                        // We may be in a call to directive's scope $watch finalizing the digest, so there is a chance that 
                        // there will be no more digests and changes made here to directive scope will not propagate to controller
                        // scope. To manage with this we initiate one more digest cycle by adding a dummy watch to the scope.
                        // We don't use setTimeout($apply(), 0) for this purpose to guarantee that all changes will be applied
                        // in this digest where we are now.
                        var dispose = this.scope.$watch('value', function () {
                            // dispose the watch right away
                            dispose();
                            //raiseEvents();
                        });
                    }
                }
                raiseEvents();
            };
            // ngModel.$render function implementation
            WjLink.prototype._ngModelRender = function () {
                if (!this._isNgModelInitialized) {
                    return;
                }
                var viewValue = this.ngModel.$viewValue, propDesc = this._ngModelPropDesc;
                if (!propDesc || viewValue === undefined && !this._isInitialized) {
                    return;
                }
                var value = this._nullOrValue(this._castValueToType(viewValue, propDesc));
                if (viewValue !== this.control[propDesc.propertyName]) {
                    this.control[propDesc.propertyName] = viewValue;
                }
            };
            // Casts value to the property type
            WjLink.prototype._castValueToType = function (value, prop) {
                return prop.castValueToType(value);
                //if (value == undefined) {
                //    //return undefined;
                //    return value;
                //}
                //var type = prop.propertyType;
                //switch (type) {
                //    case wijmo.interop.PropertyType.Number:
                //        if (typeof value == 'string') {
                //            if (value.indexOf('*') >= 0) { // hack for star width ('*', '2*'...)
                //                return value;
                //            }
                //            if (value.trim() === '') { // binding to an empty html input means null
                //                return null;
                //            }
                //        }
                //        return +value; // cast to number
                //    case wijmo.interop.PropertyType.Boolean:
                //        if (value === 'true') {
                //            return true;
                //        }
                //        if (value === 'false') {
                //            return false;
                //        }
                //        return !!value; // cast to bool
                //    case wijmo.interop.PropertyType.String:
                //        return value + ''; // cast to string
                //    case wijmo.interop.PropertyType.Date:
                //        return this._parseDate(value);
                //    case wijmo.interop.PropertyType.Enum:
                //        if (typeof value === 'number') {
                //            return value;
                //        }
                //        return prop.enumType[value];
                //    default:
                //        return value;
                //}
            };
            //// Parsing DateTime values from string
            //private _parseDate(value) {
            //    if (value && wijmo.isString(value)) {
            //        // For by-val attributes Angular converts a Date object to a
            //        // string wrapped in quotation marks, so we strip them.
            //        value = value.replace(/["']/g, '');
            //        // parse date/time using RFC 3339 pattern
            //        var dt = changeType(value, DataType.Date, 'r');
            //        if (isDate(dt)) {
            //            return dt;
            //        }
            //    }
            //    return value;
            //}
            //Determines whether this is a child link.
            //NOTE: functionality is *not* based on _parentPropDesc
            WjLink.prototype._isChild = function () {
                return this.directive._isChild();
            };
            // Indicates whether this directive operates as a child directive that initializes a property of its parent.
            WjLink.prototype._isParentInitializer = function () {
                return this.directive._isParentInitializer();
            };
            // Indicates whether this directive operates as a child directive that references a parent in its property or
            // a constructor.
            WjLink.prototype._isParentReferencer = function () {
                return this.directive._isParentReferencer();
            };
            //For the child directives returns parent's property name that it services. Property name defined via
            //the wjProperty attribute of directive tag has priority over the directive._property definition.
            //NOTE: functionality is *not* based on _parentPropDesc
            WjLink.prototype._getParentProp = function () {
                return this._isParentInitializer() ? this.scope[WjDirective._parPropAttr] || this.directive._property : undefined;
            };
            // For a child directive, the name of the property of the directive's underlying object that receives the reference
            // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
            // underlying object's constructor parameter.
            WjLink.prototype._getParentReferenceProperty = function () {
                return this.directive._parentReferenceProperty;
            };
            // Determines whether the child link uses an object created by the parent property, instead of creating it by
            // itself, and thus object's initialization should be delayed until parent link's control is created.
            //IMPORTANT: functionality is *based* on _parentPropDesc
            WjLink.prototype._useParentObj = function () {
                return !this._isParentReferencer() &&
                    this._isParentInitializer() && !this._parentPropDesc.isArray && !this._parentPropDesc.ownsObject;
            };
            // For the child link, determines whether the servicing parent property is an array.
            //IMPORTANT: functionality is *based* on _parentPropDesc
            WjLink.prototype._isParentArray = function () {
                return this._isParentInitializer() && this._parentPropDesc.isArray;
            };
            // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
            // constructor.
            WjLink.prototype._parentInCtor = function () {
                return this._isParentReferencer() && this._getParentReferenceProperty() == '';
            };
            WjLink.prototype._getNgModelProperty = function () {
                return this.scope[WjDirective._wjModelPropAttr] || this.directive._ngModelProperty;
            };
            WjLink.prototype._updateNgModelPropDesc = function () {
                var ngModelProp = this._getNgModelProperty();
                this._ngModelPropDesc = wijmo.isNullOrWhiteSpace(ngModelProp) ?
                    null :
                    angular.MetaFactory.findProp(ngModelProp, this.directive._props);
            };
            // apply value to scope and notify
            WjLink.prototype._safeApply = function (scope, name, value) {
                // check that value and scope are defined, and that value changed
                if (this._shouldApply(scope, name, value)) {
                    // apply new value to scope and notify
                    scope[name] = value;
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
                }
            };
            // Detrmines whether value should be assigned to scope[name], depending on optional attribute support in current Angular version.
            WjLink.prototype._shouldApply = function (scope, name, value) {
                return this._canApply(scope, name) && value != scope[name];
            };
            // Detrmines whether scope[name] can be safely updated without getting an exception.
            WjLink.prototype._canApply = function (scope, name) {
                return !this._nonAssignable[name];
            };
            // Returns null for undefined or null value; otherwise, the original value.
            WjLink.prototype._nullOrValue = function (value) {
                return value != undefined ? value : null;
            };
            // Gets an index of this link among another links pertain to the same directive type.
            WjLink.prototype._getIndex = function () {
                var thisEl = this.tElement[0], parEl = thisEl.parentElement;
                // If parentElement is null, e.g. because this element is temporary in DocumentFragment, the index
                // of the element isn't relevant to the item's position in the array, so we return -1 and thus force
                // a calling code to not reposition the item in the array at all.  
                if (!parEl) {
                    return -1;
                }
                var siblings = parEl.childNodes, idx = -1, dirId = this.directive._getId();
                for (var i = 0; i < siblings.length; i++) {
                    var curEl = siblings[i];
                    if (curEl.nodeType == 1 && curEl.getAttribute(WjDirective._dirIdAttr) == dirId) {
                        ++idx;
                        if (curEl === thisEl) {
                            return idx;
                        }
                    }
                }
                return -1;
            };
            return WjLink;
        }());
        angular.WjLink = WjLink;
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.directiveBase.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        //#region "Container directives registration"
        var wijmoContainers = window['angular'].module('wj.container', []);
        wijmoContainers.directive('wjTooltip', [function () {
                return new WjTooltip();
            }]);
        wijmoContainers.directive('wjValidationError', [function () {
                return new WjValidationError();
            }]);
        //#endregion "Container directives definitions"
        //#region "Container directives classes"
        /**
         * AngularJS directive for the @see:Tooltip class.
         *
         * Use the <b>wj-tooltip</b> directive to add tooltips to elements on the page.
         * The wj-tooltip directive supports HTML content, smart positioning, and touch.
         *
         * The wj-tooltip directive is specified as a parameter added to the
         * element that the tooltip applies to. The parameter value is the tooltip
         * text or the id of an element that contains the text. For example:
         *
         * <pre>&lt;p wj-tooltip="#fineprint" &gt;
         *     Regular paragraph content...&lt;/p&gt;
         * ...
         * &lt;div id="fineprint" style="display:none"&gt;
         *   &lt;h3&gt;Important Note&lt;/h3&gt;
         *   &lt;p&gt;
         *     Data for the current quarter is estimated
         *     by pro-rating etc.&lt;/p&gt;
         * &lt;/div&gt;</pre>
         */
        var WjTooltip = (function (_super) {
            __extends(WjTooltip, _super);
            // Initializes a new instance of WjTooltip
            function WjTooltip() {
                _super.call(this);
                this.restrict = 'A';
                this.template = '';
            }
            Object.defineProperty(WjTooltip.prototype, "_controlConstructor", {
                // Returns Wijmo Tooltip control constructor
                get: function () {
                    return wijmo.Tooltip;
                },
                enumerable: true,
                configurable: true
            });
            WjTooltip.prototype._initControl = function (element) {
                return new wijmo.Tooltip();
            };
            WjTooltip.prototype._createLink = function () {
                return new WjTooltipLink();
            };
            return WjTooltip;
        }(angular.WjDirective));
        var WjTooltipLink = (function (_super) {
            __extends(WjTooltipLink, _super);
            function WjTooltipLink() {
                _super.apply(this, arguments);
            }
            //override
            WjTooltipLink.prototype._link = function () {
                _super.prototype._link.call(this);
                var tt = this.control, // hack as Tooltip is not Control
                self = this;
                this.tAttrs.$observe('wjTooltip', function (value) {
                    tt.setTooltip(self.tElement[0], value);
                });
            };
            return WjTooltipLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for custom validations based on expressions.
         *
         * The <b>wj-validation-error</b> directive supports both AngularJS and native HTML5
         * validation mechanisms. It accepts an arbitrary AngularJS expression that should return
         * an error message string in case of the invalid input and an empty string if the input is valid.
         *
         * For AngularJS validation it should be used together with the <b>ng-model</b> directive.
         * In this case the <b>wj-validation-error</b> directive reports an error using a call
         * to the <b>NgModelController.$setValidity</b> method with the <b>wjValidationError</b> error key ,
         * in the same way as it happens with AngularJS native and custom validation directives.
         *
         * For HTML5 validation, the <b>wj-validation-error</b> directive sets the error state to the
         * element using the <b>setCustomValidity</b> method from the HTML5 validation API. For example:
         *
         * <pre>&lt;p&gt;HTML5 validation:&lt;/p&gt;
         * &lt;form&gt;
         *     &lt;input type="password"
         *         placeholder="Password"
         *         name="pwd" ng-model="thePwd"
         *         required minlength="2" /&gt;
         *     &lt;input type="password"
         *         placeholder="Check Password"
         *         name="chk" ng-model="chkPwd"
         *         wj-validation-error="chkPwd != thePwd ? 'Passwords don\'t match' : ''" /&gt;
         * &lt;/form&gt;
         *
         * &lt;p&gt;AngularJS validation:&lt;/p&gt;
         * &lt;form name="ngForm" novalidate&gt;
         *     &lt;input type="password"
         *         placeholder="Password"
         *         name="pwd" ng-model="thePwd"
         *         required minlength="2" /&gt;
         *     &lt;input type="password"
         *         placeholder="Check Password"
         *         name="chk" ng-model="chkPwd"
         *         wj-validation-error="chkPwd != thePwd" /&gt;
         *     &lt;div
         *         ng-show="ngForm.chk.$error.wjValidationError && !ngForm.chk.$pristine"&gt;
         *         Sorry, the passwords don't match.
         *     &lt;/div&gt;
         * &lt;/form&gt;</pre>
         *
         */
        var WjValidationError = (function (_super) {
            __extends(WjValidationError, _super);
            // Initializes a new instance of WjValidationError
            function WjValidationError() {
                _super.call(this);
                this.restrict = 'A';
                this.template = '';
                this.require = 'ngModel';
                this.scope = false;
            }
            WjValidationError.prototype._postLinkFn = function () {
                return function (scope, tElement, tAttrs, controller) {
                    // scope, elm, attrs, ctl
                    // directive name
                    var dn = 'wjValidationError';
                    // update valid state when the expression result changes
                    scope.$watch(tAttrs[dn], function (errorMsg) {
                        // get input element to validate
                        var e = (tElement[0].tagName == 'INPUT' ? tElement[0] : tElement[0].querySelector('input'));
                        // accept booleans as well as strings
                        if (typeof (errorMsg) == 'boolean') {
                            errorMsg = errorMsg ? 'error' : '';
                        }
                        // HTML5 validation
                        if (e && e.setCustomValidity) {
                            e.setCustomValidity(errorMsg);
                        }
                        // AngularJS validation
                        if (controller) {
                            controller.$setValidity(dn, errorMsg ? false : true);
                        }
                    });
                };
            };
            WjValidationError.prototype._getMetaDataId = function () {
                return 'ValidationError';
            };
            return WjValidationError;
        }(angular.WjDirective));
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.core.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo.input module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        //#region "Input directives registration"
        var wijmoInput = window['angular'].module('wj.input', []); // angular module for Wijmo inputs
        // register only if module is loaded
        if (wijmo.input && wijmo.input.InputNumber) {
            wijmoInput.directive('wjAutoComplete', ['$compile', function ($compile) {
                    return new WjAutoComplete($compile);
                }]);
            wijmoInput.directive('wjCalendar', [function () {
                    return new WjCalendar();
                }]);
            wijmoInput.directive('wjColorPicker', [function () {
                    return new WjColorPicker();
                }]);
            wijmoInput.directive('wjComboBox', ['$compile', function ($compile) {
                    return new WjComboBox($compile);
                }]);
            wijmoInput.directive('wjInputDate', [function () {
                    return new WjInputDate();
                }]);
            wijmoInput.directive('wjInputDateTime', [function () {
                    return new WjInputDateTime();
                }]);
            wijmoInput.directive('wjInputNumber', [function () {
                    return new WjInputNumber();
                }]);
            wijmoInput.directive('wjInputMask', [function () {
                    return new WjInputMask();
                }]);
            wijmoInput.directive('wjInputTime', ['$compile', function ($compile) {
                    return new WjInputTime($compile);
                }]);
            wijmoInput.directive('wjInputColor', [function () {
                    return new WjInputColor();
                }]);
            wijmoInput.directive('wjListBox', [function () {
                    return new WjListBox();
                }]);
            wijmoInput.directive('wjItemTemplate', ['$compile', function ($compile) {
                    return new WjItemTemplate($compile);
                }]);
            wijmoInput.directive('wjMenu', ['$compile', function ($compile) {
                    return new WjMenu($compile);
                }]);
            wijmoInput.directive('wjMenuItem', [function ($compile) {
                    return new WjMenuItem();
                }]);
            wijmoInput.directive('wjMenuSeparator', [function () {
                    return new WjMenuSeparator();
                }]);
            wijmoInput.directive('wjContextMenu', [function () {
                    return new WjContextMenu();
                }]);
            wijmoInput.directive('wjCollectionViewNavigator', [function () {
                    return new WjCollectionViewNavigator();
                }]);
            wijmoInput.directive('wjCollectionViewPager', [function () {
                    return new WjCollectionViewPager();
                }]);
            wijmoInput.directive('wjPopup', [function () {
                    return new WjPopup();
                }]);
            wijmoInput.directive('wjMultiSelect', ['$compile', function ($compile) {
                    return new WjMultiSelect($compile);
                }]);
        }
        //#endregion "Input directives definitions"
        //#region "Input directives classes"
        // DropDown control directive
        // Provides base setup for all directives related to controls derived from DropDown
        // Abstract class, not for use in markup
        var WjDropDown = (function (_super) {
            __extends(WjDropDown, _super);
            function WjDropDown() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjDropDown.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.input.DropDown;
                },
                enumerable: true,
                configurable: true
            });
            return WjDropDown;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:ComboBox control.
         *
         * Use the <b>wj-combo-box</b> directive to add <b>ComboBox</b> controls to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
         * &lt;wj-combo-box
         *   text="theCountry"
         *   items-source="countries"
         *   is-editable="false"
         *   placeholder="country"&gt;
         * &lt;/wj-combo-box&gt;</pre>
         *
         * The example below creates a <b>ComboBox</b> control and binds it to a 'countries' array
         * exposed by the controller. The <b>ComboBox</b> searches for the country as the user
         * types. The <b>isEditable</b> property is set to false, so the user is forced to
         * select one of the items in the list.
         *
         * @fiddle:37GHw
         *
         * The <b>wj-combo-box</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>              <dd><code>=</code> A reference to the @see:ComboBox control created by this directive.</dd>
         *   <dt>display-member-path</dt>  <dd><code>@</code> The name of the property to use as the visual representation of the items.</dd>
         *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether the drop-down list displays the items as plain text or as HTML.</dd>
         *   <dt>is-dropped-down</dt>      <dd><code>@</code> A value indicating whether the drop down list is currently visible.</dd>
         *   <dt>is-editable</dt>          <dd><code>@</code> A value indicating whether the user can enter values not present on the list.</dd>
         *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values.</dd>
         *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the values shown in the drop-down list.</dd>
         *   <dt>items-source</dt>         <dd><code>=</code> An array or @see:ICollectionView that contains items to show in the list.</dd>
         *   <dt>max-drop-down-height</dt> <dd><code>@</code> The maximum height of the drop-down list.</dd>
         *   <dt>max-drop-down-width</dt>  <dd><code>@</code> The maximum width of the drop-down list.</dd>
         *   <dt>placeholder</dt>          <dd><code>@</code> A string shown as a hint when the control is empty.</dd>
         *   <dt>is-required</dt>          <dd><code>@</code> A value indicating whether to prevent null values.</dd>
         *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
         *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected item in the drop-down list.</dd>
         *   <dt>selected-item</dt>        <dd><code>=</code> The currently selected item in the drop-down list.</dd>
         *   <dt>selected-value</dt>       <dd><code>=</code> The value of the selected item, obtained using the <b>selected-value-path</b>.</dd>
         *   <dt>selected-value-path</dt>  <dd><code>@</code> The name of the property used to get the <b>selected-value</b> from the <b>selected-item</b>.</dd>
         *   <dt>text</dt>                 <dd><code>=</code> The text to show in the control.</dd>
         *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The @see:ComboBox.isDroppedDownChanging event handler.</dd>
         *   <dt>is-dropped-down-changed</dt>  <dd><code>&</code> The @see:ComboBox.isDroppedDownChanged event handler.</dd>
         *   <dt>selected-index-changed</dt>   <dd><code>&</code> The @see:ComboBox.selectedIndexChanged event handler.</dd>
         *   <dt>got-focus</dt>            <dd><code>&</code> The @see:ComboBox.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>           <dd><code>&</code> The @see:ComboBox.lostFocus event handler.</dd>
         *   <dt>text-changed</dt>         <dd><code>&</code> The @see:ComboBox.textChanged event handler.</dd>
         * </dl>
         */
        var WjComboBox = (function (_super) {
            __extends(WjComboBox, _super);
            function WjComboBox($compile) {
                _super.call(this);
                this._$compile = $compile;
                this.template = '<div ng-transclude />';
                this.transclude = true;
            }
            Object.defineProperty(WjComboBox.prototype, "_controlConstructor", {
                // Gets the Combobox control constructor
                get: function () {
                    return wijmo.input.ComboBox;
                },
                enumerable: true,
                configurable: true
            });
            return WjComboBox;
        }(WjDropDown));
        /**
         * AngularJS directive for the @see:AutoComplete control.
         *
         * Use the <b>wj-auto-complete</b> directive to add <b>AutoComplete</b> controls to your
         * AngularJS applications. Note that directive and parameter names must be
         * formatted as lower-case with dashes instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
         * &lt;wj-auto-complete
         *   text="theCountry"
         *   items-source="countries"
         *   is-editable="false"
         *   placeholder="country"&gt;
         * &lt;/wj-auto-complete&gt;</pre>
         *
         * The example below creates an <b>AutoComplete</b> control and binds it to a 'countries' array
         * exposed by the controller. The <b>AutoComplete</b> searches for the country as the user
         * types, and narrows down the list of countries that match the current input.
         *
         * @fiddle:37GHw
         *
         * The <b>wj-auto-complete</b> directive extends @see:WjComboBox with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>css-match</dt>            <dd><code>@</code> The name of the CSS class used to highlight
         *                                 parts of the content that match the search terms.</dd>
         *   <dt>delay</dt>                <dd><code>@</code> The amount of delay in milliseconds between
         *                                 when a keystroke occurs and when the search is performed.</dd>
         *   <dt>items-source-function</dt><dd><code>=</code> A function that provides the items
         *                                 dynamically as the user types.</dd>
         *   <dt>max-items</dt>            <dd><code>@</code> The maximum number of items to display
         *                                 in the dropdown.</dd>
         *   <dt>min-length</dt>           <dd><code>@</code> The minimum input length to require before
         *                                 triggering autocomplete suggestions.</dd>
         * </dl>
         */
        var WjAutoComplete = (function (_super) {
            __extends(WjAutoComplete, _super);
            function WjAutoComplete($compile) {
                _super.call(this, $compile);
            }
            Object.defineProperty(WjAutoComplete.prototype, "_controlConstructor", {
                // Gets AutoComplete control constructor
                get: function () {
                    return wijmo.input.AutoComplete;
                },
                enumerable: true,
                configurable: true
            });
            return WjAutoComplete;
        }(WjComboBox));
        /**
         * AngularJS directive for the @see:Calendar control.
         *
         * Use the <b>wj-calendar</b> directive to add <b>Calendar</b> controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
         * &lt;wj-calendar
         *   value="theDate"&gt;
         * &lt;/wj-calendar&gt;</pre>
         *
         * @fiddle:46PhD
         *
         * This example creates a <b>Calendar</b> control and binds it to a 'date' variable
         * exposed by the controller. The range of dates that may be selected is limited
         * by the <b>min</b> and <b>max</b> properties.
         *
         * The <b>wj-calendar</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>        <dd><code>=</code> A reference to the @see:Calendar control
         *                           created by this directive.</dd>
         *   <dt>display-month</dt>  <dd><code>=</code> The month being displayed in the calendar.</dd>
         *   <dt>first-day-of-week</dt> <dd><code>@</code> The first day of the week.</dd>
         *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
         *                                 initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
         *                                 initializing the control with attribute values. </dd>
         *   <dt>item-formatter</dt> <dd><code>=</code> The function used to customize the dates
         *                           shown in the calendar.</dd>
         *   <dt>max</dt>            <dd><code>@</code> The latest valid date (string in the
         *                           format "yyyy-MM-dd").</dd>
         *   <dt>min</dt>            <dd><code>@</code> The earliest valid date (string in the
         *                           format "yyyy-MM-dd").</dd>
         *   <dt>month-view</dt>     <dd><code>@</code> A value indicating whether the control displays
         *                           a month or the entire year.</dd>
         *   <dt>show-header</dt>    <dd><code>@</code> A value indicating whether the control displays
         *                           the header area.</dd>
         *   <dt>value</dt>          <dd><code>=</code> The date being edited.</dd>
         *   <dt>got-focus</dt>      <dd><code>&</code> The @see:Calendar.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>     <dd><code>&</code> The @see:Calendar.lostFocus event handler.</dd>
         *   <dt>value-changed</dt>  <dd><code>&</code> The @see:Calendar.valueChanged event handler.</dd>
         * </dl>
         *
         * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
         * "yyyy-MM-dd." Technically, you can use any full date as defined in the W3C
         * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>,
         * which is also the format used with regular HTML5 input elements.
         */
        var WjCalendar = (function (_super) {
            __extends(WjCalendar, _super);
            function WjCalendar() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjCalendar.prototype, "_controlConstructor", {
                // Gets the Calendar control constructor
                get: function () {
                    return wijmo.input.Calendar;
                },
                enumerable: true,
                configurable: true
            });
            return WjCalendar;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:ColorPicker control.
         *
         * Use the <b>wj-color-picker</b> directive to add <b>ColorPicker</b> controls to your
         * AngularJS applications. Note that directive and parameter names must be
         * formatted as lower-case with dashes instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
         * &lt;wj-color-picker
         *   value="theColor"
         *   show-alpha-channel="false"&gt;
         * &lt;/wj-color-picker&gt;</pre>
         *
         * The <b>wj-color-picker</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>           <dd><code>=</code> A reference to the @see:ColorPicker
         *                              control created by this directive.</dd>
         *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
         *                                 initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
         *                                 initializing the control with attribute values. </dd>
         *   <dt>show-alpha-channel</dt><dd><code>@</code> A value indicating whether the control
         *                              displays the alpha channel (transparency) editor.</dd>
         *   <dt>show-color-string</dt> <dd><code>@</code> A value indicating whether the control
         *                              displays a string representation of the color being edited.</dd>
         *   <dt>palette</dt>           <dd><code>=</code> An array with ten color values to use
         *                              as the palette.</dd>
         *   <dt>value</dt>             <dd><code>=</code> The color being edited.</dd>
         *   <dt>got-focus</dt>         <dd><code>&</code> The @see:ColorPicker.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>        <dd><code>&</code> The @see:ColorPicker.lostFocus event handler.</dd>
         *   <dt>value-changed</dt>     <dd><code>&</code> The @see:ColorPicker.valueChanged event handler.</dd>
         * </dl>
         */
        var WjColorPicker = (function (_super) {
            __extends(WjColorPicker, _super);
            function WjColorPicker() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjColorPicker.prototype, "_controlConstructor", {
                // Gets the ColorPicker control constructor
                get: function () {
                    return wijmo.input.ColorPicker;
                },
                enumerable: true,
                configurable: true
            });
            return WjColorPicker;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:ListBox control.
         *
         * Use the <b>wj-list-box</b> directive to add @see:ListBox controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>b&gt;Here is a ListBox control:&lt;/p&gt;
         * &lt;wj-list-box
         *   selected-item="theCountry"
         *   items-source="countries"
         *   placeholder="country"&gt;
         * &lt;/wj-list-box&gt;</pre>
         *
         * The example below creates a <b>ListBox</b> control and binds it to a 'countries' array
         * exposed by the controller. The value selected is bound to the 'theCountry'
         * controller property using the <b>selected-item</b> attribute.
         *
         * @fiddle:37GHw
         *
         * The <b>wj-list-box</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>              <dd><code>=</code> A reference to the @see:ListBox
         *                                 control created by this directive.</dd>
         *   <dt>display-member-path</dt>  <dd><code>@</code> The property to use as the visual
         *                                 representation of the items.</dd>
         *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether items
         *                                 contain plain text or HTML.</dd>
         *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
         *                                 initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
         *                                 initializing the control with attribute values. </dd>
         *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the
         *                                 values to show in the list.</dd>
         *   <dt>items-source</dt>         <dd><code>=</code> An array or @see:ICollectionView
         *                                 that contains the list items.</dd>
         *   <dt>max-height</dt>           <dd><code>@</code> The maximum height of the list.</dd>
         *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected
         *                                 item.</dd>
         *   <dt>selected-item</dt>        <dd><code>=</code> The item that is currently selected.</dd>
         *   <dt>selected-value</dt>       <dd><code>=</code> The value of the <b>selected-item</b>
         *                                 obtained using the <b>selected-value-path</b>.</dd>
         *   <dt>selected-value-path</dt>  <dd><code>@</code> The property used to get the
         *                                 <b>selected-value</b> from the <b>selected-item</b>.</dd>
         *   <dt>got-focus</dt>            <dd><code>&</code> The @see:ListBox.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>           <dd><code>&</code> The @see:ListBox.lostFocus event handler.</dd>
         *   <dt>items-changed</dt>        <dd><code>&</code> The @see:ListBox.itemsChanged event handler.</dd>
         *   <dt>selected-index-changed</dt> <dd><code>&</code> The @see:ListBox.selectedIndexChanged event handler.</dd>
         * </dl>
         *
         * The <b>wj-list-box</b> directive may contain @see:WjItemTemplate child directive.
         */
        var WjListBox = (function (_super) {
            __extends(WjListBox, _super);
            function WjListBox() {
                _super.call(this);
                this.transclude = true;
                this.template = '<div ng-transclude />';
            }
            Object.defineProperty(WjListBox.prototype, "_controlConstructor", {
                // Gets the ListBox control constructor
                get: function () {
                    return wijmo.input.ListBox;
                },
                enumerable: true,
                configurable: true
            });
            return WjListBox;
        }(angular.WjDirective));
        /**
         * AngularJS directive for @see:ListBox and @see:Menu item templates.
         *
         * The <b>wj-item-template</b> directive must be contained in a @see:WjListBox
         * or @see:WjMenu directives.
         *
         * The <b>wj-item-template</b> directive defines a template for items of <b>ListBox</b>
         * and data-bound <b>Menu</b> controls.
         * The template may contain an arbitrary HTML fragment with AngularJS bindings and directives.
         * In addition to any properties available in a controller, the local <b>$item</b>,
         * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
         * that refer to the data item, its index, and the owner control.
         *
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a ListBox control with an item template:&lt;/p&gt;
         * &lt;wj-list-box items-source="musicians"&gt;
         *     &lt;wj-item-template&gt;
         *         {&#8203;{$itemIndex}}. &lt;b&gt;{&#8203;{$item.name}}&lt;/b&gt;
         *         &lt;br /&gt;
         *         &lt;img ng-src="{&#8203;{$item.photo}}"/&gt;
         *     &lt;/wj-item-template&gt;
         * &lt;/wj-list-box&gt;</pre>
         */
        var WjItemTemplate = (function (_super) {
            __extends(WjItemTemplate, _super);
            function WjItemTemplate($compile) {
                _super.call(this);
                this._$compile = $compile;
                this.require = ['?^wjListBox', '?^wjMenu'];
                // The same approach like in WjFlexGridColumn
                this['terminal'] = true;
                if (angular.WjDirective._dynaTemplates) {
                    this.transclude = false;
                    this['priority'] = 100;
                    this.template = function (tElement, tAttrs) {
                        tAttrs[WjItemTemplate._itemTemplateProp] = tElement[0].innerHTML;
                        return '<div />';
                    };
                }
                else {
                    this.transclude = true;
                    this.template = '<div ng-transclude/>';
                }
            }
            WjItemTemplate.prototype._initControl = function (element) {
                return {};
            };
            WjItemTemplate.prototype._createLink = function () {
                return new WjItemTemplateLink();
            };
            WjItemTemplate.prototype._getMetaDataId = function () {
                return 'ItemTemplate';
            };
            WjItemTemplate._itemTemplateProp = '$__wjItemTemplate';
            WjItemTemplate._itemScopeProp = '$_itemScope';
            return WjItemTemplate;
        }(angular.WjDirective));
        var WjItemTemplateLink = (function (_super) {
            __extends(WjItemTemplateLink, _super);
            function WjItemTemplateLink() {
                _super.apply(this, arguments);
            }
            WjItemTemplateLink.prototype._initParent = function () {
                _super.prototype._initParent.call(this);
                // get column template (HTML content)
                var dynaTempl = this.tAttrs[WjItemTemplate._itemTemplateProp], ownerControl = this.parent.control, listBox = this._getListBox();
                this.itemTemplate = dynaTempl != null ? dynaTempl : angular.WjDirective._removeTransclude(this.tElement[0].innerHTML);
                listBox.formatItem.addHandler(this._fmtItem, this);
                listBox.loadingItems.addHandler(this._loadingItems, this);
                if (this.parent._isInitialized) {
                    ownerControl.invalidate();
                }
            };
            WjItemTemplateLink.prototype._destroy = function () {
                var ownerControl = this.parent && this.parent.control, listBox = this._getListBox();
                if (listBox) {
                    listBox.formatItem.removeHandler(this._fmtItem, this);
                    listBox.loadingItems.removeHandler(this._loadingItems, this);
                }
                _super.prototype._destroy.call(this);
                this._tmplLink = null;
                if (ownerControl) {
                    ownerControl.invalidate();
                }
            };
            WjItemTemplateLink.prototype._loadingItems = function (s) {
                var items = s.hostElement.getElementsByClassName('wj-listbox-item');
                for (var i = items.length - 1; i >= 0; i--) {
                    var itemEl = items[i], itemScope = itemEl[WjItemTemplate._itemScopeProp];
                    if (itemScope) {
                        itemEl[WjItemTemplate._itemScopeProp] = null;
                        itemScope.$destroy();
                    }
                }
            };
            WjItemTemplateLink.prototype._fmtItem = function (s, e) {
                if (!this._tmplLink) {
                    this._tmplLink = this.directive._$compile(
                    //'<div style="display:none">' + this.itemTemplate + '</div>');
                    '<div>' + this.itemTemplate + '</div>');
                }
                var itemEl = e.item, itemScope = this.scope.$parent.$new();
                itemEl[WjItemTemplate._itemScopeProp] = itemScope;
                itemScope['$control'] = s;
                itemScope['$item'] = e.data;
                itemScope['$itemIndex'] = e.index;
                var clonedElement = this._tmplLink(itemScope, function (clonedEl, scope) { })[0];
                //var dispose = itemScope.$watch(function (scope) {
                //    dispose();
                //    clonedElement.style.display = '';
                //});
                if (itemEl.childNodes.length === 1) {
                    itemEl.replaceChild(clonedElement, itemEl.firstChild);
                }
                else {
                    itemEl.textContent = '';
                    itemEl.appendChild(clonedElement);
                }
                var lag = 40;
                clearTimeout(this._closingApplyTimeOut);
                this._closingApplyTimeOut = setTimeout(function () {
                    if (!itemScope['$root'].$$phase) {
                        itemScope.$apply();
                    }
                }, lag);
            };
            WjItemTemplateLink._invalidateControl = function (parentControl) {
                if (parentControl) {
                    parentControl.invalidate();
                }
            };
            // Gets a ListBox control whose items are templated, it maybe the control itself or internal ListBox used by controls like
            // ComboBox.
            WjItemTemplateLink.prototype._getListBox = function () {
                var ownerControl = this.parent && this.parent.control;
                if (ownerControl) {
                    return ownerControl instanceof wijmo.input.ListBox ? ownerControl : ownerControl.listBox;
                }
                return null;
            };
            return WjItemTemplateLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for the @see:Menu control.
         *
         * Use the <b>wj-menu</b> directive to add drop-down menus to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
         * &lt;wj-menu header="Tax" value="tax"&gt;
         *   &lt;wj-menu-item value="0"&gt;Exempt&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value=".05"&gt;5%&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value=".1"&gt;10%&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value=".15"&gt;15%&lt;/wj-menu-item&gt;
         * &lt;/wj-menu&gt;</pre>
         *
         * @fiddle:Wc5Mq
         *
         * This example creates three <b>Menu</b> controls. The first is used as a value picker,
         * the second uses a list of commands with parameters, and the third is a group of
         * three menus handled by an <b>itemClicked</b> function in the controller.
         *
         * The <b>wj-menu</b> directive extends @see:WjComboBox with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>command-path</dt>          <dd><code>@</code> The command to be executed when the item is clicked.</dd>
         *   <dt>command-parameter-path</dt><dd><code>@</code> The name of the property that contains command parameters.</dd>
         *   <dt>header</dt>                <dd><code>@</code> The text shown on the control.</dd>
         *   <dt>is-button</dt>             <dd><code>@</code> Whether the menu should react to clicks on its header area.</dd>
         *   <dt>value</dt>                 <dd><code>@</code> The value of the selected <b>wj-menu-item</b> value property. </dd>
         *   <dt>item-clicked</dt>          <dd><code>&</code> The @see:Menu.itemClicked event handler.</dd>
         *   <dt>got-focus</dt>             <dd><code>&</code> The @see:Menu.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>            <dd><code>&</code> The @see:Menu.lostFocus event handler.</dd>
         * </dl>
         *
         *The <b>wj-menu</b> directive may contain the following child directives:
         *@see:WjMenuItem, @see:WjMenuSeparator and @see:WjItemTemplate(in case of data-bound Menu control).
         */
        var WjMenu = (function (_super) {
            __extends(WjMenu, _super);
            // Initializes a new instance of a WjMenu
            function WjMenu($compile) {
                _super.call(this, $compile);
            }
            Object.defineProperty(WjMenu.prototype, "_controlConstructor", {
                // Gets the Menu control constructor
                get: function () {
                    return wijmo.input.Menu;
                },
                enumerable: true,
                configurable: true
            });
            WjMenu.prototype._createLink = function () {
                return new WjMenuLink();
            };
            // WjMenu property map
            WjMenu.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                var self = this; // store this in closure as .apply() call overrides the reference
                var valueDesc = angular.MetaFactory.findProp('value', this._props);
                valueDesc.customHandler = function (scope, control, value, oldValue, link) {
                    self.updateControlValue(scope, control, link);
                };
            };
            WjMenu.prototype.updateControlValue = function (scope, control, link) {
                if (scope.value != null) {
                    control.selectedValue = scope.value;
                    link.directive.updateHeader(scope, control, link);
                }
            };
            // if the scope has a value, show it in the header
            WjMenu.prototype.updateHeader = function (scope, control, link) {
                control.header = scope.header || '';
                var selItem = control.selectedItem;
                if (typeof (scope.value) != 'undefined' && selItem && control.displayMemberPath) {
                    var itemLink = selItem[WjMenuItem._itemLinkProp];
                    var currentValue = itemLink ? itemLink.linkedContent.innerHTML : selItem[control.displayMemberPath];
                    if (currentValue != null) {
                        control.header += ': <b>' + currentValue + '</b>';
                    }
                }
            };
            return WjMenu;
        }(WjComboBox));
        var WjMenuLink = (function (_super) {
            __extends(WjMenuLink, _super);
            function WjMenuLink() {
                _super.apply(this, arguments);
            }
            WjMenuLink.prototype._initControl = function () {
                var self = this, control = new wijmo.input.Menu(this.directiveTemplateElement[0], {
                    itemsSource: new wijmo.collections.ObservableArray(),
                    selectedIndex: 0,
                    itemClicked: function () {
                        self._safeApply(self.scope, 'value', control.selectedValue);
                        self.directive.updateHeader(self.scope, control, self);
                    }.bind(self),
                });
                control.listBox.formatItem.addHandler(self._fmtItem, this);
                control.listBox.loadingItems.addHandler(this._loadingItems, this);
                return control;
            };
            WjMenuLink.prototype._initialized = function () {
                this.directive.updateControlValue(this.scope, this.control, this);
            };
            WjMenuLink.prototype._fmtItem = function (s, e) {
                var itemLink = e.data[WjMenuItem._itemLinkProp];
                if (!itemLink) {
                    return;
                }
                if (!itemLink.contentLink) {
                    itemLink.contentLink = this.directive._$compile(
                    //'<div style="display:none">' + itemLink.itemTemplate + '</div>');
                    '<div>' + itemLink.itemTemplate + '</div>');
                }
                var self = this, itemEl = e.item, itemScope = itemLink.scope.$parent.$new();
                itemEl[WjMenuItem._itemScopeProp] = itemScope;
                itemScope['$control'] = this.control;
                itemScope['$item'] = e.data;
                itemScope['$itemIndex'] = e.index;
                var clonedElement = itemLink.linkedContent = itemLink.contentLink(itemScope, function (clonedEl, scope) { })[0];
                //var dispose = itemScope.$watch(function (scope) {
                //    dispose();
                //    clonedElement.style.display = '';
                //});
                if (itemEl.childNodes.length === 1) {
                    itemEl.replaceChild(clonedElement, itemEl.firstChild);
                }
                else {
                    itemEl.textContent = '';
                    itemEl.appendChild(clonedElement);
                }
                var lag = 40;
                clearTimeout(this._closingApplyTimeOut);
                this._closingApplyTimeOut = setTimeout(function () {
                    if (!itemScope['$root'].$$phase) {
                        itemScope.$apply();
                    }
                    // update header with a resolved linked content of a selected item
                    // if there is a selected item (TFS 193428)
                    if (self.control.selectedItem) {
                        self.directive.updateHeader(self.scope, self.control, self);
                    }
                }, lag);
            };
            WjMenuLink.prototype._loadingItems = function (s) {
                var items = s.hostElement.getElementsByClassName('wj-listbox-item');
                for (var i = items.length - 1; i >= 0; i--) {
                    var itemEl = items[i], itemScope = itemEl[WjMenuItem._itemScopeProp];
                    if (itemScope) {
                        itemEl[WjItemTemplate._itemScopeProp] = null;
                        itemScope.$destroy();
                    }
                }
            };
            return WjMenuLink;
        }(angular.WjLink));
        angular.WjMenuLink = WjMenuLink;
        /**
         * AngularJS directive for menu items.
         *
         * The <b>wj-menu-item</b> directive must be contained in a @see:WjMenu directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>cmd</dt>       <dd><code>=</code> The function to execute in the controller
         *                      when the item is clicked.</dd>
         *   <dt>cmd-param</dt>  <dd><code>=</code> The parameter passed to the <b>cmd</b> function
         *                      when the item is clicked.</dd>
         *   <dt>value</dt>     <dd><code>=</code> The value to select when the item is clicked
         *                      (use either this or <b>cmd</b>).</dd>
         * </dl>
         *
         * The content displayed by the item may contain an arbitrary HTML fragment with AngularJS bindings and directives.
         * You can also use <b>ng-repeat</b> and <b>ng-if</b> directives to populate the items in the Menu control.
         * In addition to any properties available in a controller, the local <b>$item</b>,
         * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
         * that refer to the data item, its index, and the owner control.
         */
        var WjMenuItem = (function (_super) {
            __extends(WjMenuItem, _super);
            function WjMenuItem() {
                _super.call(this);
                this.require = '^wjMenu';
                // The same approach like in WjFlexGridColumn
                this['terminal'] = true;
                if (angular.WjDirective._dynaTemplates) {
                    this.transclude = false;
                    this['priority'] = 100;
                    this.template = function (tElement, tAttrs) {
                        tAttrs[WjItemTemplate._itemTemplateProp] = tElement[0].innerHTML;
                        return '<div />';
                    };
                }
                else {
                    this.transclude = true;
                    this.template = '<div ng-transclude/>';
                }
            }
            WjMenuItem.prototype._createLink = function () {
                return new WjMenuItemLink(false);
            };
            WjMenuItem.prototype._getMetaDataId = function () {
                return 'MenuItem';
            };
            WjMenuItem.prototype._getId = function () {
                return WjMenuItem._directiveId;
            };
            WjMenuItem._itemTemplateProp = '$__wjMenuItemTemplate';
            WjMenuItem._itemScopeProp = '$_menuItemScope';
            WjMenuItem._itemLinkProp = '$_menuItemLink';
            WjMenuItem._directiveId = 'menuItemDir';
            return WjMenuItem;
        }(angular.WjDirective));
        // Used for both WjMenuItem and WjMenuSeparator
        var WjMenuItemLink = (function (_super) {
            __extends(WjMenuItemLink, _super);
            // parameter indicates whether the link is used with WjMenuItem and WjMenuSeparator.
            function WjMenuItemLink(isSeparator) {
                _super.call(this);
                this.isSeparator = isSeparator;
            }
            WjMenuItemLink.prototype._initControl = function () {
                var dynaTempl = this.tAttrs[WjItemTemplate._itemTemplateProp];
                this.itemTemplate = this.isSeparator ?
                    '<div class="wj-state-disabled" style="width:100%;height:1px;background-color:lightgray"/>' :
                    dynaTempl != null ? dynaTempl : angular.WjDirective._removeTransclude(this.tElement[0].innerHTML);
                var ret = { value: null, cmd: null, cmdParam: null, header: this.itemTemplate };
                ret[WjMenuItem._itemLinkProp] = this;
                return ret;
            };
            WjMenuItemLink.prototype._initParent = function () {
                _super.prototype._initParent.call(this);
                var ownerControl = this.parent.control;
                if (ownerControl.itemsSource.length == 1 && ownerControl.selectedIndex < 0) {
                    ownerControl.selectedIndex = 0;
                }
                if (!ownerControl.displayMemberPath) {
                    ownerControl.displayMemberPath = 'header';
                }
                if (!ownerControl.selectedValuePath) {
                    ownerControl.selectedValuePath = 'value';
                }
                if (!ownerControl.commandPath) {
                    ownerControl.commandPath = 'cmd';
                }
                if (!ownerControl.commandParameterPath) {
                    ownerControl.commandParameterPath = 'cmdParam';
                }
            };
            WjMenuItemLink.prototype._destroy = function () {
                var ownerControl = this.parent && this.parent.control;
                _super.prototype._destroy.call(this);
                if (ownerControl) {
                    ownerControl.invalidate();
                }
            };
            return WjMenuItemLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for menu separators.
         *
         * The <b>wj-menu-item-separator</b> directive must be contained in a @see:WjMenu directive.
         * It adds a non-selectable separator to the menu, and has no attributes.
         */
        var WjMenuSeparator = (function (_super) {
            __extends(WjMenuSeparator, _super);
            // Initializes a new instance of a WjMenuSeparator
            function WjMenuSeparator() {
                _super.call(this);
                this.template = '<span />';
                this.require = '^wjMenu';
            }
            WjMenuSeparator.prototype._getMetaDataId = function () {
                return 'MenuSeparator';
            };
            WjMenuSeparator.prototype._createLink = function () {
                return new WjMenuItemLink(true);
            };
            WjMenuSeparator.prototype._getId = function () {
                return WjMenuItem._directiveId;
            };
            return WjMenuSeparator;
        }(angular.WjDirective));
        /**
         * AngularJS directive for context menus.
         *
         * Use the <b>wj-context-menu</b> directive to add context menus to elements
         * on the page. The wj-context-menu directive is based on the <b>wj-menu</b>
         * directive; it displays a popup menu when the user performs a context menu
         * request on an element (usually a right-click).
         *
         * The wj-context-menu directive is specified as a parameter added to the
         * element that the context menu applies to. The parameter value is a
         * selector for the element that contains the menu. For example:
         *
         * <pre>&lt;!-- paragraph with a context menu --&gt;
         *&lt;p wj-context-menu="#idMenu" &gt;
         *  This paragraph has a context menu.&lt;/p&gt;
         *
         *&lt;!-- define the context menu (hidden and with an id) --&gt;
         *&lt;wj-menu id="idMenu" ng-show="false"&gt;
         *  &lt;wj-menu-item cmd="cmdOpen" cmd-param ="1"&gt;Open...&lt;/wj-menu-item&gt;
         *  &lt;wj-menu-item cmd="cmdSave" cmd-param="2"&gt;Save &lt;/wj-menu-item&gt;
         *  &lt;wj-menu-item cmd="cmdSave" cmd-param="3"&gt;Save As...&lt;/wj-menu-item&gt;
         *  &lt;wj-menu-item cmd="cmdNew" cmd-param ="4"&gt;New...&lt;/wj-menu-item&gt;
         *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
         *  &lt;wj-menu-item cmd="cmdExit" cmd-param="5"&gt;Exit&lt;/wj-menu-item&gt;
         *&lt;/wj-menu &gt;</pre>
         */
        var WjContextMenu = (function (_super) {
            __extends(WjContextMenu, _super);
            // Initializes a new instance of a WjContextMenu
            function WjContextMenu() {
                _super.call(this);
                this.template = undefined;
                //this.require = '^wjMenu';
                this.restrict = 'A';
                this.scope = false;
            }
            WjContextMenu.prototype._getMetaDataId = function () {
                return 'WjContextMenu';
            };
            // Gets the WjContextMenu's link function. Overrides parent member
            WjContextMenu.prototype._postLinkFn = function () {
                return function (scope, tElement, tAttrs) {
                    // get context menu and drop-down list
                    var host = wijmo.getElement(tAttrs['wjContextMenu']);
                    // show the drop-down list in response to the contextmenu command
                    tElement[0].addEventListener('contextmenu', function (e) {
                        var menu = wijmo.Control.getControl(host), dropDown = menu.dropDown;
                        if (menu && dropDown && !wijmo.closest(e.target, '[disabled]')) {
                            e.preventDefault();
                            menu.owner = tElement[0];
                            menu.selectedIndex = -1;
                            if (menu.onIsDroppedDownChanging(new wijmo.CancelEventArgs())) {
                                wijmo.showPopup(dropDown, e);
                                menu.onIsDroppedDownChanged();
                                dropDown.focus();
                            }
                        }
                    });
                };
            };
            return WjContextMenu;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:InputDate control.
         *
         * Use the <b>wj-input-date</b> directive to add @see:InputDate controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
         * &lt;wj-input-date
         *   value="theDate"
         *   format="M/d/yyyy"&gt;
         * &lt;/wj-input-date&gt;</pre>
         *
         * The example below shows a <b>Date</b> value (that includes date and time information)
         * using an @see:InputDate and an @see:InputTime control. Notice how both controls
         * are bound to the same controller variable, and each edits the appropriate information
         * (either date or time). The example also shows a @see:Calendar control that can be
         * used to select the date with a single click.
         *
         * @fiddle:46PhD
         *
         * The <b>wj-input-date</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>            <dd><code>=</code> A reference to the @see:InputDate control created by this directive.</dd>
         *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see @see:Globalize).</dd>
         *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see @see:wijmo.input.InputMask).</dd>
         *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
         *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
         *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
         *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
         *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
         *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
         *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
         *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
         *   <dt>got-focus</dt>          <dd><code>&</code> The @see:InputDate.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>         <dd><code>&</code> The @see:InputDate.lostFocus event handler.</dd>
         *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The @see:InputDate.isDroppedDownChanging event handler.</dd>
         *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The @see:InputDate.isDroppedDownChanged event handler.</dd>
         *   <dt>text-changed</dt>       <dd><code>&</code> The @see:InputDate.textChanged event handler.</dd>
         *   <dt>value-changed</dt>      <dd><code>&</code> The @see:InputDate.valueChanged event handler.</dd>
         * </dl>
         *
         * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
         * "yyyy-MM-dd". Technically, you can use any full date as defined in the W3C
         * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also
         * the format used with regular HTML5 input elements.
         */
        var WjInputDate = (function (_super) {
            __extends(WjInputDate, _super);
            function WjInputDate() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjInputDate.prototype, "_controlConstructor", {
                // Gets the InputDate control constructor
                get: function () {
                    return wijmo.input.InputDate;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputDate;
        }(WjDropDown));
        /**
         * AngularJS directive for the @see:InputDateTime control.
         *
         * Use the <b>wj-input-date-time</b> directive to add @see:InputDateTime controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputDateTime control:&lt;/p&gt;
         * &lt;wj-input-date-time
         *   value="theDate"
         *   format="M/d/yyyy"&gt;
         * &lt;/wj-input-date-time&gt;</pre>
         *
         * The <b>wj-input-date-time</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>            <dd><code>=</code> A reference to the @see:InputDate control created by this directive.</dd>
         *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see @see:Globalize).</dd>
         *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see @see:wijmo.input.InputMask).</dd>
         *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
         *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
         *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
         *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
         *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
         *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
         *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
         *   <dt>timeMax</dt>            <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
         *   <dt>timeMin</dt>            <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
         *   <dt>timeStep</dt>           <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
         *   <dt>timeFormat</dt>         <dd><code>@</code> The format sting used to show values in the time drop-down list.</dd>
         *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
         *   <dt>got-focus</dt>          <dd><code>&</code> The @see:InputDateTime.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>         <dd><code>&</code> The @see:InputDateTime.lostFocus event handler.</dd>
         *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The @see:InputDateTime.isDroppedDownChanging event handler.</dd>
         *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The @see:InputDateTime.isDroppedDownChanged event handler.</dd>
         *   <dt>text-changed</dt>       <dd><code>&</code> The @see:InputDateTime.textChanged event handler.</dd>
         *   <dt>value-changed</dt>      <dd><code>&</code> The @see:InputDateTime.valueChanged event handler.</dd>
         * </dl>
         */
        var WjInputDateTime = (function (_super) {
            __extends(WjInputDateTime, _super);
            function WjInputDateTime() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjInputDateTime.prototype, "_controlConstructor", {
                // Gets the InputDateTime control constructor
                get: function () {
                    return wijmo.input.InputDateTime;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputDateTime;
        }(WjInputDate));
        /**
         * AngularJS directive for the @see:InputNumber control.
         *
         * Use the <b>wj-input-number</b> directive to add <b>InputNumber</b> controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
         * &lt;wj-input-number
         *   value="theNumber"
         *   min="0"
         *   max="10"
         *   format="n0"
         *   placeholder="number between zero and ten"&gt;
         * &lt;/wj-input-number&gt;</pre>
         *
         * The example below creates several <b>InputNumber</b> controls and shows the effect
         * of using different formats, ranges, and step values.
         *
         * @fiddle:u7HpD
         *
         * The <b>wj-input-number</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>       <dd><code>=</code> A reference to the @see:InputNumber control created by this directive.</dd>
         *   <dt>format</dt>        <dd><code>@</code> The format used to display the number (see @see:Globalize).</dd>
         *   <dt>input-type</dt>    <dd><code>@</code> The "type" attribute of the HTML input element hosted by the control.</dd>
         *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>max</dt>           <dd><code>@</code> The largest valid number.</dd>
         *   <dt>min</dt>           <dd><code>@</code> The smallest valid number.</dd>
         *   <dt>place-holder</dt>  <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
         *   <dt>is-required</dt>   <dd><code>@</code> A value indicating whether to prevent null values.</dd>
         *   <dt>show-spinner</dt>  <dd><code>@</code> A value indicating whether to display spinner buttons to change the value by <b>step</b> units.</dd>
         *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value when the user clicks the spinner buttons.</dd>
         *   <dt>text</dt>          <dd><code>=</code> The text to show in the control.</dd>
         *   <dt>value</dt>         <dd><code>=</code> The number being edited.</dd>
         *   <dt>got-focus</dt>     <dd><code>&</code> The @see:InputNumber.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>    <dd><code>&</code> The @see:InputNumber.lostFocus event handler.</dd>
         *   <dt>text-changed</dt>  <dd><code>&</code> The @see:InputNumber.textChanged event handler.</dd>
         *   <dt>value-changed</dt> <dd><code>&</code> The @see:InputNumber.valueChanged event handler.</dd>
         * </dl>
         */
        var WjInputNumber = (function (_super) {
            __extends(WjInputNumber, _super);
            function WjInputNumber() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjInputNumber.prototype, "_controlConstructor", {
                // Gets the InputNumber control constructor
                get: function () {
                    return wijmo.input.InputNumber;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputNumber;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:InputMask control.
         *
         * Use the <b>wj-input-mask</b> directive to add @see:InputMask controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
         * &lt;wj-input-mask
         *   mask="99/99/99"
         *   mask-placeholder="*"&gt;
         * &lt;/wj-input-mask&gt;</pre>
         *
         * The <b>wj-input-mask</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt> <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>           <dd><code>=</code> A reference to the @see:InputNumber control created by this directive.</dd>
         *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>    <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>mask</dt>              <dd><code>@</code> The string mask used to format the value as the user types.</dd>
         *   <dt>prompt-char</dt>       <dd><code>@</code> A character used to show input locations within the mask.</dd>
         *   <dt>place-holder</dt>      <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
         *   <dt>value</dt>             <dd><code>=</code> The string being edited.</dd>
         *   <dt>raw-value</dt>         <dd><code>=</code> The string being edited, excluding literal and prompt characters.</dd>
         *   <dt>got-focus</dt>         <dd><code>&</code> The @see:InputMask.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>        <dd><code>&</code> The @see:InputMask.lostFocus event handler.</dd>
         *   <dt>value-changed</dt>     <dd><code>&</code> The @see:InputMask.valueChanged event handler.</dd>
         * </dl>
         */
        var WjInputMask = (function (_super) {
            __extends(WjInputMask, _super);
            function WjInputMask() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjInputMask.prototype, "_controlConstructor", {
                // Gets the InputMask control constructor
                get: function () {
                    return wijmo.input.InputMask;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputMask;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:InputTime control.
         *
         * Use the <b>wj-input-time</b> directive to add <b>InputTime</b> controls to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
         * &lt;wj-input-time
         *   value="theDate"
         *   format="h:mm tt"
         *   min="09:00" max="17:00"
         *   step="15"&gt;
         * &lt;/wj-input-time&gt;</pre>
         *
         * @fiddle:46PhD
         *
         * This example edits a <b>Date</b> value (that includes date and time information)
         * using an @see:InputDate and an InputTime control. Notice how both controls
         * are bound to the same controller variable, and each edits the appropriate information
         * (either date or time). The example also shows a @see:Calendar control that can be
         * used to select the date with a single click.
         *
         * The <b>wj-input-time</b> directive extends @see:WjComboBox with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt><dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>       <dd><code>=</code> A reference to the @see:InputDate control created by this directive.</dd>
         *   <dt>format</dt>        <dd><code>@</code> The format used to display the selected time.</dd>
         *   <dt>mask</dt>          <dd><code>@</code> A mask used to validate the input as the user types (see @see:InputMask).</dd>
         *   <dt>max</dt>           <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
         *   <dt>min</dt>           <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
         *   <dt>step</dt>          <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
         *   <dt>value</dt>         <dd><code>=</code> The time being edited (as a Date object).</dd>
         *   <dt>value-changed</dt> <dd><code>&</code> The@see: valueChanged event handler.</dd>
         * </dl>
         *
         * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
         * "hh:mm". Technically, you can use any full date as defined in the W3C
         * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also the format
         * used with regular HTML5 input elements.
         */
        var WjInputTime = (function (_super) {
            __extends(WjInputTime, _super);
            function WjInputTime($compile) {
                _super.call(this, $compile);
            }
            Object.defineProperty(WjInputTime.prototype, "_controlConstructor", {
                // Gets the InputTime control constructor
                get: function () {
                    return wijmo.input.InputTime;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputTime;
        }(WjComboBox));
        /**
         * AngularJS directive for the @see:InputColor control.
         *
         * Use the <b>wj-input-color</b> directive to add @see:InputColor controls to your
         * AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is an InputColor control:&lt;/p&gt;
         * &lt;wj-input-color
         *   value="theColor"
         *   show-alpha-channel="false"&gt;
         * &lt;/wj-input-color&gt;</pre>
         *
         * The <b>wj-input-color</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>     <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>               <dd><code>=</code> A reference to the InputColor control created by this directive.</dd>
         *   <dt>is-dropped-down</dt>       <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
         *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>show-alpha-channel</dt>    <dd><code>@</code> A value indicating whether the drop-down displays the alpha channel (transparency) editor.</dd>
         *   <dt>placeholder</dt>           <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
         *   <dt>is-required</dt>           <dd><code>@</code> A value indicating whether to prevent null values.</dd>
         *   <dt>show-drop-down-button</dt> <dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
         *   <dt>text</dt>                  <dd><code>=</code> The text to show in the control.</dd>
         *   <dt>value</dt>                 <dd><code>=</code> The color being edited.</dd>
         *   <dt>got-focus</dt>             <dd><code>&</code> The @see:InputColor.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>            <dd><code>&</code> The @see:InputColor.lostFocus event handler.</dd>
         *   <dt>is-dropped-down-changing</dt><dd><code>&</code> The @see:InputColor.isDroppedDownChanging event handler.</dd>
         *   <dt>is-dropped-down-changed</dt><dd><code>&</code> The @see:InputColor.isDroppedDownChanged event handler.</dd>
         *   <dt>text-changed</dt>          <dd><code>&</code> The @see:InputColor.textChanged event handler.</dd>
         *   <dt>value-changed</dt>         <dd><code>&</code> The @see:InputColor.valueChanged event handler.</dd>
         * </dl>
         */
        var WjInputColor = (function (_super) {
            __extends(WjInputColor, _super);
            function WjInputColor() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjInputColor.prototype, "_controlConstructor", {
                // Gets the InputColor control constructor
                get: function () {
                    return wijmo.input.InputColor;
                },
                enumerable: true,
                configurable: true
            });
            return WjInputColor;
        }(WjDropDown));
        /**
         * AngularJS directive for the @see:Popup control.
         *
         * Use the <b>wj-popup</b> directive to add @see:Popup controls to your
         * AngularJS applications.
         *
         * The popup content may be specified inside the <b>wj-popup</b> tag, and can
         * contain an arbitrary HTML fragment with AngularJS bindings and directives.
         *
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
         * &lt;button id="btn2" type="button"&gt;
         *     Click to show Popup
         * &lt;/button&gt;
         * &lt;wj-popup owner="#btn2" show-trigger="Click" hide-trigger="Blur"&gt;
         *     &lt;h3&gt;
         *         Salutation
         *     &lt;/h3&gt;
         *     &lt;div class="popover-content"&gt;
         *         Hello {&#8203;{firstName}} {&#8203;{lastName}}
         *     &lt;/div&gt;
         * &lt;/wj-popup&gt;</pre>
         *
         * The <b>wj-popup</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>control</dt>         <dd><code>=</code> A reference to the Popup control created by this directive.</dd>
         *   <dt>fade-in</dt>         <dd><code>@</code> A boolean value that determines whether popups should be shown using a fade-in animation.</dd>
         *   <dt>fade-out</dt>        <dd><code>@</code> A boolean value that determines whether popups should be hidden using a fade-out animation.</dd>
         *   <dt>hide-trigger</dt>    <dd><code>@</code> A @see:PopupTrigger value defining the action that hides the @see:Popup.</dd>
         *   <dt>initialized</dt>     <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt>  <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
         *   <dt>owner</dt>           <dd><code>@</code> A CSS selector referencing an element that controls the popup visibility.</dd>
         *   <dt>show-trigger</dt>    <dd><code>@</code> A @see:PopupTrigger value defining the action that shows the @see:Popup.</dd>
         *   <dt>modal</dt>           <dd><code>@</code> A boolean value that determines whether the @see:Popup should be displayed as a modal dialog.</dd>
         *   <dt>got-focus</dt>       <dd><code>&</code> The @see:Popup.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>      <dd><code>&</code> The @see:Popup.lostFocus event handler.</dd>
         *   <dt>showing</dt>         <dd><code>&</code> The @see:Popup.showing event handler.</dd>
         *   <dt>shown</dt>           <dd><code>&</code> The @see:Popup.shown event handler.</dd>
         *   <dt>hiding</dt>          <dd><code>&</code> The @see:Popup.hiding event handler.</dd>
         *   <dt>hidden</dt>          <dd><code>&</code> The @see:Popup.hidden event handler.</dd>
         * </dl>
         */
        var WjPopup = (function (_super) {
            __extends(WjPopup, _super);
            function WjPopup() {
                _super.call(this);
                this.transclude = true;
                this.template = '<div ng-transclude/>';
            }
            Object.defineProperty(WjPopup.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.input.Popup;
                },
                enumerable: true,
                configurable: true
            });
            WjPopup.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                angular.MetaFactory.findProp('owner', this._props).customHandler =
                    function (scope, control, value, oldValue, link) {
                        // set modal if not specified
                        var modal = scope['modal'];
                        if (modal == null) {
                            // not specified, make it modal if it has no owner 
                            control['modal'] = value ? false : true;
                        }
                    };
            };
            return WjPopup;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:MultiSelect control.
         *
         * Use the <b>wj-multi-select</b> directive to add <b>MultiSelect</b> controls to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a MultiSelect bound to a collection of objects:&lt;/p&gt;
         * &lt;wj-multi-select
         *     placeholder="Select Countries"
         *     items-source="ctx.items"
         *     header-format="{count} countries selected"
         *     display-Member-path="country"
         *     checked-Member-path="selected"&gt;
         * &lt;/wj-multi-select&gt;</pre>
         *
         * The <b>wj-multi-select</b> directive extends @see:WjComboBox with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>checked-member-path</dt>  <dd><code>@</code> The name of the property used to control the checkboxes placed next to each item.</dd>
         *   <dt>header-format</dt>        <dd><code>@</code> The format string used to create the header content when the control has more than <b>maxHeaderItems</b> items checked.</dd>
         *   <dt>header-formatter</dt>     <dd><code>=</code> A function that gets the HTML in the control header.</dd>
         *   <dt>max-header-items</dt>     <dd><code>@</code> The maximum number of items to display on the control header.</dd>
         *   <dt>checked-items-changed</dt><dd><code>&</code> The @see:MultiSelect.checkedItemsChanged event handler.</dd>
         * </dl>
         */
        var WjMultiSelect = (function (_super) {
            __extends(WjMultiSelect, _super);
            function WjMultiSelect($compile) {
                _super.call(this, $compile);
            }
            Object.defineProperty(WjMultiSelect.prototype, "_controlConstructor", {
                // Gets the InputColor control constructor
                get: function () {
                    return wijmo.input.MultiSelect;
                },
                enumerable: true,
                configurable: true
            });
            return WjMultiSelect;
        }(WjComboBox));
        /**
         * AngularJS directive for an @see:ICollectionView navigator element.
         *
         * Use the <b>wj-collection-view-navigator</b> directive to add an element that allows users to
         * navigate through the items in an @see:ICollectionView.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
         * &lt;wj-collection-view-navigator
         *   cv="myCollectionView"&gt;
         * &lt;/wj-collection-view-navigator&gt;</pre>
         *
         * @fiddle:s8tT4
         *
         * This example creates a CollectionView with 100,000 items and 20 items per page.
         * It defines a navigator to select the current page, another to select the current item,
         * and shows the data in a @see:FlexGrid.
         *
         * The <b>wj-collection-view-navigator</b> directive has a single attribute:
         *
         * <dl class="dl-horizontal">
         *   <dt>cv</dt>  <dd><code>=</code> A reference to the @see:ICollectionView object to navigate.</dd>
         * </dl>
         */
        var WjCollectionViewNavigator = (function (_super) {
            __extends(WjCollectionViewNavigator, _super);
            // Initializes a new instance of a WjCollectionViewNavigator
            function WjCollectionViewNavigator() {
                _super.call(this);
                this.template = '<div class="wj-control wj-content wj-pager">' +
                    '<div class="wj-input-group">' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    ' ng-click="cv.moveCurrentToFirst()"' +
                    ' ng-disabled="cv.currentPosition <= 0">' +
                    '<span class="wj-glyph-left" style="margin-right:-4px"></span>' +
                    '<span class="wj-glyph-left"></span>' +
                    ' </button>' +
                    '</span>' +
                    '<span class="wj-input-group-btn">' +
                    ' <button class="wj-btn wj-btn-default" type="button"' +
                    ' ng-click="cv.moveCurrentToPrevious()"' +
                    ' ng-disabled="cv.currentPosition <= 0">' +
                    '<span class="wj-glyph-left"></span>' +
                    ' </button>' +
                    '</span>' +
                    '<input type="text" class="wj-form-control" value="' +
                    ' {{cv.currentPosition + 1 | number}} / {{cv.itemCount | number}}' +
                    ' " disabled />' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    ' ng-click="cv.moveCurrentToNext()"' +
                    ' ng-disabled="cv.currentPosition >= cv.itemCount - 1">' +
                    '<span class="wj-glyph-right"></span>' +
                    '</button>' +
                    '</span>' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    ' ng-click="cv.moveCurrentToLast()"' +
                    ' ng-disabled="cv.currentPosition >= cv.itemCount - 1">' +
                    '<span class="wj-glyph-right"></span>' +
                    '<span class="wj-glyph-right" style="margin-left:-4px"></span>' +
                    '</button>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            }
            WjCollectionViewNavigator.prototype._getMetaDataId = function () {
                return 'CollectionViewNavigator';
            };
            // Gets the WjCollectionViewNavigator directive's link function. Overrides parent member
            WjCollectionViewNavigator.prototype._postLinkFn = function () {
                return function (scope, tElement, tAttrs, dropDownController) {
                };
            };
            return WjCollectionViewNavigator;
        }(angular.WjDirective));
        /**
         * AngularJS directive for an @see:ICollectionView pager element.
         *
         * Use the <b>wj-collection-view-pager</b> directive to add an element that allows users to
         * navigate through the pages in a paged @see:ICollectionView.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>Here is a CollectionViewPager:&lt;/p&gt;
         * &lt;wj-collection-view-pager
         *   cv="myCollectionView"&gt;
         * &lt;/wj-collection-view-pager&gt;</pre>
         *
         * @fiddle:s8tT4
         *
         * This example creates a CollectionView with 100,000 items and 20 items per page.
         * It defines a navigator to select the current page, another to select the current item,
         * and shows the data in a @see:FlexGrid.
         *
         * The <b>wj-collection-view-pager</b> directive has a single attribute:
         *
         * <dl class="dl-horizontal">
         *   <dt>cv</dt>  <dd><code>=</code> A reference to the paged @see:ICollectionView object to navigate.</dd>
         * </dl>
         */
        var WjCollectionViewPager = (function (_super) {
            __extends(WjCollectionViewPager, _super);
            // Initializes a new instance of a WjCollectionViewPager
            function WjCollectionViewPager() {
                _super.call(this);
                this.template = '<div class="wj-control wj-content wj-pager">' +
                    '<div class="wj-input-group">' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    'ng-click="cv.moveToFirstPage()"' +
                    'ng-disabled="cv.pageIndex <= 0">' +
                    '<span class="wj-glyph-left" style="margin-right:-4px"></span>' +
                    '<span class="wj-glyph-left"></span>' +
                    '</button>' +
                    '</span>' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    'ng-click="cv.moveToPreviousPage()"' +
                    'ng-disabled="cv.pageIndex <= 0">' +
                    '<span class="wj-glyph-left"></span>' +
                    '</button>' +
                    '</span>' +
                    '<input type="text" class="wj-form-control" value="' +
                    '{{cv.pageIndex + 1 | number}} / {{cv.pageCount | number}}' +
                    '" disabled />' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    'ng-click="cv.moveToNextPage()"' +
                    'ng-disabled="cv.pageIndex >= cv.pageCount - 1">' +
                    '<span class="wj-glyph-right"></span>' +
                    '</button>' +
                    '</span>' +
                    '<span class="wj-input-group-btn">' +
                    '<button class="wj-btn wj-btn-default" type="button"' +
                    'ng-click="cv.moveToLastPage()"' +
                    'ng-disabled="cv.pageIndex >= cv.pageCount - 1">' +
                    '<span class="wj-glyph-right"></span>' +
                    '<span class="wj-glyph-right" style="margin-left:-4px"></span>' +
                    '</button>' +
                    '</span>' +
                    '</div>' +
                    '</div>';
            }
            WjCollectionViewPager.prototype._getMetaDataId = function () {
                return 'CollectionViewPager';
            };
            // Gets the WjCollectionViewPager directive's link function. Overrides parent member
            WjCollectionViewPager.prototype._postLinkFn = function () {
                return function (scope, tElement, tAttrs, dropDownController) {
                };
            };
            return WjCollectionViewPager;
        }(angular.WjDirective));
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.input.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo.chart module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        //#region "Charts directives registration"
        var wijmoChart = window['angular'].module('wj.chart', []);
        // register only if module is loaded
        if (wijmo.chart && wijmo.chart.FlexChart) {
            wijmoChart.directive('wjFlexChart', [function () {
                    return new WjFlexChart();
                }]);
            wijmoChart.directive('wjFlexChartAxis', [function () {
                    return new WjFlexChartAxis();
                }]);
            wijmoChart.directive('wjFlexChartSeries', [function () {
                    return new WjFlexChartSeries();
                }]);
            wijmoChart.directive('wjFlexChartLegend', [function () {
                    return new WjFlexChartLegend();
                }]);
            wijmoChart.directive('wjFlexChartDataLabel', [function () {
                    return new WjFlexChartDataLabel();
                }]);
            wijmoChart.directive('wjFlexPieDataLabel', [function () {
                    return new WjFlexPieDataLabel();
                }]);
            wijmoChart.directive('wjFlexChartLineMarker', [function () {
                    return new WjFlexChartLineMarker();
                }]);
            wijmoChart.directive('wjFlexChartPlotArea', [function () {
                    return new WjFlexChartPlotArea();
                }]);
            wijmoChart.directive('wjFlexChartDataPoint', [function () {
                    return new WjFlexChartDataPoint();
                }]);
            if (wijmo.chart.interaction) {
                wijmoChart.directive('wjFlexChartRangeSelector', [function () {
                        return new WjFlexChartRangeSelector();
                    }]);
                wijmoChart.directive('wjFlexChartGestures', [function () {
                        return new WjFlexChartChartGestures();
                    }]);
                wijmoChart.directive('wjFlexChartChartGestures', [function () {
                        return new WjFlexChartChartGestures();
                    }]);
            }
            if (wijmo.chart.annotation) {
                wijmoChart.directive('wjFlexChartAnnotationLayer', [function () {
                        return new WjFlexChartAnnotationLayer();
                    }]);
                wijmoChart.directive('wjFlexChartAnnotation', [function () {
                        return new WjFlexChartAnnotation();
                    }]);
            }
            wijmoChart.directive('wjFlexPie', [function () {
                    return new WjFlexPie();
                }]);
            if (wijmo.chart.hierarchical) {
                wijmoChart.directive('wjSunburst', [function () {
                        return new WjSunburst();
                    }]);
            }
            if (wijmo.chart.finance) {
                wijmoChart.directive('wjFinancialChart', [function () {
                        return new WjFinancialChart();
                    }]);
                wijmoChart.directive('wjFinancialChartSeries', [function () {
                        return new WjFinancialChartSeries();
                    }]);
                if (wijmo.chart.finance.analytics) {
                    wijmoChart.directive('wjFlexChartFibonacci', [function () {
                            return new WjFlexChartFibonacci();
                        }]);
                    wijmoChart.directive('wjFlexChartFibonacciArcs', [function () {
                            return new WjFlexChartFibonacciArcs();
                        }]);
                    wijmoChart.directive('wjFlexChartFibonacciFans', [function () {
                            return new WjFlexChartFibonacciFans();
                        }]);
                    wijmoChart.directive('wjFlexChartFibonacciTimeZones', [function () {
                            return new WjFlexChartFibonacciTimeZones();
                        }]);
                    wijmoChart.directive('wjFlexChartAtr', [function () {
                            return new WjFlexChartAtr();
                        }]);
                    wijmoChart.directive('wjFlexChartCci', [function () {
                            return new WjFlexChartCci();
                        }]);
                    wijmoChart.directive('wjFlexChartRsi', [function () {
                            return new WjFlexChartRsi();
                        }]);
                    wijmoChart.directive('wjFlexChartWilliamsR', [function () {
                            return new WjFlexChartWilliamsR();
                        }]);
                    wijmoChart.directive('wjFlexChartMacd', [function () {
                            return new WjFlexChartMacd();
                        }]);
                    wijmoChart.directive('wjFlexChartMacdHistogram', [function () {
                            return new WjFlexChartMacdHistogram();
                        }]);
                    wijmoChart.directive('wjFlexChartStochastic', [function () {
                            return new WjFlexChartStochastic();
                        }]);
                    wijmoChart.directive('wjFlexChartBollingerBands', [function () {
                            return new WjFlexChartBollingerBands();
                        }]);
                    wijmoChart.directive('wjFlexChartEnvelopes', [function () {
                            return new WjFlexChartEnvelopes();
                        }]);
                }
            }
            if (wijmo.chart.analytics) {
                wijmoChart.directive('wjFlexChartTrendLine', [function () {
                        return new WjFlexChartTrendLine();
                    }]);
                wijmoChart.directive('wjFlexChartMovingAverage', [function () {
                        return new WjFlexChartMovingAverage();
                    }]);
                wijmoChart.directive('wjFlexChartYFunctionSeries', [function () {
                        return new WjFlexChartYFunctionSeries();
                    }]);
                wijmoChart.directive('wjFlexChartParametricFunctionSeries', [function () {
                        return new WjFlexChartParametricFunctionSeries();
                    }]);
                wijmoChart.directive('wjFlexChartWaterfall', [function () {
                        return new WjFlexChartWaterfall();
                    }]);
            }
            if (wijmo.chart.animation) {
                wijmoChart.directive('wjFlexChartAnimation', [function () {
                        return new WjFlexChartAnimation();
                    }]);
            }
        }
        //#endregion "Charts directives definitions"
        //#region "Charts directives classes"
        // Base class for WjFlexCore and FlexPie directives with common prop and event dictionaries
        var WjFlexChartBase = (function (_super) {
            __extends(WjFlexChartBase, _super);
            // Initializes a new instance of a WjFlexChart
            function WjFlexChartBase() {
                _super.call(this);
                var self = this;
                this.template = '<div ng-transclude />';
                this.transclude = true;
            }
            Object.defineProperty(WjFlexChartBase.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.FlexChartBase;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartBase.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                var self = this; // store this in closure as .apply() call overrides the reference
                var tooltipDesc = angular.MetaFactory.findProp('tooltipContent', this._props);
                tooltipDesc.customHandler = function (scope, control, value, oldValue, link) {
                    if (value != null) {
                        control.tooltip.content = value;
                    }
                };
            };
            return WjFlexChartBase;
        }(angular.WjDirective));
        // Base class for WjFlexChart and WjFinancialChart
        var WjFlexChartCore = (function (_super) {
            __extends(WjFlexChartCore, _super);
            function WjFlexChartCore() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjFlexChartCore.prototype, "_controlConstructor", {
                // gets the Wijmo FlexChart control constructor
                get: function () {
                    return wijmo.chart.FlexChartCore;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartCore.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                var self = this; // store this in closure as .apply() call overrides the reference
                var lblContentDesc = angular.MetaFactory.findProp('labelContent', this._props);
                lblContentDesc.customHandler = function (scope, control, value, oldValue, link) {
                    if (value != null) {
                        control.dataLabel.content = value;
                    }
                };
            };
            return WjFlexChartCore;
        }(WjFlexChartBase));
        /**
         * AngularJS directive for the @see:FlexChart control.
         *
         * Use the <b>wj-flex-chart</b> directive to add charts to your AngularJS applications.
         * Note that directive and parameter names must be formatted using lower-case letters
         * with dashes instead of camel case. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
         * &lt;wj-flex-chart
         *   style="height:300px"
         *   items-source="data"
         *   binding-x="country"&gt;
         *   &lt;wj-flex-chart-axis
         *     wj-property="axisY"
         *     major-unit="5000"&gt;
         *   &lt;/wj-flex-chart-axis&gt;
         *   &lt;wj-flex-chart-series
         *     binding="sales"
         *     name="Sales"&gt;
         *   &lt;/wj-flex-chart-series&gt;
         *   &lt;wj-flex-chart-series
         *     binding="expenses"
         *     name="Expenses"&gt;
         *   &lt;/wj-flex-chart-series&gt;
         *   &lt;wj-flex-chart-series
         *     binding="downloads"
         *     name="Downloads"
         *     chart-type="LineSymbols"&gt;
         *   &lt;/wj-flex-chart-series&gt;
         * &lt;/wj-flex-chart&gt;</pre>
         *
         * The example below creates a @see:FlexChart control and binds it to a 'data' array
         * exposed by the controller. The chart has three series objects, each corresponding to
         * a property in the objects contained in the source array. The last series in the
         * example uses the 'chart-type' attribute to override the default chart type used
         * for the other series objects.
         *
         * @fiddle:QNb9X
         *
         * The wj-flex-chart directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
         *                              values for the chart. You can override this at the series level.</dd>
         *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
         *                              values for the chart. You can override this at the series level.</dd>
         *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
         *                              objects. You can override this at the series level. See @see:ChartType.</dd>
         *   <dt>control</dt>           <dd><code>=</code> A reference to the @see:FlexChart control
         *                              that this directive creates.</dd>
         *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
         *                              text).</dd>
         *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
         *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
         *                              text).</dd>
         *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
         *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
         *                              initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
         *                              initializing the control with attribute values. </dd>
         *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
         *                              leave gaps when there are null values in the data.</dd>
         *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
         *                              appearance of data points.</dd>
         *   <dt>items-source</dt>      <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                              the data used to create the chart.</dd>
         *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
         *                              toggles series visibility.</dd>
         *   <dt>options</dt>           <dd><code>=</code> Chart options that only apply to certain chart types.
         *                              See <b>options</b> under @see:FlexChart for details.</dd>
         *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
         *                              displaying each series.</dd>
         *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
         *                              edges of the control and the plot area, or CSS-style margins.</dd>
         *   <dt>rotated</dt>           <dd><code>@</code> The value indicating whether to flip the axes so that
         *                              X is vertical and Y is horizontal.</dd>
         *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
         *   <dt>selection-mode</dt>    <dd><code>@</code> The @see:SelectionMode value indicating whether or what is
         *                              selected when the user clicks a series.</dd>
         *   <dt>stacking</dt>          <dd><code>@</code> The @see:Stacking value indicating whether or how series
         *                              objects are stacked or plotted independently.</dd>
         *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data points in Scatter,
         *                              LineSymbols, and SplineSymbols charts, in pixels. You can override
         *                              this at the series level.</dd>
         *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
         *                              @see:ChartTooltip content property.</dd>
         *   <dt>got-focus</dt>         <dd><code>&</code> The @see:FlexChart.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>        <dd><code>&</code> The @see:FlexChart.lostFocus event handler.</dd>
         *   <dt>rendering</dt>         <dd><code>&</code> The @see:FlexChart.rendering event handler.</dd>
         *   <dt>rendered</dt>          <dd><code>&</code> The @see:FlexChart.rendered event handler.</dd>
         *   <dt>series-visibility-changed</dt>
         *                              <dd><code>&</code> The @see:FlexChart.seriesVisibilityChanged event handler.</dd>
         *   <dt>selection-changed</dt> <dd><code>&</code> The @see:FlexChart.selectionChanged event handler.</dd>
         * </dl>
         *
         * The wj-flex-chart directive may contain the following child directives:
         * @see:WjFlexChartAxis, @see:WjFlexChartSeries, @see:WjFlexChartLegend and @see:WjFlexChartDataLabel.
         */
        var WjFlexChart = (function (_super) {
            __extends(WjFlexChart, _super);
            function WjFlexChart() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjFlexChart.prototype, "_controlConstructor", {
                // gets the Wijmo FlexChart control constructor
                get: function () {
                    return wijmo.chart.FlexChart;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChart;
        }(WjFlexChartCore));
        /**
         * AngularJS directive for the @see:FlexChart @see:Axis object.
         *
         * The <b>wj-flex-chart-axis</b> directive must be contained in a @see:WjFlexChart directive or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>wj-property</dt>     <dd><code>@</code> Defines the @see:FlexChart property name,
         *                            axis-x or axis-y, to initialize with the directive.</dd>
         *   <dt>axis-line</dt>       <dd><code>@</code> The value indicating whether the axis line is visible.</dd>
         *   <dt>binding</dt>         <dd><code>@</code> Gets or sets the comma-separated property names for
         *                            the @see:wijmo.chart.Axis.itemsSource property to use in axis labels.
         *                            The first name specifies the value on the axis, the second represents
         *                            the corresponding axis label. The default value is 'value,text'.</dd>
         *   <dt>format</dt>          <dd><code>@</code> The format string used for the axis labels
         *                            (see @see:Globalize).</dd>
         *   <dt>item-formatter</dt>  <dd><code>=</code> The formatter function that customizes the
         *                            appearance of axis labels.</dd>
         *   <dt>items-source</dt>    <dd><code>=</code> The items source for the axis labels.</dd>
         *   <dt>labels</dt>          <dd><code>@</code> The value indicating whether the axis labels are visible.</dd>
         *   <dt>label-angle</dt>     <dd><code>@</code> The rotation angle of axis labels in degrees.</dd>
         *   <dt>label-align</dt>     <dd><code>@</code> The alignment of axis labels.</dd>
         *   <dt>label-padding</dt>   <dd><code>@</code> The padding of axis labels.</dd>
         *   <dt>major-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes grid lines.</dd>
         *   <dt>major-tick-marks</dt><dd><code>@</code> Defines the appearance of tick marks on the axis
         *                            (see @see:TickMark).</dd>
         *   <dt>major-unit</dt>      <dd><code>@</code> The number of units between axis labels.</dd>
         *   <dt>max</dt>             <dd><code>@</code> The minimum value shown on the axis.</dd>
         *   <dt>min</dt>             <dd><code>@</code> The maximum value shown on the axis.</dd>
         *   <dt>minor-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes minor grid lines.</dd>
         *   <dt>minor-tick-marks</dt><dd><code>@</code> Defines the appearance of minor tick marks on the axis
         *                            (see @see:TickMark).</dd>
         *   <dt>minor-unit</dt>      <dd><code>@</code> The number of units between minor axis ticks.</dd>
         *   <dt>origin</dt>          <dd><code>@</code> The axis origin.</dd>
         *   <dt>overlappingLabels</dt><dd><code>@</code> The @see:OverlappingLabels value indicating how to handle the overlapping axis labels.</dd>
         *   <dt>position</dt>        <dd><code>@</code> The @see:Position value indicating the position of the axis.</dd>
         *   <dt>reversed</dt>        <dd><code>@</code> The value indicating whether the axis is reversed (top to
         *                            bottom or right to left).</dd>
         *   <dt>title</dt>           <dd><code>@</code> The title text shown next to the axis.</dd>
         * </dl>
         */
        var WjFlexChartAxis = (function (_super) {
            __extends(WjFlexChartAxis, _super);
            // Initializes a new instance of a WjFlexCharAxis.
            function WjFlexChartAxis() {
                _super.call(this);
                this.require = ['?^wjFlexChartSeries', '?^wjFinancialChartSeries', '?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartAxis" />';
            }
            Object.defineProperty(WjFlexChartAxis.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.Axis;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartAxis.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartAxis;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:Legend object.
         *
         * The <b>wj-flex-chart-legend</b> directive must be contained in a @see:WjFlexChart directive, @see:WjFlexPie directive or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>position</dt>       <dd><code>@</code> The @see:Position value indicating the position of the
         *                           legend.</dd>
         * </dl>
         *
         * The example below shows how you can use the wj-flex-chart-legend directive
         * to change the position of the chart legend:
         *
         * <pre>&lt;wj-flex-chart
         *   items-source="data"
         *   binding-x="country"&gt;
         *   &lt;wj-flex-chart-axis
         *       wj-property="axisY"
         *       major-unit="5000"&gt;
         *     &lt;/wj-flex-chart-axis&gt;
         *     &lt;wj-flex-chart-series
         *       binding="sales"
         *       name="Sales"&gt;
         *     &lt;/wj-flex-chart-series&gt;
         *   &lt;wj-flex-chart-legend
         *     position="Bottom"&gt;
         *   &lt;/wj-flex-chart-legend&gt;
         * &lt;/wj-flex-chart&gt;</pre>
         */
        var WjFlexChartLegend = (function (_super) {
            __extends(WjFlexChartLegend, _super);
            // Initializes a new instance of a WjFlexChartLegend.
            function WjFlexChartLegend() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFlexPie', '?^wjSunburst', '?^wjFinancialChart'];
                this.template = '<div />';
            }
            Object.defineProperty(WjFlexChartLegend.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.Legend;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartLegend;
        }(angular.WjDirective));
        // abstract
        var WjFlexChartDataLabelBase = (function (_super) {
            __extends(WjFlexChartDataLabelBase, _super);
            function WjFlexChartDataLabelBase() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFlexPie', '?^wjSunburst'];
                this.template = '<div />';
            }
            Object.defineProperty(WjFlexChartDataLabelBase.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.DataLabelBase;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartDataLabelBase;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:DataLabel object.
         *
         * The <b>wj-flex-chart-data-label</b> directive must be contained in a @see:WjFlexChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
         *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
         *   <dt>position</dt>      <dd><code>@</code> The @see:LabelPosition value indicating the position of the data labels.</dd>
         * </dl>
         */
        var WjFlexChartDataLabel = (function (_super) {
            __extends(WjFlexChartDataLabel, _super);
            function WjFlexChartDataLabel() {
                _super.call(this);
                this.require = '^wjFlexChart';
            }
            Object.defineProperty(WjFlexChartDataLabel.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.DataLabel;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartDataLabel;
        }(WjFlexChartDataLabelBase));
        /**
         * AngularJS directive for the @see:FlexPie @see:PieDataLabel object.
         *
         * The <b>wj-flex-pie-data-label</b> directive must be contained in a @see:WjFlexPie directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
         *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
         *   <dt>position</dt>      <dd><code>@</code> The @see:PieLabelPosition value indicating the position of the data labels.</dd>
         * </dl>
         */
        var WjFlexPieDataLabel = (function (_super) {
            __extends(WjFlexPieDataLabel, _super);
            function WjFlexPieDataLabel() {
                _super.call(this);
                this.require = ['^wjFlexPie', '?^wjSunburst'];
            }
            Object.defineProperty(WjFlexPieDataLabel.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.PieDataLabel;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexPieDataLabel;
        }(WjFlexChartDataLabelBase));
        // abstract for FlexChart and FinancialChart series
        var WjSeriesBase = (function (_super) {
            __extends(WjSeriesBase, _super);
            function WjSeriesBase() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjSeriesBase" ng-transclude />';
                this.transclude = true;
            }
            Object.defineProperty(WjSeriesBase.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.SeriesBase;
                },
                enumerable: true,
                configurable: true
            });
            WjSeriesBase.prototype._getId = function () {
                // fixes issue with ordering of series that
                // are of different types
                return 'series';
            };
            return WjSeriesBase;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:Series object.
         *
         * The <b>wj-flex-chart-series</b> directive must be contained in a @see:WjFlexChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
         *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:ChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this series
         *                         for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any settings at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any settings at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         * </dl>
         *
         * In most cases, the <b>wj-flex-chart-series</b> specifies only the <b>name</b> and <b>binding</b> properties.
         * The remaining values are inherited from the parent <b>wj-flex-chart</b> directive.
         */
        var WjFlexChartSeries = (function (_super) {
            __extends(WjFlexChartSeries, _super);
            // Initializes a new instance of a WjFlexChartSeries
            function WjFlexChartSeries() {
                _super.call(this);
                this.require = '^wjFlexChart';
                this.template = '<div class="wjFlexChartSeries" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartSeries.prototype, "_controlConstructor", {
                // Returns constructor of related Wijmo object. Abstract member, must be overridden in inherited class
                get: function () {
                    return wijmo.chart.Series;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartSeries;
        }(WjSeriesBase));
        /**
         * AngularJS directive for the @see:FlexChart @see:LineMarker object.
         *
         * The <b>wj-flex-line-marker</b> directive must be contained in a @see:WjFlexChart directive or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>is-visible</dt>             <dd><code>@</code> The value indicating whether the LineMarker is visible.</dd>
         *   <dt>series-index</dt>           <dd><code>@</code> The index of the series in the chart in which the LineMarker appears.</dd>
         *   <dt>horizontal-position</dt>    <dd><code>@</code> The horizontal position of the LineMarker relative to the plot area.</dd>
         *   <dt>content</dt>               <dd><code>@</code> The function that allows you to customize the text content of the LineMarker.</dd>
         *   <dt>vertical-position</dt>      <dd><code>@</code> The vertical position of the LineMarker relative to the plot area.</dd>
         *   <dt>alignment</dt>             <dd><code>@</code> The @see:LineMarkerAlignment value indicating the alignment of the LineMarker content.</dd>
         *   <dt>lines</dt>                 <dd><code>@</code> The @see:LineMarkerLines value indicating the appearance of the LineMarker's lines.</dd>
         *   <dt>interaction</dt>           <dd><code>@</code> The @see:LineMarkerInteraction value indicating the interaction mode of the LineMarker.</dd>
         *   <dt>drag-threshold</dt>         <dd><code>@</code> The maximum distance from the horizontal or vertical line that you can drag the marker.</dd>
         *   <dt>drag-content</dt>           <dd><code>@</code> The value indicating whether you can drag the content of the marker when the interaction mode is "Drag".</dd>
         *   <dt>drag-lines</dt>             <dd><code>@</code> The value indicating whether the lines are linked when you drag the horizontal or vertical line when the interaction mode is "Drag".</dd>
         * </dl>
         */
        var WjFlexChartLineMarker = (function (_super) {
            __extends(WjFlexChartLineMarker, _super);
            // Initializes a new instance of a WjFlexChartLineMarker
            function WjFlexChartLineMarker() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
            }
            Object.defineProperty(WjFlexChartLineMarker.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.LineMarker;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartLineMarker;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:DataPoint object.
         *
         * The <b>wj-flex-chart-data-point</b> directive must be contained in a
         * @see:WjFlexChartAnnotation directive. The property of the parent directive's object
         * where <b>wj-flex-data-point</b> should assign a value is specified in the
         * <b>wj-property</b> attribute.
         *
         * The directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *
         *   <dt>wj-property</dt>        <dd><code>@</code> The name of the parent directive object's property where the
         *                                <b>DataPoint</b> will be assigned.</dd>
         *   <dt>x</dt>                  <dd><code>@</code> x coordinate, can be a numeric or date value.</dd>
         *   <dt>y</dt>                  <dd><code>@</code> y coordinate, can be a numeric or date value.</dd>
         * </dl>
         */
        var WjFlexChartDataPoint = (function (_super) {
            __extends(WjFlexChartDataPoint, _super);
            // Initializes a new instance of a WjFlexChartDataPoint
            function WjFlexChartDataPoint() {
                _super.call(this);
                this.require = ['?^wjFlexChartAnnotation'];
            }
            Object.defineProperty(WjFlexChartDataPoint.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.DataPoint;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartDataPoint;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:AnnotationLayer object.
         *
         * The <b>wj-flex-chart-annotation-layer</b> directive must be contained in a @see:WjFlexChart directive
         * or @see:WjFinancialChart directive.
         *
         */
        var WjFlexChartAnnotationLayer = (function (_super) {
            __extends(WjFlexChartAnnotationLayer, _super);
            // Initializes a new instance of a WjFlexChartAnnotationLayer
            function WjFlexChartAnnotationLayer() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartAnnotationLayer" ng-transclude />';
                this.transclude = true;
            }
            Object.defineProperty(WjFlexChartAnnotationLayer.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.annotation.AnnotationLayer;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartAnnotationLayer;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:wijmo.chart.animation.ChartAnimation object.
         *
         * The <b>wj-flex-chart-animation</b> directive must be contained in a @see:WjFlexChart or @see:WjFlexPie or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>animation-mode</dt>     <dd><code>@</code> The value indicating whether the plot points animate one at a time, series by series, or all at once.</dd>
         *   <dt>easing</dt>           <dd><code>@</code> The value indicating the easing function applied to the animation.</dd>
         *   <dt>duration</dt>           <dd><code>@</code> The value indicating the length of entire animation in milliseconds.</dd>
         *   <dt>axis-animation</dt>           <dd><code>@</code> The value indicating whether the axis animation is enabled.</dd>
         * </dl>
         */
        var WjFlexChartAnimation = (function (_super) {
            __extends(WjFlexChartAnimation, _super);
            // Initializes a new instance of a WjFlexChartRangeSelector
            function WjFlexChartAnimation() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFlexPie', '?^wjSunburst', '?^wjFinancialChart'];
            }
            Object.defineProperty(WjFlexChartAnimation.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.animation.ChartAnimation;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartAnimation;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the annotations.
         *
         * The <b>wj-flex-chart-annotation</b> directive must be contained in a
         * @see:WjFlexChartAnnotationLayer directive.
         *
         * The <b>wj-flex-chart-annotation</b> directive is used to represent all types of
         * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
         * and so on. The type of annotation shape is specified
         * in the directive's <b>type</b> attribute.
         *
         * The directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *
         *   <dt>type</dt>                  <dd><code>@</code> The class name of the annotation shape represented by the directive.
         *                                      The possible values are @see:Circle, @see:Ellipse, @see:Image, @see:Line, @see:Polygon,
         *                                      @see:Rectangle, @see:Square, @see:Text.</dd>
         *   <dt>attachment</dt>            <dd><code>@</code> An @see:AnnotationAttachment value defining the attachment of the annotation.
         *                                      </dd>
         *   <dt>content</dt>               <dd><code>@</code> The text of the <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Line</b>,
         *                                      <b>Polygon</b>, <b>Rectangle</b> or <b>Square</b> annotation.</dd>
         *   <dt>end</dt>                   <dd><code>@</code> The end point of the <b>Line</b> annotation.</dd>
         *   <dt>height</dt>                <dd><code>@</code> The height of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
         *   <dt>href</dt>                  <dd><code>@</code> The href of the <b>Image</b> annotation.</dd>
         *   <dt>is-visible</dt>             <dd><code>@</code> The visibility of the annotation.</dd>
         *   <dt>length</dt>                <dd><code>@</code> The length of the <b>Square</b> annotation.</dd>
         *   <dt>name</dt>                  <dd><code>@</code> The name of the annotation.</dd>
         *   <dt>offset</dt>                <dd><code>@</code> The offset of the annotation.</dd>
         *   <dt>point</dt>                 <dd><code>@</code> The point of the annotation, the coordinate space of the point depends on the <b>attachment</b>  property value.
         *                                      The property works for <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Rectangle</b>, <b>Square</b>
         *                                      and <b>Text</b> annotation.</dd>
         *   <dt>point-index</dt>           <dd><code>@</code> The index of the data point in the specified series where the annotation is attached to.</dd>
         *   <dt>position</dt>              <dd><code>@</code> An @see:AnnotationPosition value defining the position of the annotation
         *                                      relative to the <b>point</b>.</dd>
         *   <dt>radius</dt>                <dd><code>@</code> The radius of the <b>Circle</b> annotation.</dd>
         *   <dt>series-index</dt>          <dd><code>@</code> The index of the data series where the annotation is attached to.</dd>
         *   <dt>start</dt>                 <dd><code>@</code> The start point of the <b>Line</b> annotation.</dd>
         *   <dt>style</dt>                 <dd><code>@</code> The style of the annotation.</dd>
         *   <dt>text</dt>                  <dd><code>@</code> The text of the <b>Text</b> annotation.</dd>
         *   <dt>tooltip</dt>               <dd><code>@</code> The tooltip of the annotation.</dd>
         *   <dt>width</dt>                 <dd><code>@</code> The width of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
         * </dl>
         */
        var WjFlexChartAnnotation = (function (_super) {
            __extends(WjFlexChartAnnotation, _super);
            // Initializes a new instance of a WjFlexChartAnnotation
            function WjFlexChartAnnotation() {
                _super.call(this);
                this.require = '^wjFlexChartAnnotationLayer';
                this.template = '<div class="wjFlexChartAnnotation" ng-transclude />';
                this.transclude = true;
            }
            WjFlexChartAnnotation.prototype._createLink = function () {
                return new WjFlexChartAnnotationLink();
            };
            WjFlexChartAnnotation.prototype._getMetaDataId = function () {
                return 'FlexChartAnnotation';
            };
            return WjFlexChartAnnotation;
        }(angular.WjDirective));
        var WjFlexChartAnnotationLink = (function (_super) {
            __extends(WjFlexChartAnnotationLink, _super);
            function WjFlexChartAnnotationLink() {
                _super.apply(this, arguments);
            }
            WjFlexChartAnnotationLink.prototype._initControl = function () {
                return new wijmo.chart.annotation[this.scope['type']]();
            };
            return WjFlexChartAnnotationLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for the @see:FlexChart @see:wijmo.chart.interaction.RangeSelector object.
         *
         * The <b>wj-flex-chart-range-selector</b> directive must be contained in a @see:WjFlexChart directive or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>is-visible</dt>     <dd><code>@</code> The value indicating whether the RangeSelector is visible.</dd>
         *   <dt>min</dt>           <dd><code>@</code> The minimum value of the range.</dd>
         *   <dt>max</dt>           <dd><code>@</code> The maximum value of the range.</dd>
         *   <dt>orientation</dt>   <dd><code>@</code> The orientation of the RangeSelector.</dd>
         *   <dt>seamless</dt>      <dd><code>@</code> The value indicating whether the minimal and maximal handler will move seamlessly.</dd>
         *   <dt>min-scale</dt>      <dd><code>@</code> the valid minimum range of the RangeSelector.</dd>
         *   <dt>max-scale</dt>      <dd><code>@</code> the valid maximum range of the RangeSelector.</dd>
         * </dl>
         */
        var WjFlexChartRangeSelector = (function (_super) {
            __extends(WjFlexChartRangeSelector, _super);
            // Initializes a new instance of a WjFlexChartRangeSelector
            function WjFlexChartRangeSelector() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
            }
            Object.defineProperty(WjFlexChartRangeSelector.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.interaction.RangeSelector;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartRangeSelector;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexChart @see:wijmo.chart.interaction.ChartGestures object.
         *
         * The <b>wj-flex-chart-gestures</b> directive must be contained in a @see:WjFlexChart directive or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>mouse-action</dt>     <dd><code>@</code> The value indicating mouse action is zooming or panning.</dd>
         *   <dt>interactive-axes</dt> <dd><code>@</code> The value indicating which axis is interactive.</dd>
         *   <dt>enable</dt>          <dd><code>@</code> The value indicating the gestures action is enabled or not.</dd>
         *   <dt>scale-x</dt>          <dd><code>@</code> The value indicating axisX initial range between Min and Max.</dd>
         *   <dt>scale-y</dt>          <dd><code>@</code> The value indicating axisY initial range between Min and Max.</dd>
         *   <dt>pos-x</dt>            <dd><code>@</code> The value indicating initial position on the axisX.</dd>
         *   <dt>pos-y</dt>            <dd><code>@</code> The value indicating initial position on the axisY.</dd>
         * </dl>
         */
        var WjFlexChartChartGestures = (function (_super) {
            __extends(WjFlexChartChartGestures, _super);
            // Initializes a new instance of a WjFlexChartChartGestures
            function WjFlexChartChartGestures() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
            }
            Object.defineProperty(WjFlexChartChartGestures.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.interaction.ChartGestures;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartChartGestures;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FlexPie control.
         *
         * <dl class="dl-horizontal">
         *   <dt>items-source</dt>      <dd><code>=</code> An array or @see:ICollectionView
         *                              object that contains data for the chart.</dd>
         *   <dt>binding</dt>           <dd><code>@</code> The name of the property that
         *                              contains item values.</dd>
         *   <dt>binding-name</dt>      <dd><code>@</code> The name of the property that
         *                              contains item names.</dd>
         *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
         *                              text).</dd>
         *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
         *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
         *                              text).</dd>
         *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
         *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
         *                              initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
         *                              initializing the control with attribute values. </dd>
         *   <dt>inner-radius</dt>      <dd><code>@</code> The size of the hole inside the
         *                              pie, measured as a fraction of the pie radius.</dd>
         *   <dt>is-animated</dt>       <dd><code>@</code> A value indicating whether to use animation
         *                              to move selected items to the selectedItemPosition.</dd>
         *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
         *                              appearance of data points.</dd>
         *   <dt>offset</dt>            <dd><code>@</code> The extent to which pie slices are pulled
         *                              out from the center, as a fraction of the pie radius.</dd>
         *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
         *                              displaying pie slices.</dd>
         *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
         *                              edges of the control and the plot area, or CSS-style margins.</dd>
         *   <dt>reversed</dt>          <dd><code>@</code> A value indicating whether to draw pie
         *                              slices in a counter-clockwise direction.</dd>
         *   <dt>start-angle</dt>       <dd><code>@</code> The starting angle for pie slices,
         *                              measured clockwise from the 9 o'clock position.</dd>
         *   <dt>selected-item-offset</dt>
         *                              <dd><code>@</code> The extent to which the selected pie slice is
         *                              pulled out from the center, as a fraction of the pie radius.</dd>
         *   <dt>selected-item-position</dt>
         *                              <dd><code>@</code> The @see:Position value indicating where to display
         *                              the selected slice.</dd>
         *   <dt>selection-mode</dt>    <dd><code>@</code> The @see:SelectionMode value indicating whether or what is
         *                              selected when the user clicks a series.</dd>
         *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
         *                              @see:ChartTooltip content property.</dd>
         *   <dt>got-focus</dt>         <dd><code>&</code> The @see:FlexPie.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>        <dd><code>&</code> The @see:FlexPie.lostFocus event handler.</dd>
         *   <dt>rendering</dt>         <dd><code>&</code> The @see:FlexPie.rendering event handler.</dd>
         *   <dt>rendered</dt>          <dd><code>&</code> The @see:FlexPie.rendered event handler.</dd>
         * </dl>
         *
         * The wj-flex-pie directive may contain the following child directives:
         * @see:WjFlexChartLegend and @see:WjFlexPieDataLabel.
         */
        var WjFlexPie = (function (_super) {
            __extends(WjFlexPie, _super);
            function WjFlexPie() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjFlexPie.prototype, "_controlConstructor", {
                // gets the Wijmo FlexPie control constructor
                get: function () {
                    return wijmo.chart.FlexPie;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexPie.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                var self = this; // store this in closure as .apply() call overrides the reference
                var lblContentDesc = angular.MetaFactory.findProp('labelContent', this._props);
                lblContentDesc.customHandler = function (scope, control, value, oldValue, link) {
                    if (value != null) {
                        control.dataLabel.content = value;
                    }
                };
            };
            return WjFlexPie;
        }(WjFlexChartBase));
        /**
         * AngularJS directive for the @see:Sunburst control.
         *
         * <dl class="dl-horizontal">
         *   <dt>child-items-path</dt>  <dd><code>=</code> An array or string object used to generate child items in hierarchical data.</dd>
         * </dl>
         *
         */
        var WjSunburst = (function (_super) {
            __extends(WjSunburst, _super);
            function WjSunburst() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjSunburst.prototype, "_controlConstructor", {
                // gets the Wijmo Sunburst control constructor
                get: function () {
                    return wijmo.chart.hierarchical.Sunburst;
                },
                enumerable: true,
                configurable: true
            });
            return WjSunburst;
        }(WjFlexPie));
        /**
         * AngularJS directive for the @see:FinancialChart control.
         *
         * Use the <b>wj-financial-chart</b> directive to add financial charts to your AngularJS applications.
         * Note that directive and parameter names must be formatted using lower-case letters
         * with dashes instead of camel case.
         *
         * The wj-financial-chart directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
         *                              values for the chart. You can override this at the series level.</dd>
         *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
         *                              values for the chart. You can override this at the series level.</dd>
         *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
         *                              objects. You can override this at the series level. See @see:FinancialChartType.</dd>
         *   <dt>control</dt>           <dd><code>=</code> A reference to the @see:FinancialChart control
         *                              that this directive creates.</dd>
         *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
         *                              text).</dd>
         *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
         *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
         *                              text).</dd>
         *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
         *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
         *                              initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
         *                              initializing the control with attribute values. </dd>
         *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
         *                              leave gaps when there are null values in the data.</dd>
         *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
         *                              appearance of data points.</dd>
         *   <dt>items-source</dt>      <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                              the data used to create the chart.</dd>
         *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
         *                              toggles series visibility.</dd>
         *   <dt>options</dt>           <dd><code>=</code> Chart options that only apply to certain chart types.
         *                              See <b>options</b> under @see:FinancialChart for details.</dd>
         *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
         *                              displaying each series.</dd>
         *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
         *                              edges of the control and the plot area, or CSS-style margins.</dd>
         *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
         *   <dt>selection-mode</dt>    <dd><code>@</code> The @see:SelectionMode value indicating whether or what is
         *                              selected when the user clicks a series.</dd>
         *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data
         *                              points in Scatter, LineSymbols, and SplineSymbols charts, in pixels. You can override
         *                              this at the series level.</dd>
         *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
         *                              @see:ChartTooltip content property.</dd>
         *   <dt>got-focus</dt>         <dd><code>&</code> The @see:FinancialChart.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>        <dd><code>&</code> The @see:FinancialChart.lostFocus event handler.</dd>
         *   <dt>rendering</dt>         <dd><code>&</code> The @see:FinancialChart.rendering event handler.</dd>
         *   <dt>rendered</dt>          <dd><code>&</code> The @see:FinancialChart.rendered event handler.</dd>
         *   <dt>series-visibility-changed</dt>
         *                              <dd><code>&</code> The @see:FinancialChart.seriesVisibilityChanged event handler.</dd>
         *   <dt>selection-changed</dt> <dd><code>&</code> The @see:FinancialChart.selectionChanged event handler.</dd>
         * </dl>
         *
         * The wj-financial-chart directive may contain the following child directives:
         * @see:WjFlexChartAxis, @see:WjFlexChartSeries, @see:WjFlexChartLegend and @see:WjFlexChartDataLabel.
         */
        var WjFinancialChart = (function (_super) {
            __extends(WjFinancialChart, _super);
            function WjFinancialChart() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjFinancialChart.prototype, "_controlConstructor", {
                // gets the Wijmo FinancialChart control constructor
                get: function () {
                    return wijmo.chart.finance.FinancialChart;
                },
                enumerable: true,
                configurable: true
            });
            return WjFinancialChart;
        }(WjFlexChartCore));
        /**
         * AngularJS directive for the @see:FinancialChart @see:FinancialSeries object.
         *
         * The <b>wj-financial-chart-series</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
         *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:FinancialChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this
         *                         series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         * </dl>
         *
         * In most cases, the <b>wj-financial-chart-series</b> specifies the <b>name</b> and <b>binding</b> properties only.
         * The remaining values are inherited from the parent <b>wj-financial-chart</b> directive.
         */
        var WjFinancialChartSeries = (function (_super) {
            __extends(WjFinancialChartSeries, _super);
            // Initializes a new instance of a WjFinancialChartSeries
            function WjFinancialChartSeries() {
                _super.call(this);
                this.require = '^wjFinancialChart';
                this.template = '<div class="wjFinancialChartSeries" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFinancialChartSeries.prototype, "_controlConstructor", {
                // Returns constructor of related Wijmo object. Abstract member, must be overridden in inherited class
                get: function () {
                    return wijmo.chart.finance.FinancialSeries;
                },
                enumerable: true,
                configurable: true
            });
            return WjFinancialChartSeries;
        }(WjSeriesBase));
        // abstract for FlexChart and FinancialChart trendlines
        var WjTrendLineBase = (function (_super) {
            __extends(WjTrendLineBase, _super);
            function WjTrendLineBase() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjTrendLineBase" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjTrendLineBase.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.TrendLineBase;
                },
                enumerable: true,
                configurable: true
            });
            return WjTrendLineBase;
        }(WjSeriesBase));
        /**
         * AngularJS directive for the @see:FlexChart and @see:FinancialChart @see:TrendLine object.
         *
         * The <b>wj-flex-chart-trend-line</b> directive must be contained in a @see:WjFlexChart or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:ChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
         *   <dt>fit-type</dt>     <dd><code>@</code> The @see:TrendLineFitType value for the trend line.</dd>
         *   <dt>order</dt>        <dd><code>@</code> The number of terms in a polynomial or fourier equation.</dd>
         * </dl>
         *
         */
        var WjFlexChartTrendLine = (function (_super) {
            __extends(WjFlexChartTrendLine, _super);
            function WjFlexChartTrendLine() {
                _super.call(this);
                //this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjTrendLine" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartTrendLine.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.TrendLine;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartTrendLine;
        }(WjTrendLineBase));
        /**
         * AngularJS directive for the @see:FlexChart and @see:FinancialChart @see:MovingAverage object.
         *
         * The <b>wj-flex-chart-moving-average</b> directive must be contained in a @see:WjFlexChart or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:ChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>type</dt>         <dd><code>@</code> The @see:MovingAverageType value for the moving average series.</dd>
         *   <dt>period</dt>       <dd><code>@</code> The period for the moving average calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartMovingAverage = (function (_super) {
            __extends(WjFlexChartMovingAverage, _super);
            function WjFlexChartMovingAverage() {
                _super.call(this);
                //this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjMovingAverage" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartMovingAverage.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.MovingAverage;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartMovingAverage;
        }(WjTrendLineBase));
        /**
         * AngularJS directive for the @see:FlexChart and @see:FinancialChart @see:YFunctionSeries object.
         *
         * The <b>wj-flex-chart-y-function-series</b> directive must be contained in a @see:WjFlexChart or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:ChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
         *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
         *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
         *   <dt>func</dt>       <dd><code>@</code> The function used to calculate Y value.</dd>
         * </dl>
         *
         */
        var WjFlexChartYFunctionSeries = (function (_super) {
            __extends(WjFlexChartYFunctionSeries, _super);
            function WjFlexChartYFunctionSeries() {
                _super.call(this);
                //this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjYFunctionSeries" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartYFunctionSeries.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.YFunctionSeries;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartYFunctionSeries;
        }(WjTrendLineBase));
        /**
         * AngularJS directive for the @see:FlexChart and @see:FinancialChart @see:WjFlexChartParametricFunctionSeries object.
         *
         * The <b>wj-flex-chart-parametric-function-series</b> directive must be contained in a @see:WjFlexChart or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
         *                         objects. This value overrides the default chart type set on the chart. See
         *                         @see:ChartType.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
         *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
         *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
         *   <dt>x-func</dt>       <dd><code>@</code> The function used to calculate the x value.</dd>
         *   <dt>y-func</dt>       <dd><code>@</code> The function used to calculate the y value.</dd>
         * </dl>
         *
         */
        var WjFlexChartParametricFunctionSeries = (function (_super) {
            __extends(WjFlexChartParametricFunctionSeries, _super);
            function WjFlexChartParametricFunctionSeries() {
                _super.call(this);
                //this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjParametricFunctionSeries" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartParametricFunctionSeries.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.ParametricFunctionSeries;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartParametricFunctionSeries.prototype._initProps = function () {
                _super.prototype._initProps.call(this);
                var self = this; // store this in closure as .apply() call overrides the reference
                var funcDesc = angular.MetaFactory.findProp('func', this._props);
                funcDesc.customHandler = function (scope, control, value, oldValue, link) {
                    if (value != null) {
                        control.xFunc = value;
                    }
                };
            };
            return WjFlexChartParametricFunctionSeries;
        }(WjTrendLineBase));
        /**
         * AngularJS directive for the @see:FlexChart and @see:FinancialChart @see:Waterfall object.
         *
         * The <b>wj-flex-chart-waterfall</b> directive must be contained in a @see:WjFlexChart or @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>relative-data</dt> <dd><code>@</code> The value that determines whether the given data is relative.</dd>
         *   <dt>start</dt>        <dd><code>@</code> The value of the start bar.</dd>
         *   <dt>start-label</dt>  <dd><code>@</code> The label of the start bar.</dd>
         *   <dt>show-total</dt>   <dd><code>@</code> The value that determines whether the show the total bar.</dd>
         *   <dt>total-label</dt>  <dd><code>@</code> The label of the total bar.</dd>
         *   <dt>show-intermediate-total</dt>      <dd><code>@</code> The value that determines whether to show the intermediate total bar.</dd>
         *   <dt>intermediate-total-positions</dt> <dd><code>@</code> The value that contains the index for positions of the intermediate total bar.</dd>
         *   <dt>intermediate-total-labels</dt>    <dd><code>@</code> The value that contains the label of the intermediate total bar.</dd>
         *   <dt>connector-lines</dt>  <dd><code>@</code> The value that determines whether to show connector lines.</dd>
         *   <dt>styles</dt>       <dd><code>@</code> The value of the waterfall styles.</dd>
         * </dl>
         *
         */
        var WjFlexChartWaterfall = (function (_super) {
            __extends(WjFlexChartWaterfall, _super);
            function WjFlexChartWaterfall() {
                _super.call(this);
                this.require = ['?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjWaterfall" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartWaterfall.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.analytics.Waterfall;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartWaterfall;
        }(WjSeriesBase));
        var WjFlexChartPlotArea = (function (_super) {
            __extends(WjFlexChartPlotArea, _super);
            // Initializes a new instance of a WjFlexChartPlotArea.
            function WjFlexChartPlotArea() {
                _super.call(this);
                this.require = ['?^wjFlexChartPlotArea', '?^wjFlexChart', '?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartPlotArea" />';
            }
            Object.defineProperty(WjFlexChartPlotArea.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.PlotArea;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartPlotArea.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartPlotArea;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:FinancialChart @see:Fibonacci object.
         *
         * The <b>wj-flex-chart-fibonacci</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>high</dt>         <dd><code>@</code> The high value of @see:Fibonacci tool.</dd>
         *   <dt>labelPosition</dt> <dd><code>@</code> The label position for levels in @see:Fibonacci tool.</dd>
         *   <dt>levels</dt>       <dd><code>@</code> The levels value of @see:Fibonacci tool.</dd>
         *   <dt>low</dt>          <dd><code>@</code> The low value of @see:Fibonacci tool.</dd>
         *   <dt>minX</dt>         <dd><code>@</code> The x minimum value of @see:Fibonacci tool.</dd>
         *   <dt>maxX</dt>         <dd><code>@</code> The x maximum value of @see:Fibonacci tool.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>uptrend</dt>      <dd><code>@</code> The value indicating whether to create uptrending @see:Fibonacci tool.</dd>
         * </dl>
         *
         */
        var WjFlexChartFibonacci = (function (_super) {
            __extends(WjFlexChartFibonacci, _super);
            // Initializes a new instance of a WjFlexChartFibonacci
            function WjFlexChartFibonacci() {
                _super.call(this);
                this.require = ['?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartFibonacci" ng-transclude />';
                //this.transclude = true;
            }
            Object.defineProperty(WjFlexChartFibonacci.prototype, "_controlConstructor", {
                // Returns constructor of related Wijmo object. Abstract member, must be overridden in inherited class
                get: function () {
                    return wijmo.chart.finance.analytics.Fibonacci;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartFibonacci.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartFibonacci;
        }(WjSeriesBase));
        /**
         * AngularJS directive for the @see:FinancialChart @see:FibonacciArcs object.
         *
         * The <b>wj-flex-chart-fibonacci-arcs</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>labelPosition</dt> <dd><code>@</code> The @see:LabelPosition for levels in @see:FibonacciArcs tool.</dd>
         *   <dt>levels</dt>       <dd><code>@</code> The levels value of @see:FibonacciArcs tool.</dd>
         *   <dt>start-x</dt>       <dd><code>@</code> The starting X value of @see:FibonacciArcs tool.</dd>
         *   <dt>end-x</dt>         <dd><code>@</code> The ending X value of @see:FibonacciArcs tool.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         * </dl>
         *
         */
        var WjFlexChartFibonacciArcs = (function (_super) {
            __extends(WjFlexChartFibonacciArcs, _super);
            function WjFlexChartFibonacciArcs() {
                _super.call(this);
                this.require = ['?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartFibonacciArcs" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartFibonacciArcs.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.FibonacciArcs;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartFibonacciArcs.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartFibonacciArcs;
        }(WjSeriesBase));
        /**
          * AngularJS directive for the @see:FinancialChart @see:FibonacciFans object.
          *
          * The <b>wj-flex-chart-fibonacci-fans</b> directive must be contained in a @see:WjFinancialChart directive.
          * It supports the following attributes:
          *
          * <dl class="dl-horizontal">
          *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
          *                         series. This value overrides any binding set for the chart.</dd>
          *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
          *                         series. This value overrides any binding set for the chart.</dd>
          *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
          *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
          *                         data for this series.</dd>
          *   <dt>labelPosition</dt> <dd><code>@</code> The @see:LabelPosition for levels in @see:FibonacciFans tool.</dd>
          *   <dt>levels</dt>       <dd><code>@</code> The levels value of @see:FibonacciFans tool.</dd>
          *   <dt>start</dt>        <dd><code>@</code> The starting @see:DataPoint of @see:FibonacciFans tool.</dd>
          *   <dt>end</dt>          <dd><code>@</code> The ending @see:DataPoint of @see:FibonacciFans tool.</dd>
          *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
          *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
          *                         style object as an object. See the section on ngAttr attribute bindings in
          *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
          *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
          *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
          *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
          *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
          *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
          *                         display the series.</dd>
          * </dl>
          *
          */
        var WjFlexChartFibonacciFans = (function (_super) {
            __extends(WjFlexChartFibonacciFans, _super);
            function WjFlexChartFibonacciFans() {
                _super.call(this);
                this.require = ['?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartFibonacciFans" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartFibonacciFans.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.FibonacciFans;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartFibonacciFans.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartFibonacciFans;
        }(WjSeriesBase));
        /**
         * AngularJS directive for the @see:FinancialChart @see:FibonacciTimeZones object.
         *
         * The <b>wj-flex-chart-fibonacci-time-zones</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>labelPosition</dt> <dd><code>@</code> The @see:LabelPosition for levels in @see:FibonacciTimeZones tool.</dd>
         *   <dt>levels</dt>       <dd><code>@</code> The levels value of @see:FibonacciTimeZones tool.</dd>
         *   <dt>startX</dt>       <dd><code>@</code> The starting X value of @see:FibonacciTimeZones tool.</dd>
         *   <dt>endX</dt>         <dd><code>@</code> The ending X value of @see:FibonacciTimeZones tool.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         * </dl>
         *
         */
        var WjFlexChartFibonacciTimeZones = (function (_super) {
            __extends(WjFlexChartFibonacciTimeZones, _super);
            function WjFlexChartFibonacciTimeZones() {
                _super.call(this);
                this.require = ['?^wjFinancialChart'];
                this.template = '<div class="wjFlexChartFibonacciTimeZones" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartFibonacciTimeZones.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.FibonacciTimeZones;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexChartFibonacciTimeZones.prototype._initControl = function (element) {
                return _super.prototype._initControl.call(this, undefined);
            };
            return WjFlexChartFibonacciTimeZones;
        }(WjSeriesBase));
        // abstract for FinancialChart's overlays and indicators
        var WjBaseOverlayIndicator = (function (_super) {
            __extends(WjBaseOverlayIndicator, _super);
            function WjBaseOverlayIndicator() {
                _super.call(this);
                this.require = '^wjFinancialChart';
                this.template = '<div class="wjBaseOverlayIndicator" ng-transclude />';
            }
            Object.defineProperty(WjBaseOverlayIndicator.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.OverlayIndicatorBase;
                },
                enumerable: true,
                configurable: true
            });
            return WjBaseOverlayIndicator;
        }(WjSeriesBase));
        // abstract for FinancialChart's overlays and indicators
        var WjBaseSingleOverlayIndicator = (function (_super) {
            __extends(WjBaseSingleOverlayIndicator, _super);
            function WjBaseSingleOverlayIndicator() {
                _super.call(this);
                this.template = '<div class="wjBaseSingleOverlayIndicator" ng-transclude />';
            }
            Object.defineProperty(WjBaseSingleOverlayIndicator.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.SingleOverlayIndicatorBase;
                },
                enumerable: true,
                configurable: true
            });
            return WjBaseSingleOverlayIndicator;
        }(WjBaseOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:ATR object.
         *
         * The <b>wj-flex-chart-atr</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code> The period for the average true range calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartAtr = (function (_super) {
            __extends(WjFlexChartAtr, _super);
            function WjFlexChartAtr() {
                _super.call(this);
                this.template = '<div class="wjFlexChartAtr" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartAtr.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.ATR;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartAtr;
        }(WjBaseSingleOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:CCI object.
         *
         * The <b>wj-flex-chart-cci</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code> The period for the commodity channel index calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartCci = (function (_super) {
            __extends(WjFlexChartCci, _super);
            function WjFlexChartCci() {
                _super.call(this);
                this.template = '<div class="wjFlexChartCci" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartCci.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.CCI;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartCci;
        }(WjBaseSingleOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:RSI object.
         *
         * The <b>wj-flex-chart-rsi</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code> The period for the relative strength index calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartRsi = (function (_super) {
            __extends(WjFlexChartRsi, _super);
            function WjFlexChartRsi() {
                _super.call(this);
                this.template = '<div class="wjFlexChartRsi" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartRsi.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.RSI;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartRsi;
        }(WjBaseSingleOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:WilliamsR object.
         *
         * The <b>wj-flex-chart-williams-r</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code> The period for the Williams %R calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartWilliamsR = (function (_super) {
            __extends(WjFlexChartWilliamsR, _super);
            function WjFlexChartWilliamsR() {
                _super.call(this);
                this.template = '<div class="wjFlexChartWilliamsR" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartWilliamsR.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.WilliamsR;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartWilliamsR;
        }(WjBaseSingleOverlayIndicator));
        // base for MACD
        var WjFlexChartMacdBase = (function (_super) {
            __extends(WjFlexChartMacdBase, _super);
            function WjFlexChartMacdBase() {
                _super.call(this);
                this.template = '<div class="wjFlexChartBaseMacd" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartMacdBase.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.MacdBase;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartMacdBase;
        }(WjBaseOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:Macd object.
         *
         * The <b>wj-flex-chart-macd</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>styles/dt>        <dd><code></code> The styles for the MACD and Signal lines.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
         *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
         *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartMacd = (function (_super) {
            __extends(WjFlexChartMacd, _super);
            function WjFlexChartMacd() {
                _super.call(this);
                this.template = '<div class="wjFlexChartMacd" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartMacd.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.Macd;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartMacd;
        }(WjFlexChartMacdBase));
        /**
         * AngularJS directive for the @see:FinancialChart @see:MacdHistogram object.
         *
         * The <b>wj-flex-chart-macd-histogram</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
         *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
         *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartMacdHistogram = (function (_super) {
            __extends(WjFlexChartMacdHistogram, _super);
            function WjFlexChartMacdHistogram() {
                _super.call(this);
                this.template = '<div class="wjFlexChartMacdHistogram" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartMacdHistogram.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.MacdHistogram;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartMacdHistogram;
        }(WjFlexChartMacdBase));
        /**
         * AngularJS directive for the @see:FinancialChart @see:Stochastic object.
         *
         * The <b>wj-flex-chart-stochastic</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>styles/dt>        <dd><code></code> The styles for the %K and %D lines.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>k-period</dt>     <dd><code>@</code>  The period for the %K calculation.</dd>
         *   <dt>d-period</dt>     <dd><code>@</code>  The period for the %D calculation.</dd>
         *   <dt>smoothing-period</dt>     <dd><code>@</code>  The smoothing period for the %K calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartStochastic = (function (_super) {
            __extends(WjFlexChartStochastic, _super);
            function WjFlexChartStochastic() {
                _super.call(this);
                this.template = '<div class="wjFlexChartStochastic" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartStochastic.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.Stochastic;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartStochastic;
        }(WjBaseOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:BollingerBands object.
         *
         * The <b>wj-flex-chart-bollinger-bands</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code>  The period for the Bollinger Bands calculation.</dd>
         *   <dt>multiplier/dt>    <dd><code>@</code> The standard deviation multiplier for the Bollinger Bands calculation.</dd>
         * </dl>
         *
         */
        var WjFlexChartBollingerBands = (function (_super) {
            __extends(WjFlexChartBollingerBands, _super);
            function WjFlexChartBollingerBands() {
                _super.call(this);
                this.template = '<div class="wjFlexChartBollingerBands" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartBollingerBands.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.BollingerBands;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartBollingerBands;
        }(WjBaseOverlayIndicator));
        /**
         * AngularJS directive for the @see:FinancialChart @see:Envelopes object.
         *
         * The <b>wj-flex-chart-envelopes</b> directive must be contained in a @see:WjFinancialChart directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
         *                         series. This value overrides any binding set for the chart.</dd>
         *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
         *   <dt>items-source</dt> <dd><code>=</code> An array or @see:ICollectionView object that contains
         *                         data for this series.</dd>
         *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
         *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
         *                         style object as an object. See the section on ngAttr attribute bindings in
         *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
         *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
         *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
         *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
         *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
         *                         overrides the default marker set on the chart. See @see:Marker.</dd>
         *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
         *                         This value overrides any set at the chart level.</dd>
         *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
         *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
         *                         This value overrides any setting at the chart level.</dd>
         *   <dt>visibility</dt>   <dd><code>=</code> The @see:SeriesVisibility value indicating whether and where to
         *                         display the series.</dd>
         *   <dt>period</dt>       <dd><code>@</code>  The period for the moving average envelopes calculation.</dd>
         *   <dt>size/dt>          <dd><code>@</code> The size of the moving average envelopes.</dd>
         *   <dt>type/dt>          <dd><code>@</code> The @see:MovingAverageType of the moving average to be used for the envelopes.</dd>
         * </dl>
         *
         */
        var WjFlexChartEnvelopes = (function (_super) {
            __extends(WjFlexChartEnvelopes, _super);
            function WjFlexChartEnvelopes() {
                _super.call(this);
                this.template = '<div class="wjFlexChartEnvelopes" ng-transclude />';
            }
            Object.defineProperty(WjFlexChartEnvelopes.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.chart.finance.analytics.Envelopes;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexChartEnvelopes;
        }(WjBaseOverlayIndicator));
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.chart.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo.gauge module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        //#region "Gauge directives registration"
        var wijmoGauge = window['angular'].module('wj.gauge', []);
        // register only if module is loaded
        if (wijmo.gauge && wijmo.gauge.LinearGauge) {
            wijmoGauge.directive('wjLinearGauge', [function () {
                    return new WjLinearGauge();
                }]);
            wijmoGauge.directive('wjBulletGraph', [function () {
                    return new WjBulletGraph();
                }]);
            wijmoGauge.directive('wjRadialGauge', [function () {
                    return new WjRadialGauge();
                }]);
            wijmoGauge.directive('wjRange', [function () {
                    return new WjRange();
                }]);
        }
        //#endregion "Gauge directives definitions"
        //#region "Gauge directives classes"
        // Gauge control directive
        // Provides base setup for all directives related to controls derived from Gauge
        // Abstract class, not for use in markup
        var WjGauge = (function (_super) {
            __extends(WjGauge, _super);
            // Creates a new instance of a WjGauge
            function WjGauge() {
                _super.call(this);
                this.template = '<div ng-transclude />';
                this.transclude = true;
            }
            Object.defineProperty(WjGauge.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.gauge.Gauge;
                },
                enumerable: true,
                configurable: true
            });
            return WjGauge;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:LinearGauge control.
         *
         * Use the <b>wj-linear-gauge</b> directive to add linear gauges to your AngularJS applications.
         * Note that directive and parameter names must be formatted in lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;wj-linear-gauge
         *   value="ctx.gauge.value"
         *   show-text="Value"
         *   is-read-only="false"&gt;
         *   &lt;wj-range
         *     wj-property="pointer"
         *     thickness="0.2"&gt;
         *     &lt;wj-range
         *       min="0"
         *       max="33"
         *       color="green"&gt;
         *     &lt;/wj-range&gt;
         *     &lt;wj-range
         *       min="33"
         *       max="66"
         *       color="yellow"&gt;
         *     &lt;/wj-range&gt;
         *     &lt;wj-range
         *       min="66"
         *       max="100"
         *       color="red"&gt;
         *     &lt;/wj-range&gt;
         *   &lt;/wj-range&gt;
         * &lt;/wj-linear-gauge&gt;</pre>
         *
         * The <b>wj-linear-gauge</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>       <dd><code>=</code> A reference to the @see:LinearGauge
         *                          control created by this directive.</dd>
         *   <dt>direction</dt>     <dd><code>@</code> The @see:GaugeDirection value in
         *                          which the gauge fills as the value grows.</dd>
         *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
         *                          the gauge values as text.</dd>
         *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
         *                          displays a shadow effect.</dd>
         *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
         *                          initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
         *                           initializing the control with attribute values. </dd>
         *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
         *                          animates value changes.</dd>
         *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
         *                          prevented from editing the value.</dd>
         *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
         *                          can display.</dd>
         *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
         *                          can display.</dd>
         *   <dt>show-text</dt>     <dd><code>@</code> The @see:ShowText value indicating
         *                          which values display as text within the gauge.</dd>
         *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value
         *                          property when the user presses the arrow keys.</dd>
         *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
         *                          of zero to one.</dd>
         *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
         *   <dt>got-focus</dt>     <dd><code>&</code> The @see:LinearGauge.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>    <dd><code>&</code> The @see:LinearGauge.lostFocus event handler.</dd>
         * </dl>
         *
         * The <b>wj-linear-gauge</b> directive may contain one or more @see:WjRange directives.
         *
         * @fiddle:t842jozb
         */
        var WjLinearGauge = (function (_super) {
            __extends(WjLinearGauge, _super);
            // Initializes a new instance of a WjLinearGauge
            function WjLinearGauge() {
                _super.call(this);
            }
            Object.defineProperty(WjLinearGauge.prototype, "_controlConstructor", {
                // gets the Wijmo LinearGauge control constructor
                get: function () {
                    return wijmo.gauge.LinearGauge;
                },
                enumerable: true,
                configurable: true
            });
            return WjLinearGauge;
        }(WjGauge));
        /**
         * AngularJS directive for the @see:BulletGraph control.
         *
         * Use the <b>wj-bullet-graph</b> directive to add bullet graphs to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;wj-bullet-graph
         *   value="ctx.gauge.value"
         *   min="0" max="10"
         *   target="{&#8203;{item.target}}"
         *   bad="{&#8203;{item.target * .75}}"
         *   good="{&#8203;{item.target * 1.25}}"&gt;
         * &lt;/wj-bullet-graph&gt;</pre>
         *
         * The <b>wj-bullet-graph</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>control</dt>       <dd><code>=</code> A reference to the BulletGraph control
         *                          created by this directive.</dd>
         *   <dt>direction</dt>     <dd><code>@</code> The @see:GaugeDirection value
         *                          indicating which direction the gauge fills as the value grows.</dd>
         *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
         *                          initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
         *                           initializing the control with attribute values. </dd>
         *   <dt>target</dt>        <dd><code>@</code> The target value for the measure.</dd>
         *   <dt>good</dt>          <dd><code>@</code> A reference value considered good for the
         *                          measure.</dd>
         *   <dt>bad</dt>           <dd><code>@</code> A reference value considered bad for the
         *                          measure.</dd>
         *   <dt>value</dt>         <dd><code>=</code> The actual value of the measure.</dd>
         * </dl>
         *
         * The <b>wj-bullet-graph</b> directive may contain one or more @see:WjRange directives.
         *
         * @fiddle:8uxb1vwf
         */
        var WjBulletGraph = (function (_super) {
            __extends(WjBulletGraph, _super);
            // Initializes a new instance of a WjBulletGraph
            function WjBulletGraph() {
                _super.call(this);
            }
            Object.defineProperty(WjBulletGraph.prototype, "_controlConstructor", {
                // gets the Wijmo BulletGraph control constructor
                get: function () {
                    return wijmo.gauge.BulletGraph;
                },
                enumerable: true,
                configurable: true
            });
            return WjBulletGraph;
        }(WjLinearGauge));
        /**
         * AngularJS directive for the @see:RadialGauge control.
         *
         * Use the <b>wj-radial-gauge</b> directive to add radial gauges to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>Here is a &lt;b&gt;RadialGauge&lt;/b&gt; control:&lt;/p&gt;
         * &lt;wj-radial-gauge
         *   style="height:300px"
         *   value="count"
         *   min="0" max="10"
         *   is-read-only="false"&gt;
         * &lt;/wj-radial-gauge&gt;</pre>
         *
         * The <b>wj-radial-gauge</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
         *                          directive. Binding the property using the ng-model directive provides standard benefits
         *                          like validation, adding the control's state to the form instance, and so on. To redefine
         *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
         *                          attribute.</dd>
         *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
         *                               <b>ng-model</b> directive.</dd>
         *   <dt>control</dt>       <dd><code>=</code> A reference to the RadialGauge
         *                          control created by this directive.</dd>
         *   <dt>auto-scale</dt>    <dd><code>@</code> A value indicating whether the gauge
         *                          scales the display to fill the host element.</dd>
         *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
         *                          gauge values as text.</dd>
         *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
         *                          displays a shadow effect.</dd>
         *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
         *                          initializing the control with attribute values.</dd>
         *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
         *                           initializing the control with attribute values. </dd>
         *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
         *                          animates value changes.</dd>
         *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
         *                          prevented from editing the value.</dd>
         *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
         *                          can display.</dd>
         *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
         *                          can display.</dd>
         *   <dt>show-text</dt>     <dd><code>@</code> A @see:ShowText value indicating
         *                          which values display as text within the gauge.</dd>
         *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the
         *                          value property when the user presses the arrow keys.</dd>
         *   <dt>start-angle</dt>   <dd><code>@</code> The starting angle for the gauge, in
         *                          degreees, measured clockwise from the 9 o'clock position.</dd>
         *   <dt>sweep-angle</dt>   <dd><code>@</code> The sweeping angle for the gauge in degrees
         *                          (may be positive or negative).</dd>
         *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
         *                          of zero to one.</dd>
         *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
         *   <dt>got-focus</dt>     <dd><code>&</code> The @see:RadialGauge.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>    <dd><code>&</code> The @see:RadialGauge.lostFocus event handler.</dd>
         * </dl>
         *
         * The <b>wj-radial-gauge</b> directive may contain one or more @see:WjRange directives.
         *
         * @fiddle:7ec2144u
         */
        var WjRadialGauge = (function (_super) {
            __extends(WjRadialGauge, _super);
            // Initializes a new instance of a WjRadialGauge
            function WjRadialGauge() {
                _super.call(this);
            }
            Object.defineProperty(WjRadialGauge.prototype, "_controlConstructor", {
                // gets the Wijmo RadialGauge control constructor
                get: function () {
                    return wijmo.gauge.RadialGauge;
                },
                enumerable: true,
                configurable: true
            });
            return WjRadialGauge;
        }(WjGauge));
        /**
         * AngularJS directive for the @see:Range object.
         *
         * The <b>wj-range</b> directive must be contained in a @see:WjLinearGauge, @see:WjRadialGauge
         * or @see:WjBulletGraph directive. It adds the Range object to the 'ranges' array property
         * of the parent directive. You may also initialize other Range type properties of the parent
         * directive by specifying the property name with the wj-property attribute.
         *
         * For example:
         * <pre>&lt;wj-radial-gauge
         *     min="0"
         *     max="200"
         *     step="20"
         *     value="theValue"
         *     is-read-only="false"&gt;
         *     &lt;wj-range
         *       min="0"
         *       max="100"
         *       color="red"&gt;
         *     &lt;/wj-range&gt;
         *     &lt;wj-range
         *       min="100"
         *       max="200"
         *       color="green"&gt;
         *     &lt;/wj-range&gt;
         *     &lt;wj-range
         *       wj-property="pointer"
         *       color="blue"&gt;
         *     &lt;/wj-range&gt;
         * &lt;/wj-radial-gauge&gt;</pre>
         *
         * The <b>wj-range</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>min</dt>           <dd><code>@</code> The minimum value in the range.</dd>
         *   <dt>max</dt>           <dd><code>@</code> The maximum value in the range.</dd>
         *   <dt>color</dt>         <dd><code>@</code> The color used to display the range.</dd>
         *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the range, on a scale
         *                          of zero to one.</dd>
         *   <dt>name</dt>          <dd><code>@</code> The name of the range.</dd>
         *   <dt>wj-property</dt>   <dd><code>@</code> The name of the property to initialize
         *                          with this directive.</dd>
         * </dl>
         */
        var WjRange = (function (_super) {
            __extends(WjRange, _super);
            // Initializes a new instance of a WjRange
            function WjRange() {
                _super.call(this);
                this.require = ['?^wjLinearGauge', '?^wjRadialGauge', '?^wjBulletGraph'];
                this.template = '<div ng-transclude />';
                this.transclude = true;
                // set up as a child directive
                this._property = 'ranges';
                this._isPropertyArray = true;
            }
            Object.defineProperty(WjRange.prototype, "_controlConstructor", {
                // Returns constructor of related Wijmo object. Abstract member, must be overridden in inherited class
                get: function () {
                    return wijmo.gauge.Range;
                },
                enumerable: true,
                configurable: true
            });
            return WjRange;
        }(angular.WjDirective));
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.gauge.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo.grid module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        var wijmoGrid = window['angular'].module('wj.grid', []);
        //if (!wijmo.grid) {
        //    return;
        //}
        //#region "Grid directives registration"
        //var wijmoGrid = window['angular'].module('wj.grid', []);
        // register only if module is loaded
        if (wijmo.grid && wijmo.grid.FlexGrid) {
            wijmoGrid.directive('wjFlexGrid', ['$compile', '$interpolate', function ($compile, $interpolate) {
                    return new WjFlexGrid($compile, $interpolate);
                }]);
            wijmoGrid.directive('wjFlexGridColumn', ['$compile', function ($compile) {
                    return new WjFlexGridColumn($compile);
                }]);
            wijmoGrid.directive('wjFlexGridCellTemplate', [function () {
                    return new WjFlexGridCellTemplate();
                }]);
            if (wijmo.grid.filter) {
                wijmoGrid.directive('wjFlexGridFilter', [function () {
                        return new WjFlexGridFilter();
                    }]);
            }
            if (wijmo.grid.grouppanel) {
                wijmoGrid.directive('wjGroupPanel', [function () {
                        return new WjGroupPanel();
                    }]);
            }
            if (wijmo.grid.detail) {
                wijmoGrid.directive('wjFlexGridDetail', ['$compile', function ($compile) {
                        return new WjFlexGridDetail($compile);
                    }]);
            }
            if (wijmo.grid.sheet) {
                wijmoGrid.directive('wjFlexSheet', ['$compile', '$interpolate', function ($compile, $interpolate) {
                        return new WjFlexSheet($compile, $interpolate);
                    }]);
                wijmoGrid.directive('wjSheet', [function () {
                        return new WjSheet();
                    }]);
            }
            if (wijmo.grid.multirow) {
                wijmoGrid.directive('wjMultiRow', ['$compile', '$interpolate', function ($compile, $interpolate) {
                        return new WjMultiRow($compile, $interpolate);
                    }]);
            }
        }
        //#endregion "Grid directives definitions"
        //#region "Grid directives classes"
        /**
            * AngularJS directive for the @see:FlexGrid control.
            *
            * Use the <b>wj-flex-grid</b> directive to add grids to your AngularJS applications.
            * Note that directive and parameter names must be formatted as lower-case with dashes
            * instead of camel-case. For example:
            *
            * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
            * &lt;wj-flex-grid items-source="data"&gt;
            *   &lt;wj-flex-grid-column
            *     header="Country"
            *     binding="country"&gt;
            *   &lt;/wj-flex-grid-column&gt;
            *   &lt;wj-flex-grid-column
            *     header="Sales"
            *     binding="sales"&gt;
            *   &lt;/wj-flex-grid-column&gt;
            *   &lt;wj-flex-grid-column
            *     header="Expenses"
            *     binding="expenses"&gt;
            *   &lt;/wj-flex-grid-column&gt;
            *   &lt;wj-flex-grid-column
            *     header="Downloads"
            *     binding="downloads"&gt;
            *   &lt;/wj-flex-grid-column&gt;
            * &lt;/wj-flex-grid&gt;</pre>
            *
            * The example below creates a FlexGrid control and binds it to a 'data' array
            * exposed by the controller. The grid has three columns, each corresponding to
            * a property of the objects contained in the source array.
            *
            * @fiddle:QNb9X
            *
            * The <b>wj-flex-grid</b> directive supports the following attributes:
            *
            * <dl class="dl-horizontal">
            *   <dt>allow-add-new</dt>              <dd><code>@</code> A value indicating whether to show a new row
            *                                     template so users can add items to the source collection.</dd>
            *   <dt>allow-delete</dt>             <dd><code>@</code> A value indicating whether the grid deletes the
            *                                     selected rows when the Delete key is pressed.</dd>
            *   <dt>allow-dragging</dt>           <dd><code>@</code> An @see:AllowDragging value indicating
            *                                     whether and how the user can drag rows and columns with the mouse.</dd>
            *   <dt>allow-merging</dt>            <dd><code>@</code> An @see:AllowMerging value indicating
            *                                     which parts of the grid provide cell merging.</dd>
            *   <dt>allow-resizing</dt>           <dd><code>@</code> An @see:AllowResizing value indicating
            *                                     whether users are allowed to resize rows and columns with the mouse.</dd>
            *   <dt>allow-sorting</dt>            <dd><code>@</code> A boolean value indicating whether users can sort
            *                                     columns by clicking the column headers.</dd>
            *   <dt>auto-generate-columns</dt>    <dd><code>@</code> A boolean value indicating whether the grid generates
            *                                     columns automatically based on the <b>items-source</b>.</dd>
            *   <dt>child-items-path</dt>         <dd><code>@</code> The name of the property used to generate
            *                                     child rows in hierarchical grids (or an array of property names if items
            *                                     at different hierarchical levels use different names for their child items).</dd>
            *   <dt>control</dt>                  <dd><code>=</code> A reference to the @see:FlexGrid control
            *                                     created by this directive.</dd>
            *   <dt>defer-resizing</dt>           <dd><code>=</code> A boolean value indicating whether row and column
            *                                     resizing should be deferred until the user releases the mouse button.</dd>
            *   <dt>frozen-columns</dt>           <dd><code>@</code> The number of frozen (non-scrollable) columns in the grid.</dd>
            *   <dt>frozen-rows</dt>              <dd><code>@</code> The number of frozen (non-scrollable) rows in the grid.</dd>
            *   <dt>group-header-format</dt>      <dd><code>@</code> The format string used to create the group
            *                                     header content.</dd>
            *   <dt>headers-visibility</dt>       <dd><code>=</code> A @see:HeadersVisibility value
            *                                     indicating whether the row and column headers are visible. </dd>
            *   <dt>ime-enabled</dt>              <dd><code>@</code> Gets or sets a value that determines whether the grid should
            *                                     support Input Method Editors (IME) while not in edit mode.</dd>
            *   <dt>initialized</dt>              <dd><code>&</code> This event occurs after the binding has finished
            *                                     initializing the control with attribute values.</dd>
            *   <dt>is-initialized</dt>           <dd><code>=</code> A value indicating whether the binding has finished
            *                                     initializing the control with attribute values. </dd>
            *   <dt>item-formatter</dt>           <dd><code>=</code> A function that customizes
            *                                     cells on this grid.</dd>
            *   <dt>items-source</dt>             <dd><code>=</code> An array or @see:ICollectionView object that
            *                                     contains the items shown on the grid.</dd>
            *   <dt>is-read-only</dt>             <dd><code>@</code> A boolean value indicating whether the user is
            *                                     prevented from editing grid cells by typing into them.</dd>
            *   <dt>merge-manager</dt>            <dd><code>=</code> A @see:MergeManager object that specifies
            *                                     the merged extent of the specified cell.</dd>
            *   <dt>selection-mode</dt>           <dd><code>@</code> A @see:SelectionMode value
            *                                     indicating whether and how the user can select cells.</dd>
            *   <dt>show-groups</dt>              <dd><code>@</code> A boolean value indicating whether to insert group
            *                                     rows to delimit data groups.</dd>
            *   <dt>show-sort</dt>                <dd><code>@</code> A boolean value indicating whether to display sort
            *                                     indicators in the column headers.</dd>
            *   <dt>sort-row-index</dt>           <dd><code>@</code> A number specifying the index of row in the column
            *                                     header panel that shows and changes the current sort.</dd>
            *   <dt>tree-indent</dt>              <dd><code>@</code> The indentation, in pixels, used to offset row
            *                                     groups of different levels.</dd>
            *   <dt>beginning-edit</dt>           <dd><code>&</code> Handler for the @see:FlexGrid.beginningEdit event.</dd>
            *   <dt>cell-edit-ended</dt>          <dd><code>&</code> Handler for the @see:FlexGrid.cellEditEnded event.</dd>
            *   <dt>cell-edit-ending</dt>         <dd><code>&</code> Handler for the @see:FlexGrid.cellEditEnding event.</dd>
            *   <dt>prepare-cell-for-edit</dt>    <dd><code>&</code> Handler for the @see:FlexGrid.prepareCellForEdit event.</dd>
            *   <dt>resizing-column</dt>          <dd><code>&</code> Handler for the @see:FlexGrid.resizingColumn event.</dd>
            *   <dt>resized-column</dt>           <dd><code>&</code> Handler for the @see:FlexGrid.resizedColumn event.</dd>
            *   <dt>dragged-column</dt>           <dd><code>&</code> Handler for the @see:FlexGrid.draggedColumn event.</dd>
            *   <dt>dragging-column</dt>          <dd><code>&</code> Handler for the @see:FlexGrid.draggingColumn event.</dd>
            *   <dt>sorted-column</dt>            <dd><code>&</code> Handler for the @see:FlexGrid.sortedColumn event.</dd>
            *   <dt>sorting-column</dt>           <dd><code>&</code> Handler for the @see:FlexGrid.sortingColumn event.</dd>
            *   <dt>deleting-row</dt>             <dd><code>&</code> Handler for the @see:FlexGrid.deletingRow event.</dd>
            *   <dt>dragging-row</dt>             <dd><code>&</code> Handler for the @see:FlexGrid.draggingRow event.</dd>
            *   <dt>dragged-row</dt>              <dd><code>&</code> Handler for the @see:FlexGrid.draggedRow event.</dd>
            *   <dt>resizing-row</dt>             <dd><code>&</code> Handler for the @see:FlexGrid.resizingRow event.</dd>
            *   <dt>resized-row</dt>              <dd><code>&</code> Handler for the @see:FlexGrid.resizedRow event.</dd>
            *   <dt>row-added</dt>                <dd><code>&</code> Handler for the @see:FlexGrid.rowAdded event.</dd>
            *   <dt>row-edit-ended</dt>           <dd><code>&</code> Handler for the @see:FlexGrid.rowEditEnded event.</dd>
            *   <dt>row-edit-ending</dt>          <dd><code>&</code> Handler for the @see:FlexGrid.rowEditEnding event.</dd>
            *   <dt>loaded-rows</dt>              <dd><code>&</code> Handler for the @see:FlexGrid.loadedRows event.</dd>
            *   <dt>loading-rows</dt>             <dd><code>&</code> Handler for the @see:FlexGrid.loadingRows event.</dd>
            *   <dt>group-collapsed-changed</dt>  <dd><code>&</code> Handler for the @see:FlexGrid.groupCollapsedChanged event.</dd>
            *   <dt>group-collapsed-changing</dt> <dd><code>&</code> Handler for the @see:FlexGrid.groupCollapsedChanging event.</dd>
            *   <dt>items-source-changed</dt>     <dd><code>&</code> Handler for the @see:FlexGrid.itemsSourceChanged event.</dd>
            *   <dt>selection-changing</dt>       <dd><code>&</code> Handler for the @see:FlexGrid.selectionChanging event.</dd>
            *   <dt>selection-changed</dt>        <dd><code>&</code> Handler for the @see:FlexGrid.selectionChanged event.</dd>
            *   <dt>got-focus</dt>                <dd><code>&</code> The @see:FlexGrid.gotFocus event handler.</dd>
            *   <dt>lost-focus</dt>               <dd><code>&</code> The @see:FlexGrid.lostFocus event handler.</dd>
            *   <dt>scroll-position-changed</dt>  <dd><code>&</code> Handler for the @see:FlexGrid.scrollPositionChanged event.</dd>
            * </dl>
            *
            * The <b>wj-flex-grid</b> directive may contain @see:WjFlexGridColumn, @see:WjFlexGridCellTemplate and
            * @see:WjFlexGridDetail child directives.
            */
        var WjFlexGrid = (function (_super) {
            __extends(WjFlexGrid, _super);
            // Initializes a new instance of a WjFlexGrid
            function WjFlexGrid($compile, $interpolate) {
                _super.call(this);
                this._$compile = $compile;
                this._$interpolate = $interpolate;
                var self = this;
                //super();
                this.transclude = true;
                this.template = '<div ng-transclude />';
            }
            Object.defineProperty(WjFlexGrid.prototype, "_controlConstructor", {
                // Gets the Wijmo FlexGrid control constructor
                get: function () {
                    return wijmo.grid.FlexGrid;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexGrid.prototype._createLink = function () {
                return new WjFlexGridLink();
            };
            // Initializes WjFlexGrid property map
            WjFlexGrid.prototype._initProps = function () {
                var childPathDesc = angular.MetaFactory.findProp('childItemsPath', this._props);
                childPathDesc.scopeBindingMode = '@';
                childPathDesc.customHandler = function (scope, control, value, oldValue, link) {
                    if (value) {
                        value = value.trim();
                        if (value && value[0] === '[') {
                            var arr = scope.$parent.$eval(value);
                            control['childItemsPath'] = arr;
                            return true;
                        }
                    }
                    return false;
                };
            };
            return WjFlexGrid;
        }(angular.WjDirective));
        angular.WjFlexGrid = WjFlexGrid;
        var WjFlexGridLink = (function (_super) {
            __extends(WjFlexGridLink, _super);
            function WjFlexGridLink() {
                _super.apply(this, arguments);
            }
            WjFlexGridLink.prototype._initControl = function () {
                var grid = _super.prototype._initControl.call(this);
                new DirectiveCellFactory(grid, this);
                return grid;
            };
            return WjFlexGridLink;
        }(angular.WjLink));
        angular.WjFlexGridLink = WjFlexGridLink;
        // Mockup for CellFactory, to allow DirectiveCellFactory be loaded in case of absent wijmo.grid module.
        var gridModule = wijmo.grid && wijmo.grid.CellFactory;
        if (!gridModule) {
            wijmo.grid = {};
            wijmo.grid.CellFactory = function () { };
        }
        var DirectiveCellFactory = (function (_super) {
            __extends(DirectiveCellFactory, _super);
            function DirectiveCellFactory(grid, gridLink) {
                _super.call(this);
                this._lastApplyTimeStamp = 0;
                this._noApplyLag = false;
                this._startingEditing = false;
                this._cellStampCounter = 0;
                this._gridLink = gridLink;
                this._rowHeightUpdates = new _RowHeightUpdateQueue(this);
                // init _templateTypes
                if (!DirectiveCellFactory._templateTypes) {
                    DirectiveCellFactory._templateTypes = [];
                    for (var templateType in CellTemplateType) {
                        if (isNaN(templateType)) {
                            DirectiveCellFactory._templateTypes.push(templateType);
                        }
                    }
                }
                // override grid's cell factory
                var self = this;
                this._baseCf = grid.cellFactory;
                grid.cellFactory = this;
                // initialize input event dispatcher
                this._evtInput = document.createEvent('HTMLEvents');
                this._evtInput.initEvent('input', true, false);
                // initialize blur event dispatcher
                this._evtBlur = document.createEvent('HTMLEvents');
                this._evtBlur.initEvent('blur', false, false);
                // no $apply() lag while editing
                grid.prepareCellForEdit.addHandler(function (s, e) {
                    self._noApplyLag = true;
                });
                grid.cellEditEnded.addHandler(function (s, e) {
                    // If column has no cell edit template, clear _editChar buffer.
                    if (e.range.col < 0 ||
                        !grid.columns[e.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)]) {
                        self._editChar = null;
                    }
                    setTimeout(function () {
                        self._noApplyLag = false;
                    }, 300);
                });
                grid.beginningEdit.addHandler(function (s, e) {
                    self._startingEditing = true;
                });
                grid.hostElement.addEventListener('keydown', function (e) {
                    self._startingEditing = false;
                }, true);
                grid.hostElement.addEventListener('keypress', function (e) {
                    var char = e.charCode > 32 ? String.fromCharCode(e.charCode) : null;
                    if (char) {
                        // Grid's _KeyboardHandler may receive 'keypress' before or after this handler (observed at least in IE,
                        // not clear why this happens). So both grid.activeEditor and _startingEditing (the latter is initialized in
                        // beginningEdit and cleared in 'keydown') participate in detecting whether this char has initialized a cell
                        // editing.
                        if (!grid.activeEditor || self._startingEditing) {
                            self._editChar = char;
                        }
                        else if (self._editChar) {
                            self._editChar += char;
                        }
                    }
                }, true);
            }
            DirectiveCellFactory.prototype.updateCell = function (panel, rowIndex, colIndex, cell, rng) {
                this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
                var cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;
                // restore overflow for any cell
                if (cell.style.overflow) {
                    cell.style.overflow = '';
                }
                var self = this, grid = panel.grid, editRange = grid.editRange, templateType, row = panel.rows[rowIndex], dataItem = row.dataItem, isGridCtx = false, needCellValue = false, isEdit = false, isCvGroup = false;
                // determine template type
                switch (panel.cellType) {
                    case wijmo.grid.CellType.Cell:
                        if (row instanceof wijmo.grid.GroupRow) {
                            isCvGroup = dataItem instanceof wijmo.collections.CollectionViewGroup;
                            var isHierNonGroup = !(isCvGroup || row.hasChildren);
                            if (colIndex == panel.columns.firstVisibleIndex) {
                                templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                            }
                            else {
                                templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                                needCellValue = true;
                            }
                        }
                        else if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                            templateType = CellTemplateType.CellEdit;
                            needCellValue = isEdit = true;
                        }
                        else if (!(wijmo.grid['detail'] && wijmo.grid['detail'].DetailRow &&
                            (row instanceof wijmo.grid['detail'].DetailRow))) {
                            templateType = CellTemplateType.Cell;
                        }
                        break;
                    case wijmo.grid.CellType.ColumnHeader:
                        templateType = CellTemplateType.ColumnHeader;
                        break;
                    case wijmo.grid.CellType.RowHeader:
                        templateType = grid.collectionView &&
                            grid.collectionView.currentEditItem === dataItem
                            ? CellTemplateType.RowHeaderEdit
                            : CellTemplateType.RowHeader;
                        isGridCtx = true;
                        break;
                    case wijmo.grid.CellType.TopLeft:
                        templateType = CellTemplateType.TopLeft;
                        isGridCtx = true;
                        break;
                }
                var isUpdated = false;
                if (templateType != null) {
                    var col = (isCvGroup && templateType == CellTemplateType.GroupHeader ?
                        grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                        (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));
                    if (col) {
                        var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType), templContext = (isGridCtx ? grid : col)[templContextProp];
                        // maintain template inheritance
                        if (!templContext) {
                            if (templateType === CellTemplateType.RowHeaderEdit) {
                                templateType = CellTemplateType.RowHeader;
                                templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                templContext = grid[templContextProp];
                            }
                            else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                                if (!isCvGroup) {
                                    templateType = CellTemplateType.Cell;
                                    templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                    templContext = col[templContextProp];
                                }
                            }
                        }
                        if (templContext) {
                            // apply directive template and style
                            var tpl = self._getCellTemplate(templContext.cellTemplate), cellStyle = templContext.cellStyle, cellClass = templContext.cellClass, isTpl = !wijmo.isNullOrWhiteSpace(tpl), isStyle = !wijmo.isNullOrWhiteSpace(cellStyle), isClass = !wijmo.isNullOrWhiteSpace(cellClass), cellValue;
                            if (needCellValue) {
                                cellValue = panel.getCellData(rowIndex, colIndex, false);
                            }
                            // apply cell template
                            if (isTpl) {
                                var measureAttr = cell.getAttribute(wijmo.grid.FlexGrid._WJS_MEASURE), isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';
                                isUpdated = true;
                                if (isEdit) {
                                    this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                                }
                                // if this is false then we can't reuse previously cached scope and linked tree.
                                var cellContext = (cell[templContextProp] || {}), isForeignCell = cellContext.column !== col || !cellContext.cellScope || !cellContext.cellScope.$root;
                                // create a new cell scope, as a child of the column's parent scope 
                                // (which could be ng-repeat with its specific properties), 
                                // or reuse the one created earlier for this cell and cached in the 
                                // cellContext.cellScope property. 
                                // in any case initialize the scope with cell specific properties.
                                var cellScope = cellContext.cellScope;
                                if (isForeignCell) {
                                    this._doDisposeCell(cell);
                                    cellContext.cellScope = cellScope = templContext.templLink.scope.$parent.$new();
                                    cellContext.column = col;
                                    cell[templContextProp] = cellContext;
                                }
                                var scopeChanged = cellScope.$row !== row || cellScope.$col !== col || cellScope.$item !== dataItem ||
                                    cellScope.$value !== cellValue;
                                if (scopeChanged) {
                                    self._initCellScope(cellScope, row, col, dataItem, cellValue);
                                }
                                // compile column template to get a link function, or reuse the 
                                // link function got earlier for this column and cached in the 
                                // templContext.cellLink property. 
                                var cellLink = templContext.cellLink;
                                if (!cellLink) {
                                    cellLink = templContext.cellLink = this._gridLink.directive._$compile('<div style="display:none"' + (isStyle ? ' ng-style="' + cellStyle + '"' : '') +
                                        (isClass ? ' ng-class="' + cellClass + '"' : '') + '>' + tpl + '</div>');
                                }
                                // link the cell template to the cell scope and get a bound DOM 
                                // subtree to use as the cell content, 
                                // or reuse the bound subtree linked earlier and cached in the 
                                // cellContext.clonedElement property.
                                // we pass a clone function to the link function to force it to 
                                // return a clone of the template.
                                var clonedElement = cellContext.clonedElement;
                                if (isForeignCell) {
                                    //register watch before link, it'll then unhide the root element before linked element binding
                                    var dispose = cellScope.$watch(function (scope) {
                                        if (!clonedElement) {
                                            return;
                                        }
                                        dispose();
                                        clonedElement[0].style.display = '';
                                        // This resolves the problem with non-painting header cells in IE, whose reason
                                        // is unclear (appeared after we started to add invisible clonedElement). 
                                        // We change some style property, which forces IE to repaint the cell, 
                                        // and after some delay restore its original value.
                                        if (panel.cellType === wijmo.grid.CellType.ColumnHeader || panel.cellType === wijmo.grid.CellType.TopLeft) {
                                            var clonedStyle = clonedElement[0].style, prevColor = clonedStyle.outlineColor, prevWidth = clonedStyle.outlineWidth;
                                            clonedStyle.outlineColor = 'white';
                                            clonedStyle.outlineWidth = '0px';
                                            setTimeout(function () {
                                                clonedStyle.outlineColor = prevColor;
                                                clonedStyle.outlineWidth = prevWidth;
                                            }, 0);
                                        }
                                        //clonedElement[0].style.visibility = 'visible';
                                    });
                                    cellContext.clonedElement = clonedElement = cellLink(cellScope, function (clonedEl, scope) { });
                                }
                                // insert the bound content subtree to the cell, 
                                // after $apply to prevent flickering.
                                // TBD: check whether this code is really necessary
                                if (isMeasuring /*&& clonedElement[0].style.display == 'none'*/) {
                                    clonedElement[0].style.display = '';
                                }
                                var replaceFirst = false;
                                if (isEdit) {
                                    var rootEl = cell.firstElementChild;
                                    if (rootEl) {
                                        // set focus to cell, because hiding a focused element may move focus to a page body
                                        // that will force Grid to finish editing.
                                        cell.focus();
                                        rootEl.style.display = 'none';
                                    }
                                }
                                else {
                                    replaceFirst = cell.childNodes.length == 1;
                                    if (!replaceFirst) {
                                        cell.textContent = '';
                                    }
                                }
                                if (replaceFirst) {
                                    if (clonedElement[0] !== cell.firstChild) {
                                        cell.replaceChild(clonedElement[0], cell.firstChild);
                                    }
                                }
                                else {
                                    cell.appendChild(clonedElement[0]);
                                }
                                if (templContext.cellOverflow) {
                                    cell.style.overflow = templContext.cellOverflow;
                                }
                                var lag = 40, closingLag = 10;
                                if (this._closingApplyTimeOut) {
                                    clearTimeout(this._closingApplyTimeOut);
                                }
                                self._rowHeightUpdates.add({ panel: panel, cell: cell, rng: rng, cellStamp: cellStamp });
                                if (isMeasuring || editRange || this._noApplyLag || scopeChanged && (Date.now() - this._lastApplyTimeStamp) > lag) {
                                    clearTimeout(this._closingApplyTimeOut);
                                    if (!cellScope.$root.$$phase) {
                                        cellScope.$apply();
                                    }
                                    if (!editRange && !isMeasuring) {
                                        self._rowHeightUpdates.execute();
                                    }
                                    this._lastApplyTimeStamp = Date.now();
                                }
                                else {
                                    clearTimeout(this._closingApplyTimeOut);
                                    this._closingApplyTimeOut = setTimeout(function () {
                                        clearTimeout(this._closingApplyTimeOut);
                                        if (!cellScope.$root.$$phase) {
                                            cellScope.$apply();
                                        }
                                        self._rowHeightUpdates.execute();
                                    }, closingLag);
                                }
                                // increase row height if cell doesn't fit in the current row height.
                                setTimeout(function () {
                                    //var cellHeight = cell.scrollHeight,
                                    //    panelRows = panel.rows;
                                    //if (rowIndex < panelRows.length && panelRows[rowIndex].renderHeight < cellHeight) {
                                    //    panelRows.defaultSize = cellHeight;
                                    if (self._updateRowHeight(panel, cell, rng, cellStamp)) {
                                        if (isEdit) {
                                            self._rowHeightUpdates.clear();
                                            grid.refresh();
                                            //grid.refreshCells(false, true, false);
                                            grid.startEditing();
                                            return;
                                        }
                                    }
                                    else if (isEdit && !wijmo.contains(clonedElement[0], wijmo.getActiveElement())) {
                                        // Find first visible input element and focus it. Make it only if editing
                                        // was not interrupted by row height change performed above, because it may finally
                                        // results in calling setSelectionRange on detached input, which causes crash in IE.
                                        var inputs = clonedElement[0].querySelectorAll('input');
                                        if (inputs) {
                                            for (var i = 0; i < inputs.length; i++) {
                                                var input = inputs[i], inpSt = window.getComputedStyle(input);
                                                if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                                                    var inpFocusEh = function () {
                                                        input.removeEventListener('focus', inpFocusEh);
                                                        setTimeout(function () {
                                                            if (self._editChar) {
                                                                input.value = self._editChar;
                                                                self._editChar = null;
                                                                wijmo.setSelectionRange(input, input.value.length);
                                                                input.dispatchEvent(self._evtInput);
                                                            }
                                                        }, 50);
                                                    };
                                                    input.addEventListener('focus', inpFocusEh);
                                                    input.focus();
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }, 0);
                                if (isEdit) {
                                    var editEndingEH = function (s, e) {
                                        grid.cellEditEnding.removeHandler(editEndingEH);
                                        // Move focus out of the current input element, in order to let it to save
                                        // its value (necessary for controls like InputDate that can't update value immediately
                                        // as user typing).
                                        // We do it via event emulation, instead of moving focus to another element,
                                        // because in IE an element doesn't fit in time to receive the 'blur' event.
                                        var activeElement = wijmo.getActiveElement();
                                        if (activeElement) {
                                            activeElement.dispatchEvent(self._evtBlur);
                                        }
                                        // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                        cell.focus();
                                        if (!e.cancel) {
                                            e.cancel = true;
                                            panel.grid.setCellData(rowIndex, colIndex, cellScope.$value);
                                        }
                                        // close all open dropdowns 
                                        var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                        [].forEach.call(dropDowns, function (el) {
                                            var ctrl = wijmo.Control.getControl(el);
                                            if (ctrl && ctrl instanceof wijmo.input.DropDown) {
                                                ctrl.isDroppedDown = false;
                                            }
                                        });
                                    };
                                    // subscribe the handler to the cellEditEnding event
                                    grid.cellEditEnding.addHandler(editEndingEH);
                                }
                                else {
                                    this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, false);
                                }
                            }
                        }
                    }
                }
                if (!isUpdated) {
                    this._doDisposeCell(cell);
                    this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng);
                }
                // apply cell style
                if (!isTpl && (isStyle || isClass)) {
                    // build cell style object
                    var cellScopeSt = self._initCellScope({}, row, col, dataItem, cellValue), style = isStyle ? this._gridLink.scope.$parent.$eval(cellStyle, cellScopeSt) : null, classObj = isClass ? this._gridLink.scope.$parent.$eval(cellClass, cellScopeSt) : null;
                    // apply style to cell
                    if (style || classObj) {
                        var rootElement = document.createElement('div');
                        // copy elements instead of innerHTML in order to keep bindings 
                        // in templated cells
                        while (cell.firstChild) {
                            rootElement.appendChild(cell.firstChild);
                        }
                        cell.appendChild(rootElement);
                        // apply style
                        if (style) {
                            for (var key in style) {
                                rootElement.style[key] = style[key];
                            }
                        }
                        // apply classes
                        if (classObj) {
                            var classArr = (wijmo.isArray(classObj) ? classObj : [classObj]), clStr = '';
                            for (var i = 0; i < classArr.length; i++) {
                                var curPart = classArr[i];
                                if (curPart) {
                                    if (wijmo.isString(curPart)) {
                                        clStr += ' ' + curPart;
                                    }
                                    else {
                                        for (var clName in curPart) {
                                            if (curPart[clName]) {
                                                clStr += ' ' + clName;
                                            }
                                        }
                                    }
                                }
                            }
                            rootElement.className = clStr;
                        }
                    }
                }
            };
            DirectiveCellFactory.prototype.disposeCell = function (cell) {
                this._doDisposeCell(cell);
            };
            DirectiveCellFactory.prototype._doDisposeCell = function (cell) {
                var ttm = DirectiveCellFactory._templateTypes;
                for (var i = 0; i < ttm.length; i++) {
                    var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]), cellContext = (cell[templContextProp]);
                    if (cellContext && cellContext.cellScope && cellContext.cellScope.$root) {
                        cellContext.cellScope.$destroy();
                        cell[templContextProp] = null;
                    }
                }
            };
            DirectiveCellFactory.prototype._updateRowHeight = function (panel, cell, rng, cellStamp) {
                var cellHeight = cell.scrollHeight, panelRows = panel.rows, rowSpan = rng && rng.rowSpan || 1;
                if (cellStamp === cell[DirectiveCellFactory._cellStampProp] && (panelRows.defaultSize * rowSpan) < cellHeight) {
                    panelRows.defaultSize = cellHeight / rowSpan;
                    return true;
                }
                return false;
            };
            DirectiveCellFactory.prototype._initCellScope = function (scope, row, col, dataItem, cellValue) {
                scope.$row = row;
                scope.$col = col;
                scope.$item = dataItem;
                scope.$value = cellValue;
                return scope;
            };
            DirectiveCellFactory.prototype._getCellTemplate = function (tpl) {
                if (tpl) {
                    tpl = tpl.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g, '');
                    tpl = tpl.replace(/<span>\s*<\/span>/g, '');
                    tpl = tpl.trim();
                }
                return tpl;
            };
            DirectiveCellFactory._cellStampProp = '__wjCellStamp';
            return DirectiveCellFactory;
        }(wijmo.grid.CellFactory));
        var _RowHeightUpdateQueue = (function () {
            function _RowHeightUpdateQueue(cellFactory) {
                this._requests = [];
                this._timeOuts = [];
                this._cellFactory = cellFactory;
            }
            _RowHeightUpdateQueue.prototype.add = function (request) {
                this._requests.push(request);
            };
            _RowHeightUpdateQueue.prototype.execute = function () {
                var requests = this._requests;
                while (requests.length > 0) {
                    var request = this._requests.shift(), self = this;
                    var timeOut = (function (request) {
                        return setTimeout(function () {
                            if (self._cellFactory._updateRowHeight(request.panel, request.cell, request.rng, request.cellStamp)) {
                                self.clear();
                            }
                            else {
                                var toIdx = self._timeOuts.indexOf(timeOut);
                                if (toIdx > -1) {
                                    self._timeOuts.splice(toIdx, 1);
                                }
                            }
                        }, 0);
                    })(request);
                    this._timeOuts.push(timeOut);
                }
            };
            _RowHeightUpdateQueue.prototype.clear = function () {
                this._requests.splice(0, this._requests.length);
                this._clearTimeouts();
            };
            _RowHeightUpdateQueue.prototype._clearTimeouts = function () {
                var timeOuts = this._timeOuts;
                for (var i = 0; i < timeOuts.length; i++) {
                    clearTimeout(timeOuts[i]);
                }
                timeOuts.splice(0, timeOuts.length);
            };
            return _RowHeightUpdateQueue;
        }());
        // Remove wijmo.grid mockup after DirectiveCellFactory has been loaded.
        if (!gridModule) {
            wijmo.grid = null;
        }
        /**
         * AngularJS directive for the @see:Column object.
         *
         * The <b>wj-flex-grid-column</b> directive must be contained in a @see:WjFlexGrid directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>aggregate</dt>         <dd><code>@</code> The @see:Aggregate object to display in
         *                              the group header rows for this column.</dd>
         *   <dt>align</dt>             <dd><code>@</code> The string value that sets the horizontal
         *                              alignment of items in the column to left, right, or center.</dd>
         *   <dt>allow-dragging</dt>    <dd><code>@</code> The value indicating whether the user can move
         *                              the column to a new position with the mouse.</dd>
         *   <dt>allow-sorting</dt>     <dd><code>@</code> The value indicating whether the user can sort
         *                              the column by clicking its header.</dd>
         *   <dt>allow-resizing</dt>    <dd><code>@</code> The value indicating whether the user can
         *                              resize the column with the mouse.</dd>
         *   <dt>allow-merging</dt>     <dd><code>@</code> The value indicating whether the user can merge
         *                              cells in the column.</dd>
         *   <dt>binding</dt>           <dd><code>@</code> The name of the property to which the column is
         *                              bound.</dd>
         *   <dt>css-class</dt>         <dd><code>@</code> The name of a CSS class to use when
         *                              rendering the column.</dd>
         *   <dt>data-map</dt>          <dd><code>=</code> The @see:DataMap object to use to convert raw
         *                              values into display values for the column.</dd>
         *   <dt>data-type</dt>         <dd><code>@</code> The enumerated @see:DataType value that indicates
         *                              the type of value stored in the column.</dd>
         *   <dt>format</dt>            <dd><code>@</code> The format string to use to convert raw values
         *                              into display values for the column (see @see:Globalize).</dd>
         *   <dt>header</dt>            <dd><code>@</code> The string to display in the column header.</dd>
         *   <dt>input-type</dt>        <dd><code>@</code> The type attribute to specify the input element
         *                              used to edit values in the column. The default is "tel" for numeric
         *                              columns, and "text" for all other non-Boolean columns.</dd>
         *   <dt>is-content-html</dt>   <dd><code>@</code> The value indicating whether cells in the column
         *                              contain HTML content rather than plain text.</dd>
         *   <dt>is-read-only</dt>      <dd><code>@</code> The value indicating whether the user is prevented
         *                              from editing values in the column.</dd>
         *   <dt>is-selected</dt>       <dd><code>@</code> The value indicating whether the column is selected.</dd>
         *   <dt>mask</dt>              <dd><code>@</code> The mask string used to edit values in the
         *                              column.</dd>
         *   <dt>max-width</dt>         <dd><code>@</code> The maximum width for the column.</dd>
         *   <dt>min-width</dt>         <dd><code>@</code> The minimum width for the column.</dd>
         *   <dt>name</dt>              <dd><code>@</code> The column name. You can use it to retrieve the
         *                              column.</dd>
         *   <dt>is-required</dt>       <dd><code>@</code> The value indicating whether the column must contain
         *                              non-null values.</dd>
         *   <dt>show-drop-down</dt>    <dd><code>@</code> The value indicating whether to show drop-down buttons
         *                              for editing based on the column's @see:DataMap.</dd>
         *   <dt>visible</dt>           <dd><code>@</code> The value indicating whether the column is visible.</dd>
         *   <dt>width</dt>             <dd><code>@</code> The width of the column in pixels or as a
         *                              star value.</dd>
         *   <dt>word-wrap</dt>         <dd><code>@</code> The value indicating whether cells in the column wrap
         *                              their content.</dd>
         * </dl>
         *
         * Any html content within the <b>wj-flex-grid-column</b> directive is treated as a template for the cells in that column.
         * The template is applied only to regular cells. If you wish to apply templates to specific cell types such as
         * column or group headers, then please see the @see:WjFlexGridCellTemplate directive.
         *
         * The following example creates two columns with a template and a conditional style:
         *
         * @fiddle:5L423
         *
         * The <b>wj-flex-grid-column</b> directive may contain @see:WjFlexGridCellTemplate child directives.
         */
        var WjFlexGridColumn = (function (_super) {
            __extends(WjFlexGridColumn, _super);
            // Initializes a new instance of a WjGridColumn
            function WjFlexGridColumn($compile) {
                _super.call(this);
                this._$compile = $compile;
                // The 'data-map' HTML attribute is converted to 'map' by Angular, so we give it the 'map' alias.
                this.scope["dataMap"] += "map";
                this.scope["dataType"] += "type";
                this.require = '^wjFlexGrid';
                this['terminal'] = true;
                // If Angular supports template definition via a function (available starting with ver. 1.1.4) then we utilize this
                // possibility, because this is the only entry point where we have an access to an unprocessed version of a column 
                // cell template with element level directives definitions in their original state.
                if (angular.WjDirective._dynaTemplates) {
                    // must be false, otherwise directive's subtree will no be available in the template function
                    this.transclude = false;
                    // should be less then at ng-repeat/ng-if etc (to let them take a control over a column directive creation), 
                    // but bigger than at ordinal directives (like ng-style, to not allow them to evaluate during the column directive
                    // linking).
                    this['priority'] = 100;
                    this.template = function (tElement, tAttrs) {
                        // stores cell template definition, tAttrs is the only object that allows us to share a data
                        // with the link function.
                        tAttrs[WjFlexGridColumn._colTemplateProp] = tElement[0].innerHTML;
                        return '<div class="wjGridColumn"/>';
                    };
                }
                else {
                    this.transclude = true;
                    this.template = '<div class="wjGridColumn" ng-transclude/>';
                }
            }
            Object.defineProperty(WjFlexGridColumn.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.grid.Column;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexGridColumn.prototype._initControl = function (element) {
                return new wijmo.grid.Column();
            };
            WjFlexGridColumn.prototype._createLink = function () {
                return new WjFlexGridColumnLink();
            };
            WjFlexGridColumn._colTemplateProp = '$__wjColTemplate';
            WjFlexGridColumn._colWjLinkProp = '$__wjLink';
            WjFlexGridColumn._cellCtxProp = '$_cellCtxProp';
            return WjFlexGridColumn;
        }(angular.WjDirective));
        var WjFlexGridColumnLink = (function (_super) {
            __extends(WjFlexGridColumnLink, _super);
            function WjFlexGridColumnLink() {
                _super.apply(this, arguments);
            }
            WjFlexGridColumnLink.prototype._initParent = function () {
                var grid = this.parent.control;
                if (grid.autoGenerateColumns) {
                    grid.autoGenerateColumns = false;
                    this._safeApply(this.scope, 'autoGenerateColumns', false);
                    grid.columns.clear();
                }
                _super.prototype._initParent.call(this);
                // Assign cell template defined without WjFlexGridCellTemplate tag if the latter was not specified.
                var cellCtxProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.Cell), cellCtxByTag = this.control[cellCtxProp], cellCtxWoTag = this[WjFlexGridColumn._cellCtxProp];
                if (!cellCtxByTag && cellCtxWoTag) {
                    this.control[cellCtxProp] = cellCtxWoTag;
                }
                this.control[WjFlexGridColumn._colWjLinkProp] = this;
            };
            WjFlexGridColumnLink.prototype._link = function () {
                // get column template (HTML content)
                var rootEl = this.tElement[0], dynaTempl = this.tAttrs[WjFlexGridColumn._colTemplateProp], template = dynaTempl != null ? dynaTempl : angular.WjDirective._removeTransclude(rootEl.innerHTML), cellTemplContext = {};
                if (!wijmo.isNullOrWhiteSpace(template)) {
                    //this.control['cellTemplate'] = template;
                    var templRoot = document.createElement('div');
                    templRoot.innerHTML = template;
                    var childElements = [];
                    [].forEach.call(templRoot.children, function (value) {
                        childElements.push(value);
                    });
                    var linkScope;
                    for (var i = 0; i < childElements.length; i++) {
                        var curTempl = childElements[i];
                        if (curTempl.tagName.toLocaleLowerCase() === WjFlexGridCellTemplate._tagName) {
                            if (!linkScope) {
                                //linkScope = this.scope.$parent;
                                linkScope = this.scope.$parent.$new();
                            }
                            // remove cell template directive from cell's template
                            templRoot.removeChild(curTempl);
                            // compile and link cell template directive
                            rootEl.appendChild(curTempl);
                            this.directive._$compile(curTempl)(linkScope);
                        }
                    }
                    var cleanCellTempl = templRoot.innerHTML;
                    if (!wijmo.isNullOrWhiteSpace(cleanCellTempl)) {
                        cellTemplContext.cellTemplate = cleanCellTempl;
                    }
                }
                // get column style
                var style = this.tAttrs['ngStyle'], ngClass = this.tAttrs['ngClass'];
                if (style) {
                    cellTemplContext.cellStyle = style;
                }
                if (ngClass) {
                    cellTemplContext.cellClass = ngClass;
                }
                if (cellTemplContext.cellTemplate || cellTemplContext.cellStyle || cellTemplContext.cellClass) {
                    cellTemplContext.templLink = this;
                    this[WjFlexGridColumn._cellCtxProp] = cellTemplContext;
                }
                _super.prototype._link.call(this);
            };
            return WjFlexGridColumnLink;
        }(angular.WjLink));
        /**
         * Defines the type of cell to which the template applies.
         * This value is specified in the <b>cell-type</b> attribute
         * of the @see:WjFlexGridCellTemplate directive.
         */
        (function (CellTemplateType) {
            /** Defines a regular (data) cell. */
            CellTemplateType[CellTemplateType["Cell"] = 0] = "Cell";
            /** Defines a cell in edit mode. */
            CellTemplateType[CellTemplateType["CellEdit"] = 1] = "CellEdit";
            /** Defines a column header cell. */
            CellTemplateType[CellTemplateType["ColumnHeader"] = 2] = "ColumnHeader";
            /** Defines a row header cell. */
            CellTemplateType[CellTemplateType["RowHeader"] = 3] = "RowHeader";
            /** Defines a row header cell in edit mode. */
            CellTemplateType[CellTemplateType["RowHeaderEdit"] = 4] = "RowHeaderEdit";
            /** Defines a top left cell. */
            CellTemplateType[CellTemplateType["TopLeft"] = 5] = "TopLeft";
            /** Defines a group header cell in a group row. */
            CellTemplateType[CellTemplateType["GroupHeader"] = 6] = "GroupHeader";
            /** Defines a regular cell in a group row. */
            CellTemplateType[CellTemplateType["Group"] = 7] = "Group";
        })(angular.CellTemplateType || (angular.CellTemplateType = {}));
        var CellTemplateType = angular.CellTemplateType;
        /**
         * AngularJS directive for the @see:FlexGrid cell templates.
         *
         * The <b>wj-flex-grid-cell-template</b> directive defines a template for a certain
         * cell type in @see:FlexGrid, and must contain a <b>cell-type</b> attribute that
         * specifies the @see:CellTemplateType. Depending on the template's cell type,
         * the <b>wj-flex-grid-cell-template</b> directive must be a child of either @see:WjFlexGrid
         * or @see:WjFlexGridColumn directives.
         *
         * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
         * directives, and cells that are not column-specific (like row header or top left cells)
         * must be contained in the <b>wj-flex-grid directive</b>.
         *
         * In addition to an HTML fragment, <b>wj-flex-grid-cell-template</b> directives may
         * contain an <b>ng-style</b> or <b>ng-class</b> attribute that provides conditional formatting for cells.
         *
         * Both the <b>ng-style/ng-class</b> attributes and the HTML fragment can use the <b>$col</b>,
         * <b>$row</b> and <b>$item</b> template variables that refer to the @see:Column,
         * @see:Row and <b>Row.dataItem</b> objects pertaining to the cell.
         *
         * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>$value</b>
         * variable containing an unformatted cell value is provided. For example, here is a
         * FlexGrid control with templates for row headers and for the Country column's regular
         * and column header cells:
         *
         * <pre>&lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
         *     {&#8203;{$row.index}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
         *     ...
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &nbsp;
         *   &lt;wj-flex-grid-column header="Country" binding="country"&gt;
         *     &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
         *       &lt;img ng-src="resources/globe.png" /&gt;
         *         {&#8203;{$col.header}}
         *       &lt;/wj-flex-grid-cell-template&gt;
         *       &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
         *         &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
         *         {&#8203;{$item.country}}
         *       &lt;/wj-flex-grid-cell-template&gt;
         *     &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column header="Sales" binding="sales"&gt;&lt;/wj-flex-grid-column&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * For more detailed information on specific cell type templates refer to the
         * documentation for the @see:CellTemplateType enumeration.
         *
         * Note that the <b>wj-flex-grid-column</b> directive may also contain arbitrary content
         * that is treated as a template for a regular data cell (<i>cell-type="Cell"</i>). But if
         * a <b>wj-flex-grid-cell-template</b> directive exists and is set to <i>cell-type="Cell"</i>
         * under the <b>wj-flex-grid-column</b> directive, it takes priority and overrides the
         * arbitrary content.
         *
         * The <b>wj-flex-grid-cell-template</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>cell-type</dt>
         *   <dd><code>@</code>
         *     The @see:CellTemplateType value defining the type of cell the template applies to.
         *   </dd>
         *   <dt>cell-overflow</dt>
         *   <dd><code>@</code>
         *     Defines the <b>style.overflow</b> property value for cells.
         *   </dd>
         * </dl>
         *
         * The <b>cell-type</b> attribute takes any of the following enumerated values:
         *
         * <b>Cell</b>
         *
         * Defines a regular (data) cell template. Must be a child of the @see:WjFlexGridColumn directive.
         * For example, this cell template shows flags in the Country column's cells:
         *
         * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
         *     &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
         *     {&#8203;{$item.country}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid-column&gt;</pre>
         *
         * For a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property
         * specified), if no <b>Group</b> template is provided, non-header cells in group rows in
         * this @see:Column also use this template.
         *
         * <b>CellEdit</b>
         *
         * Defines a template for a cell in edit mode. Must be a child of the @see:WjFlexGridColumn directive.
         * This cell type has an additional <b>$value</b> property available for binding. It contains the
         * original cell value before editing, and the updated value after editing.
     
         * For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
         * for the "Sales" column:
         *
         * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="CellEdit"&gt;
         *     &lt;wj-input-number value="$value" step="1"&gt;&lt;/wj-input-number&gt;
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid-column&gt;</pre>
         *
         * <b>ColumnHeader</b>
         *
         * Defines a template for a column header cell. Must be a child of the @see:WjFlexGridColumn directive.
         * For example, this template adds an image to the header of the "Country" column:
         *
         * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
         *     &lt;img ng-src="resources/globe.png" /&gt;
         *     {&#8203;{$col.header}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid-column&gt;</pre>
         *
         * <b>RowHeader</b>
         *
         * Defines a template for a row header cell. Must be a child of the @see:WjFlexGrid directive.
         * For example, this template shows row indices in the row headers:
         *
         * <pre>&lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
         *     {&#8203;{$row.index}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * Note that this template is applied to a row header cell, even if it is in a row that is
         * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
         * content, define the <b>RowHeaderEdit</b> template.
         *
         * <b>RowHeaderEdit</b>
         *
         * Defines a template for a row header cell in edit mode. Must be a child of the
         * @see:WjFlexGrid directive. For example, this template shows dots in the header
         * of rows being edited:
         *
         * <pre>&lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
         *       ...
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * To add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
         * applies, use the following <b>RowHeaderEdit</b> template:
         *
         * <pre>&lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
         *     {&#8203;{&amp;#x270e;}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * <b>TopLeft</b>
         *
         * Defines a template for the top left cell. Must be a child of the @see:WjFlexGrid directive.
         * For example, this template shows a down/right glyph in the top-left cell of the grid:
         *
         * <pre>&lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="TopLeft"&gt;
         *     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * <p><b>GroupHeader</b></p>
         *
         * Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:WjFlexGridColumn directive.
         *
         * The <b>$row</b> variable contains an instance of the <b>GroupRow</b> class. If the grouping comes
         * from the a @see:CollectionView, the <b>$item</b> variable references the @see:CollectionViewGroup object.
         *
         * For example, this template uses a checkbox element as an expand/collapse toggle:
         *
         * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="GroupHeader"&gt;
         *     &lt;input type="checkbox" ng-model="$row.isCollapsed"/&gt;
         *     {&#8203;{$item.name}} ({&#8203;{$item.items.length}} items)
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid-column&gt;</pre>
         *
         * <b>Group</b>
         *
         * Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the
         * @see:WjFlexGridColumn directive. This cell type has an additional <b>$value</b> varible available for
         * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
         * aggregate value.
         *
         * For example, this template shows an aggregate's value and kind for group row cells in the "Sales"
         * column:
         *
         * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg"&gt;
         *   &lt;wj-flex-grid-cell-template cell-type="Group"&gt;
         *     Average: {&#8203;{$value | number:2}}
         *   &lt;/wj-flex-grid-cell-template&gt;
         * &lt;/wj-flex-grid-column&gt;</pre>
         */
        var WjFlexGridCellTemplate = (function (_super) {
            __extends(WjFlexGridCellTemplate, _super);
            function WjFlexGridCellTemplate() {
                _super.call(this);
                this.require = ['?^wjFlexGridColumn', '?^wjFlexGrid'];
                // The same approach like in WjFlexGridColumn
                this['terminal'] = true;
                if (angular.WjDirective._dynaTemplates) {
                    this.transclude = false;
                    this['priority'] = 100;
                    this.template = function (tElement, tAttrs) {
                        tAttrs[WjFlexGridColumn._colTemplateProp] = tElement[0].innerHTML;
                        return '<div />';
                    };
                }
                else {
                    this.transclude = true;
                    this.template = '<div ng-transclude/>';
                }
            }
            // returns the name of the property on control instance that stores info for the specified cell template type.
            WjFlexGridCellTemplate._getTemplContextProp = function (templateType) {
                return '$__cellTempl' + CellTemplateType[templateType];
            };
            WjFlexGridCellTemplate.prototype._initControl = function (element) {
                return {};
            };
            WjFlexGridCellTemplate.prototype._createLink = function () {
                return new WjFlexGridCellTemplateLink();
            };
            WjFlexGridCellTemplate.prototype._getMetaDataId = function () {
                return 'FlexGridCellTemplate';
            };
            WjFlexGridCellTemplate._tagName = 'wj-flex-grid-cell-template';
            return WjFlexGridCellTemplate;
        }(angular.WjDirective));
        var WjFlexGridCellTemplateLink = (function (_super) {
            __extends(WjFlexGridCellTemplateLink, _super);
            function WjFlexGridCellTemplateLink() {
                _super.apply(this, arguments);
            }
            WjFlexGridCellTemplateLink.prototype._initParent = function () {
                _super.prototype._initParent.call(this);
                var cts = this.scope['cellType'], cellType;
                if (cts) {
                    cellType = CellTemplateType[cts];
                }
                else {
                    return;
                }
                // get column template (HTML content)
                var dynaTempl = this.tAttrs[WjFlexGridColumn._colTemplateProp], template = dynaTempl != null ? dynaTempl : angular.WjDirective._removeTransclude(this.tElement[0].innerHTML), control = this.control;
                if (!wijmo.isNullOrWhiteSpace(template)) {
                    control.cellTemplate = template;
                }
                // get column style
                var style = this.tAttrs['ngStyle'], ngClass = this.tAttrs['ngClass'];
                if (style) {
                    control.cellStyle = style;
                }
                if (ngClass) {
                    control.cellClass = ngClass;
                }
                if (control.cellTemplate || control.cellStyle || control.cellClass) {
                    control.templLink = this;
                    this.parent.control[WjFlexGridCellTemplate._getTemplContextProp(cellType)] = control;
                }
                WjFlexGridCellTemplateLink._invalidateGrid(this.parent.control);
            };
            WjFlexGridCellTemplateLink.prototype._destroy = function () {
                var parentControl = this.parent && this.parent.control, cts = this.scope['cellType'];
                _super.prototype._destroy.call(this);
                if (cts) {
                    parentControl[WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[cts])] = undefined;
                    WjFlexGridCellTemplateLink._invalidateGrid(parentControl);
                }
            };
            WjFlexGridCellTemplateLink._invalidateGrid = function (parentControl) {
                var grid = parentControl;
                if (grid) {
                    if (grid instanceof wijmo.grid.Column) {
                        grid = grid.grid;
                    }
                    if (grid) {
                        grid.invalidate();
                    }
                }
            };
            return WjFlexGridCellTemplateLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for the @see:FlexGridFilter object.
         *
         * The <b>wj-flex-grid-filter</b> directive must be contained in a @see:WjFlexGrid directive. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
         * &lt;wj-flex-grid items-source="data"&gt;
         *   &lt;wj-flex-grid-filter filter-columns="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
         * &nbsp;
         *   &lt;wj-flex-grid-column
         *     header="Country"
         *     binding="country"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Sales"
         *     binding="sales"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Expenses"
         *     binding="expenses"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Downloads"
         *     binding="downloads"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *  &lt;/wj-flex-grid&gt;</pre>
         *
         * The <b>wj-flex-grid-filter</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>filter-columns</dt>    <dd><code>=</code> An array containing the names or bindings of the columns
         *                              to filter.</dd>
         *   <dt>show-filter-icons</dt> <dd><code>@</code>  The value indicating whether filter editing buttons
         *                              appear in the grid's column headers.</dd>
         *   <dt>filter-changing</dt>   <dd><code>&</code> Handler for the @see:FlexGridFilter.filterChanging event.</dd>
         *   <dt>filter-changed</dt>    <dd><code>&</code> Handler for the @see:FlexGridFilter.filterChanged event.</dd>
         *   <dt>filter-applied</dt>    <dd><code>&</code> Handler for the @see:FlexGridFilter.filterApplied event.</dd>
         * </dl>
         */
        var WjFlexGridFilter = (function (_super) {
            __extends(WjFlexGridFilter, _super);
            // Initializes a new instance of a WjGridColumn
            function WjFlexGridFilter() {
                _super.call(this);
                this.require = '^wjFlexGrid';
                //this.transclude = true;
                this.template = '<div />';
            }
            Object.defineProperty(WjFlexGridFilter.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.grid.filter.FlexGridFilter;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexGridFilter;
        }(angular.WjDirective));
        /**
         * AngularJS directive for the @see:GroupPanel control.
         *
         * The <b>wj-group-panel</b> directive connects to the <b>FlexGrid</b> control via the <b>grid</b> property.
         * For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
         * &nbsp;
         * &lt;wj-group-panel grid="flex" placeholder="Drag columns here to create groups."&gt;&lt;/wj-group-panel&gt;
         * &nbsp;
         * &lt;wj-flex-grid control="flex" items-source="data"&gt;
         *   &lt;wj-flex-grid-column
         *     header="Country"
         *     binding="country"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Sales"
         *     binding="sales"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Expenses"
         *     binding="expenses"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column
         *     header="Downloads"
         *     binding="downloads"&gt;
         *   &lt;/wj-flex-grid-column&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * The <b>wj-group-panel</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>grid</dt>                      <dd><code>@</code>The <b>FlexGrid</b> that is connected to this <b>GroupPanel</b>.</dd>
         *   <dt>hide-grouped-columns</dt>      <dd><code>@</code>A value indicating whether the panel hides grouped columns
         *                                      in the owner grid.</dd>
         *   <dt>max-groups</dt>                <dd><code>@</code>The maximum number of groups allowed.</dd>
         *   <dt>placeholder</dt>               <dd><code>@</code>A string to display in the control when it
         *                                      contains no groups.</dd>
         *   <dt>got-focus</dt>                 <dd><code>&</code> The @see:GroupPanel.gotFocus event handler.</dd>
         *   <dt>lost-focus</dt>                <dd><code>&</code> The @see:GroupPanel.lostFocus event handler.</dd>
         * </dl>
         *
         */
        var WjGroupPanel = (function (_super) {
            __extends(WjGroupPanel, _super);
            function WjGroupPanel() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjGroupPanel.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.grid.grouppanel.GroupPanel;
                },
                enumerable: true,
                configurable: true
            });
            return WjGroupPanel;
        }(angular.WjDirective));
        /**
         * AngularJS directive for @see:FlexGrid @see:DetailRow templates.
         *
         * The <b>wj-flex-grid-detail</b> directive must be contained in a
         * <b>wj-flex-grid</b> directive.
         *
         * The <b>wj-flex-grid-detail</b> directive represents a @see:FlexGridDetailProvider
         * object that maintains detail rows visibility, with detail rows content defined as
         * an arbitrary HTML fragment within the directive tag. The fragment may contain
         * AngularJS bindings and directives.
         * In addition to any properties available in a controller, the local <b>$row</b> and
         * <b>$item</b> template variables can be used in AngularJS bindings that refer to
         * the detail row's parent @see:Row and <b>Row.dataItem</b> objects. For example:
         *
         * <pre>&lt;p&gt;Here is a detail row with a nested FlexGrid:&lt;/p&gt;
         * &nbsp;
         * &lt;wj-flex-grid
         *   items-source="categories"&gt;
         *   &lt;wj-flex-grid-column header="Name" binding="CategoryName"&gt;&lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column header="Description" binding="Description" width="*"&gt;&lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-detail max-height="250" detail-visibility-mode="detailMode"&gt;
         *     &lt;wj-flex-grid
         *       items-source="getProducts($item.CategoryID)"
         *       headers-visibility="Column"&gt;
         *     &lt;/wj-flex-grid&gt;
         *   &lt;/wj-flex-grid-detail&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * A reference to a <b>FlexGridDetailProvider</b> object represented by the
         * <b>wj-flex-grid-detail</b> directive can be retrieved in a usual way by binding
         * to the directive's <b>control</b> property. This makes all the API provided by
         * <b>FlexGridDetailProvider</b> available for usage in the template, giving you total
         * control over the user experience. The following example adds a custom show/hide toggle
         * to the Name column cells, and a Hide Detail button to the detail row. These elements call
         * the <b>FlexGridDetailProvider</b>, <b>hideDetail</b> and <b>showDetail</b> methods in
         * their <b>ng-click</b> bindings to implement the custom show/hide logic:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid with custom show/hide detail elements:&lt;/p&gt;
         * &nbsp;
         * &lt;wj-flex-grid
         *   items-source="categories"
         *   headers-visibility="Column"
         *   selection-mode="Row"&gt;
         *   &lt;wj-flex-grid-column header="Name" binding="CategoryName" is-read-only="true" width="200"&gt;
         *     &lt;img ng-show="dp.isDetailVisible($row)" ng-click="dp.hideDetail($row)" src="resources/hide.png" /&gt;
         *     &lt;img ng-hide="dp.isDetailVisible($row)" ng-click="dp.showDetail($row, true)" src="resources/show.png" /&gt;
         *     {&#8203;{$item.CategoryName}}
         *   &lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-column header="Description" binding="Description" width="2*"&gt;&lt;/wj-flex-grid-column&gt;
         *   &lt;wj-flex-grid-detail control="dp" detail-visibility-mode="Code"&gt;
         *     &lt;div style="padding:12px;background-color:#cee6f7"&gt;
         *       ID: &lt;b&gt;{&#8203;{$item.CategoryID}}&lt;/b&gt;&lt;br /&gt;
         *       Name: &lt;b&gt;{&#8203;{$item.CategoryName}}&lt;/b&gt;&lt;br /&gt;
         *       Description: &lt;b&gt;{&#8203;{$item.Description}}&lt;/b&gt;&lt;br /&gt;
         *       &lt;button class="btn btn-default" ng-click="dp.hideDetail($row)"&gt;Hide Detail&lt;/button&gt;
         *     &lt;/div&gt;
         *   &lt;/wj-flex-grid-detail&gt;
         * &lt;/wj-flex-grid&gt;</pre>
         *
         * The <b>wj-flex-grid-detail</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>control</dt>                <dd><code>=</code> A reference to the @see:FlexGridDetailProvider object
         *                                   created by this directive.</dd>
         *   <dt>detail-visibility-mode</dt> <dd><code>@</code>A @see:DetailVisibilityMode value that determines when
         *                                   to display the row details.</dd>
         *   <dt>max-height</dt>             <dd><code>@</code>The maximum height of the detail rows, in pixels.</dd>
         *   <dt>row-has-detail</dt>         <dd><code>=</code>The callback function that determines whether a row
         *                                       has details.</dd>
         * </dl>
         *
         */
        var WjFlexGridDetail = (function (_super) {
            __extends(WjFlexGridDetail, _super);
            function WjFlexGridDetail($compile) {
                _super.call(this);
                this._$compile = $compile;
                this.require = '^wjFlexGrid';
                // The same approach like in WjFlexGridColumn
                this['terminal'] = true;
                if (angular.WjDirective._dynaTemplates) {
                    this.transclude = false;
                    this['priority'] = 100;
                    this.template = function (tElement, tAttrs) {
                        tAttrs[WjFlexGridDetail._detailTemplateProp] = tElement[0].innerHTML;
                        return '<div />';
                    };
                }
                else {
                    this.transclude = true;
                    this.template = '<div ng-transclude/>';
                }
            }
            Object.defineProperty(WjFlexGridDetail.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.grid.detail.FlexGridDetailProvider;
                },
                enumerable: true,
                configurable: true
            });
            WjFlexGridDetail.prototype._createLink = function () {
                return new WjFlexGridDetailLink();
            };
            WjFlexGridDetail._detailTemplateProp = '$__wjDetailTemplate';
            WjFlexGridDetail._detailScopeProp = '$_detailScope';
            return WjFlexGridDetail;
        }(angular.WjDirective));
        var WjFlexGridDetailLink = (function (_super) {
            __extends(WjFlexGridDetailLink, _super);
            function WjFlexGridDetailLink() {
                _super.apply(this, arguments);
            }
            WjFlexGridDetailLink.prototype._initParent = function () {
                _super.prototype._initParent.call(this);
                // get column template (HTML content)
                var self = this, dynaTempl = this.tAttrs[WjFlexGridDetail._detailTemplateProp], dp = this.control;
                this.itemTemplate = this._getCellTemplate(dynaTempl != null ? dynaTempl :
                    angular.WjDirective._removeTransclude(this.tElement[0].innerHTML));
                var tpl = this._getCellTemplate(this.itemTemplate);
                this._tmplLink = this.directive._$compile('<div>' + tpl + '</div>');
                // show detail when asked to
                dp.createDetailCell = function (row, col) {
                    // create detail row scope and link it
                    var cellScope = self._getCellScope(self.scope.$parent, row, col), clonedElement = self._tmplLink(cellScope, function (clonedEl, scope) { })[0];
                    // add the linked tree to the DOM tree, in order to get correct height in FlexGridDetailProvider's formatItem
                    dp.grid.hostElement.appendChild(clonedElement);
                    // apply the cell scope
                    if (!cellScope.$root.$$phase) {
                        cellScope.$apply();
                    }
                    // remove cell element from the DOM tree and return it to caller
                    clonedElement.parentElement.removeChild(clonedElement);
                    return clonedElement;
                };
                // dispose detail scope when asked to
                dp.disposeDetailCell = function (row) {
                    if (row.detail) {
                        window['angular'].element(row.detail).scope().$destroy();
                    }
                };
                if (this.parent._isInitialized && this.control) {
                    this.control.invalidate();
                }
            };
            WjFlexGridDetailLink.prototype._destroy = function () {
                var ownerControl = this.parent && this.parent.control, dp = this.control;
                dp.createDetailCell = null;
                dp.disposeDetailCell = null;
                _super.prototype._destroy.call(this);
                this._tmplLink = null;
                if (ownerControl) {
                    ownerControl.invalidate();
                }
            };
            // helper functions
            WjFlexGridDetailLink.prototype._getCellScope = function (parentScope, row, col) {
                var ret = parentScope.$new();
                ret.$row = row;
                ret.$col = col;
                ret.$item = row.dataItem;
                return ret;
            };
            WjFlexGridDetailLink.prototype._getCellTemplate = function (tpl) {
                if (tpl) {
                    tpl = tpl.replace(/ng\-style/g, 'style');
                    tpl = tpl.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g, '');
                    tpl = tpl.replace(/<span>\s*<\/span>/g, '');
                }
                return tpl;
            };
            return WjFlexGridDetailLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for the @see:FlexSheet control.
         *
         * Use the <b>wj-flex-sheet</b> directive to add <b>FlexSheet</b> controls to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexSheet control with one bound and two unbound sheets:&lt;/p&gt;
         * &lt;wj-flex-sheet&gt;
         *    &lt;wj-sheet name="Country" items-source="ctx.data"&gt;&lt;/wj-sheet&gt;
         *    &lt;wj-sheet name="Report" row-count="25" column-count="13"&gt;&lt;/wj-sheet&gt;
         *    &lt;wj-sheet name="Formulas" row-count="310" column-count="10"&gt;&lt;/wj-sheet&gt;
         * &lt;/wj-flex-sheet&gt;</pre>
         *
         * The <b>wj-flex-sheet</b> directive extends @see:WjFlexGrid with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>control</dt>                   <dd><code>=</code> A reference to the @see:FlexSheet control created by this directive.</dd>
         *   <dt>is-tab-holder-visible</dt>     <dd><code>@</code> A value indicating whether the sheet tabs holder is visible. </dd>
         *   <dt>selected-sheet-index</dt>      <dd><code>=</code> Gets or sets the index of the current sheet in the @see:FlexSheet. </dd>
         *   <dt>dragging-row-column</dt>       <dd><code>&</code> The @see:FlexSheet.draggingRowColumn event handler.</dd>
         *   <dt>dropping-row-column</dt>       <dd><code>&</code> The @see:FlexSheet.droppingRowColumn event handler.</dd>
         *   <dt>selected-sheet-changed</dt>    <dd><code>&</code> The @see:FlexSheet.selectedSheetChanged event handler.</dd>
         * </dl>
         *
         * The <b>wj-flex-sheet</b> directive may contain @see:WjSheet child directives.
         */
        var WjFlexSheet = (function (_super) {
            __extends(WjFlexSheet, _super);
            function WjFlexSheet($compile, $interpolate) {
                _super.call(this, $compile, $interpolate);
            }
            Object.defineProperty(WjFlexSheet.prototype, "_controlConstructor", {
                // Gets the Wijmo FlexSheet control constructor
                get: function () {
                    return wijmo.grid.sheet.FlexSheet;
                },
                enumerable: true,
                configurable: true
            });
            return WjFlexSheet;
        }(WjFlexGrid));
        /**
         * AngularJS directive for the @see:Sheet object.
         *
         * The <b>wj-sheet</b> directive must be contained in a @see:WjFlexSheet directive.
         * It supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>name</dt>               <dd><code>@</code> The name of the sheet.
         *   <dt>row-count</dt>          <dd><code>@</code> The initial number of rows in the unbound sheet.
         *                               Changes to this attribute have no effect after the @see:Sheet was initialized by AngularJS.
         *   <dt>column-count</dt>       <dd><code>@</code> The initial number of columns in the unbound sheet.
         *                               Changes to this attribute have no effect after the @see:Sheet was initialized by AngularJS.
         *   <dt>items-source</dt>       <dd><code>=</code> The data source for the data bound sheet.
         *                               Changes to this attribute have no effect after the @see:Sheet was initialized by AngularJS.
         *   <dt>visible</dt>            <dd><code>@</code> A value indicating whether the sheet is visible.
         *   <dt>name-changed</dt>       <dd><code>&</code> The @see:Sheet.nameChanged event handler.</dd>
         * </dl>
         */
        var WjSheet = (function (_super) {
            __extends(WjSheet, _super);
            function WjSheet() {
                _super.call(this);
                this.require = '^wjFlexSheet';
            }
            Object.defineProperty(WjSheet.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.grid.sheet.Sheet;
                },
                enumerable: true,
                configurable: true
            });
            WjSheet.prototype._createLink = function () {
                return new WjSheetLink();
            };
            return WjSheet;
        }(angular.WjDirective));
        var WjSheetLink = (function (_super) {
            __extends(WjSheetLink, _super);
            function WjSheetLink() {
                _super.apply(this, arguments);
            }
            WjSheetLink.prototype._initControl = function () {
                var sheet = _super.prototype._initControl.call(this), scope = this.scope, flexSheet = this.parent.control;
                sheet.name = scope['name'];
                if (scope['itemsSource']) {
                    sheet.itemsSource = scope['itemsSource'];
                }
                else {
                    sheet.rowCount = +scope['rowCount'];
                    sheet.columnCount = +scope['columnCount'];
                }
                flexSheet.sheets.push(sheet);
                return sheet;
            };
            return WjSheetLink;
        }(angular.WjLink));
        /**
         * AngularJS directive for the @see:MultiRow control.
         *
         * Use the <b>wj-multi-row</b> directive to add <b>MultiRow</b> controls to your AngularJS applications.
         * Note that directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case.
         *
         * The <b>wj-multi-row</b> directive extends @see:WjFlexGrid with the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>control</dt>                    <dd><code>=</code> A reference to the @see:MultiRow control created by this directive.</dd>
         *   <dt>layout-definition</dt>          <dd><code>@</code> A value defines the layout of the rows used to display each data item.</dd>
         *   <dt>collapsed-headers</dt>          <dd><code>@</code> Gets or sets a value that determines whether column headers should be
         *                                       collapsed and displayed as a single row displaying the group headers.</dd>
         *   <dt>center-headers-vertically</dt>  <dd><code>@</code> Gets or sets a value that determines whether the content of cells
         *                                       that span multiple rows should be vertically centered.</dd>
         *   <dt>show-header-collapse-button</dt><dd><code>@</code> Gets or sets a value that determines whether the grid should
         *                                       display a button in the column header panel to allow users to collapse and expand the column headers.</dd>
         * </dl>
         */
        var WjMultiRow = (function (_super) {
            __extends(WjMultiRow, _super);
            function WjMultiRow($compile, $interpolate) {
                _super.call(this, $compile, $interpolate);
            }
            Object.defineProperty(WjMultiRow.prototype, "_controlConstructor", {
                // Gets the Wijmo MultiRow control constructor
                get: function () {
                    return wijmo.grid.multirow.MultiRow;
                },
                enumerable: true,
                configurable: true
            });
            return WjMultiRow;
        }(WjFlexGrid));
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.grid.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// AngularJS directives for wijmo.olap module
//
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        var wijmoOlap = window['angular'].module('wj.olap', ['wj.grid', 'wj.chart']);
        // register only if module is loaded
        if (wijmo.olap && wijmo.olap.PivotGrid) {
            wijmoOlap.directive('wjPivotGrid', ['$compile', '$interpolate', function ($compile, $interpolate) {
                    return new WjPivotGrid($compile, $interpolate);
                }]);
            wijmoOlap.directive('wjPivotChart', [function () {
                    return new WjPivotChart();
                }]);
            wijmoOlap.directive('wjPivotPanel', [function () {
                    return new WjPivotPanel();
                }]);
        }
        /**
         * AngularJS directive for the @see:PivotGrid control.
         *
         * Use the <b>wj-pivot-grid</b> and <b>wj-pivot-panel</b> directives
         * to add pivot tables to your AngularJS applications.
         *
         * Directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;wj-pivot-panel
         *     control="thePanel"
         *     items-source="rawData"&gt;
         * &lt;/wj-pivot-panel&gt;
         * &lt;wj-pivot-grid
         *     items-source="thePanel"
         *     show-detail-on-double-click="false"
         *     custom-context-menu="true"&gt;
         * &lt;/wj-pivot-grid&gt;</pre>
         *
         * The <b>wj-pivot-grid</b> directive extends the <b>wj-flex-grid</b> directive
         * and adds support for the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>items-source</dt>                  <dd>Gets or sets the @see:PivotPanel that defines the view
         *                                              displayed by this @see:PivotGrid.</dd>
         *   <dt>show-detail-on-double-click</dt>   <dd>Gets or sets whether the grid should show a popup containing the
         *                                              detail records when the user double-clicks a cell.</dd>
         *   <dt>custom-context-menu</dt>           <dd>Gets or sets whether the grid should provide a custom context menu
         *                                              with commands for changing field settings and showing detail records.</dd>
         *   <dt>collapsible-subtotals</dt>         <dd>Gets or sets whether the grid should allow users to collapse and
         *                                              expand subtotal groups of rows and columns.</dd>
         *   <dt>center-headers-vertically</dt>     <dd>Gets or sets whether the content of header cells should be vertically centered.</dd>
         * </dl>
         */
        var WjPivotGrid = (function (_super) {
            __extends(WjPivotGrid, _super);
            function WjPivotGrid($compile, $interpolate) {
                _super.call(this, $compile, $interpolate);
            }
            Object.defineProperty(WjPivotGrid.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.olap.PivotGrid;
                },
                enumerable: true,
                configurable: true
            });
            return WjPivotGrid;
        }(angular.WjFlexGrid));
        angular.WjPivotGrid = WjPivotGrid;
        /**
         * AngularJS directive for the @see:PivotChart control.
         *
         * Use the <b>wj-pivot-chart</b> and <b>wj-pivot-panel</b> directives
         * to add pivot charts to your AngularJS applications.
         *
         * Directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;wj-pivot-panel
         *     control="thePanel"
         *     items-source="rawData"&gt;
         * &lt;/wj-pivot-panel&gt;
         * &lt;wj-pivot-chart
         *     items-source="thePanel"
         *     chart-type="Bar"
         *     max-series="10"
         *     max-points="100"&gt;
         * &lt;/wj-pivot-chart&gt;</pre>
         *
         * The <b>wj-pivot-chart</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>items-source</dt>                  <dd>Gets or sets the @see:PivotPanel that defines the view
         *                                              displayed by this @see:PivotChart.</dd>
         *   <dt>chart-type</dt>                    <dd>Gets or sets a @see:PivotChartType value that defines
         *                                              the type of chart to display.</dd>
         *   <dt>show-hierarchical-axes</dt>        <dd>Gets or sets whether the chart should group axis annotations for grouped data.</dd>
         *   <dt>stacking</dt>                      <dd>Gets or sets a @see:Stacking value that determines whether and how the series
         *                                              objects are stacked.</dd>
         *   <dt>show-totals</dt>                   <dd>Gets or sets a whether the chart should include only totals.</dd>
         *   <dt>max-series</dt>                    <dd>Gets or sets the maximum number of data series to be shown in the chart.</dd>
         *   <dt>max-points</dt>                    <dd>Gets or sets the maximum number of points to be shown in each series.</dd>
         * </dl>
         */
        var WjPivotChart = (function (_super) {
            __extends(WjPivotChart, _super);
            function WjPivotChart() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(WjPivotChart.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.olap.PivotChart;
                },
                enumerable: true,
                configurable: true
            });
            return WjPivotChart;
        }(angular.WjDirective));
        angular.WjPivotChart = WjPivotChart;
        /**
         * AngularJS directive for the @see:PivotPanel control.
         *
         * Use the <b>wj-pivot-panel</b> directive as a data source for
         * <b>wj-pivot-grid</b> and <b>wj-pivot-chart</b> directives
         * to add pivot tables and charts to your AngularJS applications.
         *
         * Directive and parameter names must be formatted as lower-case with dashes
         * instead of camel-case. For example:
         *
         * <pre>&lt;wj-pivot-panel
         *     control="thePanel"
         *     items-source="rawData"&gt;
         * &lt;/wj-pivot-panel&gt;
         * &lt;wj-pivot-grid
         *     items-source="thePanel"
         *     show-detail-on-double-click="false"
         *     custom-context-menu="true"&gt;
         * &lt;/wj-pivot-grid&gt;</pre>
         *
         * The <b>wj-pivot-panel</b> directive supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>items-source</dt>                  <dd>Gets or sets the raw data used to generate pivot views.</dd>
         *   <dt>auto-generate-fields</dt>          <dd>Gets or sets whether the panel should populate its fields
         *                                              collection automatically based on the @see:PivotPanel.itemsSource.</dd>
         *   <dt>view-definition</dt>               <dd>Gets or sets the current pivot view definition as a JSON string.</dd>
         *   <dt>engine</dt>                        <dd>Gets a reference to the @see:PivotEngine that summarizes the data.</dd>
         * </dl>
         */
        var WjPivotPanel = (function (_super) {
            __extends(WjPivotPanel, _super);
            function WjPivotPanel() {
                _super.call(this);
                this.transclude = true;
                this.template = '<div ng-transclude />';
            }
            Object.defineProperty(WjPivotPanel.prototype, "_controlConstructor", {
                get: function () {
                    return wijmo.olap.PivotPanel;
                },
                enumerable: true,
                configurable: true
            });
            return WjPivotPanel;
        }(angular.WjDirective));
        angular.WjPivotPanel = WjPivotPanel;
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.olap.js.map
/**
 * Contains AngularJS directives for the Wijmo controls.
 *
 * The directives allow you to add Wijmo controls to
 * <a href="https://angularjs.org/" target="_blank">AngularJS</a>
 * applications using simple markup in HTML pages.
 *
 * You can use directives as regular HTML tags in the page markup. The
 * tag name corresponds to the control name, prefixed with "wj-," and the
 * attributes correspond to the names of control properties and events.
 *
 * All control, property, and event names within directives follow
 * the usual AngularJS convention of replacing camel-casing with hyphenated
 * lower-case names.
 *
 * AngularJS directive parameters come in three flavors, depending on the
 * type of binding they use. The table below describes each one:
 *
 * <dl class="dl-horizontal">
 *   <dt><code>@</code></dt>   <dd>By value, or one-way binding. The attribute
 *                             value is interpreted as a literal.</dd>
 *   <dt><code>=</code></dt>   <dd>By reference, or two-way binding. The
 *                             attribute value is interpreted as an expression.</dd>
 *   <dt><code>&</code></dt>   <dd>Function binding. The attribute value
 *                             is interpreted as a function call, including the parameters.</dd>
 * </dl>
 *
 * For more details on the different binding types, please see <a href=
 * "http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-2-isolate-scope"
 * target="_blank"> Dan Wahlin's blog on directives</a>.
 *
 * The documentation does not describe directive events because they are identical to
 * the control events, and the binding mode is always the same (function binding).
 *
 * To illustrate, here is the markup used to create a @see:ComboBox control:
 *
 * <pre>&lt;wj-combo-box
 *   text="ctx.theCountry"
 *   items-source="ctx.countries"
 *   is-editable="true"
 *   selected-index-changed="ctx.selChanged(s, e)"&gt;
 * &lt;/wj-combo-box&gt;</pre>
 *
 * Notice that the <b>text</b> property of the @see:ComboBox is bound to a controller
 * variable called "ctx.theCountry." The binding goes two ways; changes in the control
 * update the scope, and changes in the scope update the control. To
 * initialize the <b>text</b> property with a string constant, enclose
 * the attribute value in single quotes (for example, <code>text="'constant'"</code>).
 *
 * Notice also that the <b>selected-index-changed</b> event is bound to a controller
 * method called "selChanged," and that the binding includes the two event parameters
 * (without the parameters, the method is not called).
 * Whenever the control raises the event, the directive invokes the controller method.
 */
var wijmo;
(function (wijmo) {
    var angular;
    (function (angular) {
        // define the wijmo module with all dependencies
        var wijModule = window['angular'].module('wj', ['wj.input', 'wj.grid', 'wj.chart', 'wj.container', 'wj.gauge',
            'wj.olap']);
    })(angular = wijmo.angular || (wijmo.angular = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=wijmo.angular.all.js.map