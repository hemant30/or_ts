namespace Origin.Template { 
    export var WorkpaperContainerTemplate: string =
        `
        <div class="splitter-group-wrapper">
            <div data-bento-splitter-group data-left-width="18%" data-is-left-collapsed="false" data-resizable="true"   data-event-tracking="" on-resize="trackEvent(eventName)">
                <aside data-bento-splitter-group-left style="overflow: hidden">
                    <div id="divleftmenu" style="width: 100%; padding-right: 10px; vertical-align: top" class="noselect">
                        <div style="padding-right: 0px; position: absolute; top: 5px; left: 0px; right: 0px; height: 95%">
                            <folder onrefreshtable="$ctrl.refreshTable(a)"></folder>
                        </div>
                    </div>
                </aside>
                <section grid-container data-bento-splitter-group-main>
                    <workpaper subscribe="$ctrl.subscribe(a)" customattributes="$ctrl.customattributes"></workpaper>
                </section>
            </div>
        </div>
        
        
        `
}