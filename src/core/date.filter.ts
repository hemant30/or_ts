namespace Origin.Core {
    ActualDate.$inject = ['$filter'];
    export function ActualDate($filter) {

        return function (dateString) {
            if (dateString) {
                return $filter('date')(dateString, 'short');
            } else {
                return '';
            }
        }
    }

    LocalDate.$inject = ['$filter'];
    export function LocalDate($filter) {
        return function (dateString: string) {
            if (dateString) {
                return $filter('date')(new Date(dateString), 'short');
            }
            else {
                return '';
            }
        }
    }

    Origin.Main.module.filter('localDate', Origin.Core.LocalDate);
    Origin.Main.module.filter('actualDate', Origin.Core.ActualDate);
}