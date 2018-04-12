/* global getAssetRegistry getFactory */

const modelsNamespace = 'org.example.compnetwork'
function uuid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

/**
* Creation of a Engine asset triggered by physical production.
* @param {org.example.compnetwork.EngineCreation} tx - the transaction to create an component
* @transaction
*/
async function createEngineAsset(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Engine')
    const component = getFactory().newResource(modelsNamespace, 'Engine', uuid())
    const componentData = getFactory().newConcept(modelsNamespace, 'EngineProperties')

    component.data = Object.assign(componentData, tx.data)
    component.manufacturer = tx.manufacturer

    await componentRegistry.add(component)
}

/**
* An component is transfered to a merchant.
* @param {org.example.compnetwork.EngineMerchantTransfer} tx - the component transfer transaction
* @transaction
*/
async function transferEngineToMerchant(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Engine')
    tx.component.merchant = tx.merchant

    await componentRegistry.update(tx.component)
}

/**
* An component is installed in a car.
* @param {org.example.compnetwork.EngineCarInstallation} tx - the component into car installation transaction
* @transaction
*/
async function installEngineToCar(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Engine')
    if (tx.car) {
        tx.component.currentCar = tx.car
        await componentRegistry.update(tx.component)
    } else {
        return Promise.reject('No target car was set on the transaction!')
    }
}

/**
* A car is created
* @param {org.example.compnetwork.CarCreation} tx - transaction to create a new car
* @transaction
*/
async function createCar(tx) { // eslint-disable-line no-unused-vars
    const carRegistry = await getAssetRegistry(modelsNamespace + '.Car')
    const factory = getFactory()
    const carId = uuid()
    const car = factory.newResource(modelsNamespace, 'Car', carId)
    car.legalDocumentId = tx.legalIdDocument

    await carRegistry.add(car)
}
