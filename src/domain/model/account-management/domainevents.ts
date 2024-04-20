import DomainEvent from "../DomainEvent";
import AcccountId from "./AccountId";
import StatementId from "./StatementId";

class PerformedTransactions implements DomainEvent {
    readonly type = "PerformedTransactions"
    readonly occuredOn: Date

    constructor(
        readonly eventVersion: number,
        readonly banckAccountId: AcccountId,
        readonly statemantId: StatementId
    ) {
        this.occuredOn = new Date()
    }
}

export {
    PerformedTransactions
}