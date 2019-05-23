export default (l, z, d) => {

    const level = levels[l - 1]

    const result = z >= level.defense && d >= level.attack;
    console.log(result, 'res')

    if(result) {
        return {
            population: level.population,
            scrap: level.scrap
        }
    }

    // switch (l) {
    //     case (1):
    //         if(z >= 5) {
    //             return {
    //                 population: 2,
    //                 scrap: 10,
    //             };
    //         } else {
    //             return 0;
    //         }
    //     case 2:
    //         if(z >= 10 && d >= 5) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    
    //     default:
    //         console.log('you lost')
    //         return 0;
    // }

}

const levels = [
    {
        level: 1,
        population: 2,
        scrap: 10,
        defense: 5,
        attack: 0
    },
    {
        level: 2,
        population: 4,
        scrap: 15,
        defense: 10,
        attack: 5
    },
]