import Identity from "../Identity"

export default class AcccountId implements Identity  {
    constructor(
        readonly value: string
    ) {}
}