import Aggregate from "../Aggregate";
import DomainEvent from "../DomainEvent";
import DomainEventPublisher from "../DomainEventPublisher";
import AcccountId from "./AccountId";
import { PerformedTransactions } from "./domainevents";
import StatementId from "./StatementId";
import { Balance } from "./valueobjects";

export default class BankAccount extends Aggregate<AcccountId> {

    constructor(
        readonly domainEventPublisher: DomainEventPublisher,
        readonly type: string,
        readonly id: AcccountId,
        readonly balance: Balance,
        readonly StatementHistory: StatementId[],
        readonly history: DomainEvent[] = []
    ){
        super()
    }

    performTransactions(statemant: StatementId): BankAccount {
        const performedTransactions = new PerformedTransactions(history.length + 1, this.id, statemant)
        const newBankAccount = new BankAccount(
            this.domainEventPublisher, this.type, this.id, this.balance,
            [...this.StatementHistory, statemant], [...this.history, performedTransactions])
        this.domainEventPublisher.publish(performedTransactions)
        return newBankAccount
    }
}