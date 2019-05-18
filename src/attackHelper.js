export default (l, z, d) => {

    switch (l) {
        case (1):
        if(z >= 5) {
            console.log('you won lvl 1')
           return 1;
        } else return 0;
        case 2:
        if(z >10 && d >= 5) {
            console.log('you won lvl 2')
            return 1;
        } else return 0;
    
        default:
        console.log('you lost')
            return 0;
    }
}