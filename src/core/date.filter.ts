

namespace Origin.Core {
    ActualDate.$inject = ['$filter'];
    export function ActualDate($filter) { 

        return function(dateString) {
            if (dateString) {
                return $filter('date')(dateString, 'short');
            } else {
                return '';
            }
        }


    }

    Origin.Main.module.filter('actualDate', Origin.Core.ActualDate);
}