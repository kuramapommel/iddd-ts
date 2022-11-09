import instance from "../../../src/domain/model/DomainEventPublisher"
import DomainEvent from "../../../src/domain/model/DomainEvent"

describe("DomainEventPublisher.publish",() => {

    test("type が event のときはサブスクライブする",() => {
        let result = false

        const publisher = instance()
        publisher.reset()

        publisher.subscribe({
            handleEvent(_: DomainEvent): void {
                result = true
            },
            subscribedToType: "EventSubscriber"
        })
        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: "event"
        })

        expect(result).toBe(true)
    })

    test("type が subscriber.subscribedToType と一致するときはサブスクライブする",() => {
        const eventName = "same"
        let result = false

        const publisher = instance()
        publisher.reset()
        
        publisher.subscribe({
            handleEvent(_: DomainEvent): void {
                result = true
            },
            subscribedToType: eventName
        })
        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: eventName
        })

        expect(result).toBe(true)
    })

    test("type が subscriber.subscribedToType と一致しないときはサブスクライブしない",() => {
        let result = false

        const publisher = instance()
        publisher.reset()

        publisher.subscribe({
            handleEvent(_: DomainEvent): void {
                fail()
            },
            subscribedToType: "event-a"
        })
        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: "event-b"
        })

        expect(result).toBe(false)
    })

    test("サブスクライバが登録されていないときはサブスクライブしない",() => {
        let result = false

        const publisher = instance()
        publisher.reset()

        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: "event-b"
        })

        expect(result).toBe(false)
    })
})
describe("DomainEventPublisher.reset",() => {

    test("サブスクライバが reset されたときはサブスクライブしない",() => {
        let result = false

        const publisher = instance()
        publisher.reset()

        publisher.subscribe({
            handleEvent(_: DomainEvent): void {
                result = true
            },
            subscribedToType: "EventSubscriber"
        })
        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: "event"
        })

        result = false
        publisher.reset()
        publisher.publish({
            eventVersion: 1,
            occuredOn: new Date(),
            type: "event"
        })

        expect(result).toBe(false)
    })
})