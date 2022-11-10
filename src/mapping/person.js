import {RDF, SCHEMA} from "../rdf/namespace";
import {addValue} from "../rdf/util";

const CHAPTER_UUID = '1e85da40-bbfc-4180-903e-6c569ed2da38'
const CONTRIBUTORS_UUID = '73d686bd-7939-412e-8631-502ee6d9ea7b'

const PERSON_NAME = '6155ad47-3d1e-4488-9f2a-742de1e56580'
const PERSON_EMAIL = '3a2ffc13-6a0e-4976-bb34-14ab6d938348'
const PERSON_IDENTIFIER = '6295a55d-48d7-4f3c-961a-45b38eeea41f'

const ORGANIZATION_NAME = '68530470-1f1c-4448-8593-63a288713a66'

export function processPerson(importer, store) {
    console.log("Creating people...")

    const prefix = [CHAPTER_UUID, CONTRIBUTORS_UUID]
    const personStatements = store.match(null, RDF('type'), SCHEMA('Person'), null);
    personStatements.forEach(personStatement => {
        const itemUuid = importer.addItem(prefix)
        const contributorPrefix = [...prefix, itemUuid]
        const personIdentifier = personStatement.subject

        console.log(`Creating person (${personIdentifier})...`)
        addValue(importer, store, personIdentifier, SCHEMA('name'), [...contributorPrefix, PERSON_NAME])
        addValue(importer, store, personIdentifier, SCHEMA('email'), [...contributorPrefix, PERSON_EMAIL])
        addValue(importer, store, personIdentifier, SCHEMA('identifier'), [...contributorPrefix, PERSON_IDENTIFIER], field => field.includes('https://orcid.org/'), field => field.replace('https://orcid.org/', ''))
        processOrganization(importer, store, prefix, itemUuid, personIdentifier)
        console.log(`Person (${personIdentifier}) created`)
    })

    console.log("People created")
}

function processOrganization(importer, store, prefix, itemUuid, personIdentifier) {
    console.log(`Creating organizations for person (${personIdentifier})`)
    const affiliationStatements = store.match(personIdentifier, SCHEMA('affiliation'), null, null);
    affiliationStatements.forEach(affiliationStatement => {
        var organizationStatements = store.match(affiliationStatement.object, RDF('type'), SCHEMA('Organization'), null)
        organizationStatements.forEach(organizationStatement => {
            const contributorPrefix = [...prefix, itemUuid]
            const organizationIdentifier = organizationStatement.subject

            console.log(`Creating organization (${organizationIdentifier}) for person (${personIdentifier})...`)
            addValue(importer, store, organizationIdentifier, SCHEMA('name'), [...contributorPrefix, ORGANIZATION_NAME])
            console.log(`Organization (${organizationIdentifier}) for person (${personIdentifier}) created`)
        })
    })
    console.log(`Organization for person (${personIdentifier}) created`)
}
