import DomainEvent from "../domain/model/DomainEvent";

export default interface EventStore {
    append(domainEvent: DomainEvent): Promise<void>
}