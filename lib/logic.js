/* global getAssetRegistry getFactory */

const modelsNamespace = 'org.example.compnetwork'

/**
* Create UUID, serial
*/
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
* A component is transfered to a merchant.
* @param {org.example.compnetwork.ComponentMerchantTransfer} tx - the component transfer transaction
* @transaction
*/
async function transferComponentToMerchant(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Component')
    tx.component.merchant = tx.merchant

    await componentRegistry.update(tx.component)
}

/**
* A component is installed in a computer.
* @param {org.example.compnetwork.ComponentComputerInstallation} tx - the component into computer installation transaction
* @transaction
*/
async function installComponentToCcomputer(tx) { // eslint-disable-line no-unused-vars
    const componentRegistry = await getAssetRegistry(modelsNamespace + '.Component')
    if (tx.computer) {
        tx.component.currentComputer = tx.computer
        await componentRegistry.update(tx.component)
    } else {
        return Promise.reject('No target computer was set on the transaction!')
    }
}

/**
* A Computer is created
* @param {org.example.compnetwork.ComputerCreation} tx - transaction to create a new computer
* @transaction
*/
async function createComputer(tx) { // eslint-disable-line no-unused-vars
    const computerRegistry = await getAssetRegistry(modelsNamespace + '.Computer')
    const factory = getFactory()
    const computerId = uuid()
    const computer = factory.newResource(modelsNamespace, 'Computer', computerId)
    computer.legalDocumentId = tx.legalIdDocument

    await computerRegistry.add(computer)
}
