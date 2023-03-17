export default {
    _sa_removeFromArray: function (arr: Array<any>, value: any) {
        return arr.filter((arrayElement: any[]) => {
            return arrayElement !== value
        })
    }
}