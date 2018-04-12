function createManufacturer(namespace, factory, id) {
    const manu = factory.newResource(namespace, 'Manufacturer', id)
    manu.name = 'Some manufacturer for testing'

    return manu
}

function createMerchant(namespace, factory, id) {
    const merchant = factory.newResource(namespace, 'Merchant', id)
    merchant.name = 'Some merchant name'

    return merchant
}

function createComponent(namespace, factory, id, manufacturer) {
    const component = factory.newResource(namespace, 'Component', id)
    const componentProps = factory.newConcept(namespace, 'ComponentProperties')

    componentProps.brand = 'Mercedes'
    componentProps.model = 'V12'
    componentProps.horsePower = 400
    componentProps.cubicCapacity = 4000
    componentProps.cylindersAmount = 12

    component.data = componentProps
    component.manufacturer = factory.newRelationship(namespace, 'Manufacturer', manufacturer.$identifier)

    return component
}

function createCar(namespace, factory, id) {
    const car = factory.newResource(namespace, 'Car', id)
    car.legalDocumentId = 'legal-id-of-this-car'

    return car
}

module.exports = {
    createManufacturer,
    createMerchant,
    createComponent,
    createCar
}
