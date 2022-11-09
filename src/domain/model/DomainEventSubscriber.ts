import DomainEvent from "./DomainEvent"

export default interface DomainEventSubscriber {
    handleEvent(domainEvent: DomainEvent): void

    subscribedToType: string
}