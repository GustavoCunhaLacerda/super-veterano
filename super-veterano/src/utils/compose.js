export function compose(...functions) {
    return functions.reduceRight((value, func) => func(value), ini);
}

export function pipe(...functions) {
    return functions.reduce((value, func) => func(value), ini);
}
