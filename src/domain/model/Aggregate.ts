import DomainEvent from "./DomainEvent";
import Entity from "./Entity";
import Identity from "./Identity";

export default abstract class Aggregate<ID extends Identity> extends Entity<ID> {
    abstract history: DomainEvent[]
}