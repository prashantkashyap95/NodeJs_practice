function add ( a , b ) {
    return a + b;
}

function sub (a,b) {
    console.log("Subtracting value is ",a-b);
}

module.exports = {
    addFn: add,
    subFn: sub,
} 

