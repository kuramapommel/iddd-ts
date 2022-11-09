import Entity from "../../../src/domain/model/Entity"
import Identity from "../../../src/domain/model/Identity"

describe("Entity.equals",() => {
    class TemporaryId implements Identity {
        constructor(readonly value: string){}
    }
    class TemporaryEntity extends Entity<TemporaryId> {
        readonly type = "TemporaryEntity"
        constructor(readonly id: TemporaryId){
            super()
        }

    }

    test("null が渡された場合は false", () => {

        const id = new TemporaryId("tmp-id")
        const entity = new TemporaryEntity(id)

        const result = entity.equals(null)
        expect(result).toBe(false)
    })

    test("undefined が渡された場合は false", () => {

        const id = new TemporaryId("tmp-id")
        const entity = new TemporaryEntity(id)

        const result = entity.equals(undefined)
        expect(result).toBe(false)
    })

    test("異なる型のオブジェクトが渡された場合は false", () => {

        const id = new TemporaryId("tmp-id")
        const entity = new TemporaryEntity(id)

        const anyObj = {}

        const result = entity.equals(anyObj)
        expect(result).toBe(false)
    })

    test("異なる id のオブジェクトが渡された場合は false", () => {

        const id = new TemporaryId("tmp-id")
        const entity = new TemporaryEntity(id)

        const id2 = new TemporaryId("tmp-id2")
        const entity2 = new TemporaryEntity(id2)

        const result = entity.equals(entity2)
        expect(result).toBe(false)
    })

    test("同じ id のオブジェクトが渡された場合は false", () => {

        const id = new TemporaryId("tmp-id")
        const entity = new TemporaryEntity(id)
        
        const entity2 = new TemporaryEntity(id)

        const result = entity.equals(entity2)
        expect(result).toBe(true)
    })
})