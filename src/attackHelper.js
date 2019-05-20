export default (l, z, d) => {

    switch (l) {
        case (1):
            if(z >= 5) {
                return 1;
            } else {
                return 0;
            }
        case 2:
            if(z >= 10 && d >= 5) {
                return 1;
            } else {
                return 0;
            }
    
        default:
            console.log('you lost')
            return 0;
    }
}