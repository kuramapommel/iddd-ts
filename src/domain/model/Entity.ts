import IdentifiedDomainObject from "./IdentifiedDomainObject";
import Identity from "./Identity";

export default abstract class Entity<ID extends Identity> implements IdentifiedDomainObject<ID> {
    abstract type: string

    abstract id: ID

    equals(object: any): boolean {
        if (!object || object instanceof Entity<ID> || object.type != this.type) return false

        return this.id.value === object.id.value
    }
}