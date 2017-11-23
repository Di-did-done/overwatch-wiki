import './app.component.less';

class AppController {
    currentStateName: string;

    constructor($state, $timeout) {
        $timeout(() => {
            this.currentStateName = $state.current.name;
        });
    }
}

AppController.$inject = ['$state', '$timeout'];

export const AppComponent = {
    controller: AppController,
    template: require('./app.component.html')
};
