import DomainEvent from "./DomainEvent"
import DomainEventSubscriber from "./DomainEventSubscriber"

class DomainEventPublisher {
    readonly subscribers = [] as DomainEventSubscriber[]

    // todo スレッドセーフ考慮する必要ある？
    publish (domainEvent: DomainEvent): void {
        // サブスクライバが登録されていないのであれば処理する必要がない
        if (this.subscribers.length <= 0) return
        
        this.subscribers.forEach(subscriber => {
            if (subscriber.subscribedToType != domainEvent.type && subscriber.subscribedToType != "event") return

            subscriber.handleEvent(domainEvent)
        })
    }
    
    publishAll(domainEvents: DomainEvent[]) {
        domainEvents.forEach(domainEvent => this.publish(domainEvent))
    }

    reset() {
        this.subscribers.length = 0
    }

    subscribe(subscriber: DomainEventSubscriber) {
        this.subscribers.push(subscriber)
    }
}

const domainEventPublisher = new DomainEventPublisher()

const instance = () => domainEventPublisher
export default instance