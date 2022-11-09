import Identity from "./Identity";

export default interface IdentifiedDomainObject<ID extends Identity> {
    id: ID
}