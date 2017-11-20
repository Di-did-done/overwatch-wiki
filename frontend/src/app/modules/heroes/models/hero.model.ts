export interface Hero {
    id: string;
    name: string;
    role: 'offence' | 'defense' | 'tank' | 'support';
    difficulty: 1 | 2 | 3;
    abilities: Ability[];
}

interface Ability {
    name: string;
    description: string;
}
