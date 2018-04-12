/* global getAssetRegistry getFactory */

const modelsNamespace = 'org.example.compnetwork'
function uuid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

/**
* Creation of a Component asset triggered by physical production.
* @param {org.example.compnetwork.ComponentCreation} tx - the transaction to create an component
* @transaction
*/
async function createComponentAsset(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Component')
    const component = getFactory().newResource(modelsNamespace, 'Component', uuid())
    const componentData = getFactory().newConcept(modelsNamespace, 'ComponentProperties')

    component.data = Object.assign(componentData, tx.data)
    component.manufacturer = tx.manufacturer

    await componentRegistry.add(component)
}

/**
* An component is transfered to a merchant.
* @param {org.example.compnetwork.ComponentMerchantTransfer} tx - the component transfer transaction
* @transaction
*/
async function transferComponentToMerchant(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Component')
    tx.component.merchant = tx.merchant

    await componentRegistry.update(tx.component)
}

/**
* An component is installed in a car.
* @param {org.example.compnetwork.ComponentCarInstallation} tx - the component into car installation transaction
* @transaction
*/
async function installComponentToCar(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Component')
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
