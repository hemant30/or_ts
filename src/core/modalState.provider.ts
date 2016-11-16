/// <reference path="../main.ts" />

namespace Origin.Core { 

    export interface IModalState { 
        state(stateName: string, options: any);
    };

    export class ModalState implements ng.IServiceProvider { 
        static $inject = ['$stateProvider'];
        provider: IModalState;
        modalResult;

        constructor(private $stateProvider: ng.ui.IStateProvider) { 

        }

        $get(): IModalState { 
            return this;
        }

        state = (stateName: string, options) => { 
            let modalInstance;
            let _self = this;
            this.$stateProvider.state(stateName, {
                url: options.url,
                onEnter: ['$uibModal', '$state', function ($modal : ng.ui.bootstrap.IModalService, $state) { 
                    modalInstance = $modal.open(options);
                    modalInstance.result.then(function (result) { 
                        _self.modalResult = result;
                    }).finally(function () { 
                        if (_self.modalResult) { 
                            $state.get('^').modalResult = _self.modalResult;
                        }

                        modalInstance = _self.modalResult = null;
                        if ($state.$current.name === stateName) { 
                            $state.go('^')
                        }
                    })
                }],
                onExit: function () { 
                    if (modalInstance) { 
                        modalInstance.close();
                    }
                }
            });
        }
    }

    Origin.Main.module.provider('modalState', ModalState)
}