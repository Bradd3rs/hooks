export default (z) => {

    switch (true) {
        case (z <= 5):
            if(Math.random() < 0.5) {
                return {
                    zombies: 1
                };
            } else {
                console.log('you found nothing');
                return {
                    zombies: 0
                };
            }
        case z > 5:

            if(Math.random() < 0.5) {
                const zombies = Math.floor(Math.random() * 2) + 1;
                return {
                    zombies
                }
            } else {
                console.log('you found nothing');
                return {
                    zombies: 0
                };
            }
    
        default:
            console.log('default')
            return 0;
    }
}