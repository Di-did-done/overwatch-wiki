import * as angular from 'angular';

/**
 * @ngdoc directive
 * @class grid
 * @name mc-grid-resize
 * @description
 * Выставляет ширину и высоту грида такой же, как у контейнера, в котором находится грид.
 * Также, в API грида добавляет пространство autoresize, в котором можно дернуть функцию resize.
 */

export const GridResizeDirective = ($interval, $window) => {
    return {
        replace: true,
        restrict: 'A',
        scope: false,
        require: '^uiGrid',
        link($scope, $elm, $attrs, uiGridCtrl) {
            let gridWidth;
            let gridHeight;

            const grid = uiGridCtrl.grid;
            // todo JQ way!
            const $win = angular.element($window);

            grid.options.gridContentContainer = grid.options.gridContentContainer || 'grid-content';

            function resizeHandler() {
                const container = document.getElementById(grid.options.gridContentContainer);

                if (!container) { return; }

                if (gridWidth !== container.offsetWidth || gridHeight !== container.offsetHeight) {
                    const prevGridWidth = gridWidth;
                    const prevGridHeight = gridHeight;

                    gridWidth = grid.gridWidth = container.offsetWidth;
                    gridHeight = grid.gridHeight = container.offsetHeight;

                    $elm.css({
                        width: `${gridWidth}px`,
                        height: `${gridHeight}px`
                    });

                    grid.refresh();

                    uiGridCtrl.grid.api.core.raise.gridDimensionChanged(
                        prevGridHeight, prevGridWidth, gridHeight, gridWidth
                    );
                }
            }

            function windowResizeHandler() {
                resizeHandler();
                /*
                 Handle case when page loaded in small window and then we enlarge it (e.g. load page with opened
                 dev tools and then close them).
                 In this case we should refresh grid to see new rows at the window bottom.
                 */
                grid.refresh();
            }

            const publicApi = {
                methods: {
                    autoresize: {
                        resize() {
                            setTimeout(resizeHandler, 200);
                        }
                    }
                }
            };

            grid.autoresize = {}; // create namespace for API
            grid.api.registerMethodsFromObject(publicApi.methods);

            $win.bind('resize', windowResizeHandler);
            const canceller = window.setInterval(resizeHandler, 250);

            $scope.$on('$destroy', () => {
                window.clearInterval(canceller);
                $win.unbind('resize', windowResizeHandler);
            });
        }
    };
};
