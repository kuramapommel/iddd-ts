import DomainEvent from "./DomainEvent"
import DomainEventSubscriber from "./DomainEventSubscriber"

export default class DomainEventPublisher {
    readonly subscribers = [] as DomainEventSubscriber[]

    // todo スレッドセーフ考慮する必要ある？
    // todo シングルトンにせずプロセスに合わせてインスタンス化して引き回すほうが良さそう、言語の限界かな、、、
    publish (domainEvent: DomainEvent): void {
        // サブスクライバが登録されていないのであれば処理する必要がない
        if (this.subscribers.length <= 0) return
        
        this.subscribers.forEach(subscriber => {
            if (subscriber.subscribedToType != domainEvent.type && domainEvent.type != "event") return

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