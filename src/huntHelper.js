export default (z) => {

    switch (true) {
        case (z <= 5):
            if(Math.random() < 0.5) {
                console.log('you gained a zombie')
                return 1;
            } else {
                console.log('you found nothing');
                return 0;
            }
        case z >5 && z <= 10:

            if(Math.random() < 0.5) {
                console.log('you gained a zombie')
                return 2;
            } else {
                console.log('you found nothing');
                return 0;
            }
    
        default:
        console.log('default')
            return 0;
    }
}