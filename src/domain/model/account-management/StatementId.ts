import Identity from "../Identity";

export default class StatementId implements Identity {
    constructor(
        readonly value: string
    ){}
}