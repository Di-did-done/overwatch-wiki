export const HeroesRoutesConfig = [
    '$stateProvider',
    ($stateProvider) => {
        $stateProvider
            .state('heroes', {
                name: 'heroes',
                url: '/heroes',
                component: 'heroesPage'
            });
    }
];
