import IdentifiedDomainObject from "./IdentifiedDomainObject";
import Identity from "./Identity";

export default abstract class Entity<ID extends Identity> implements IdentifiedDomainObject<ID> {
    abstract type: string

    abstract id: ID

    equals(object: any): boolean {
        // interface は instanceof による型チェックができないので、 Entity 型を implements しているかをユーザ定義タイプガードを用いてチェックする
        const isEntityType = (entity: any): entity is Entity<ID> => typeof entity === "object" && typeof entity.type === "string" && ((id: any): id is Identity => typeof id === "object" && typeof id.value === "string")(entity.id)
        if (!object || !isEntityType(object) || object.type != this.type) return false
        
        return this.id.value === object.id.value
    }
}