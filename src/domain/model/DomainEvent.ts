export default interface DomainEvent  {
    eventVersion: number

    occuredOn: Date

    type: string
}